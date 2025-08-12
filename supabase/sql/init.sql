create extension if not exists "pgcrypto";

-- 用户档案
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  username text,
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

-- 学习进度
create table if not exists public.progress (
  user_id uuid primary key references auth.users on delete cascade,
  streak_days int default 0,
  learned_count int default 0,
  last_study_date date
);
alter table public.progress enable row level security;
create policy "progress_own_rw" on public.progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 词书（公开只读）
create table if not exists public.decks (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  level text check (level in ('BEC-Intermediate','BEC-Advanced')),
  cefr text check (cefr in ('B1','B2','C1')),
  total_words int default 0
);
alter table public.decks enable row level security;
create policy "decks_read_all" on public.decks for select using (true);

-- 单词（公开只读）
create table if not exists public.words (
  id uuid primary key default gen_random_uuid(),
  deck_id uuid not null references public.decks(id) on delete cascade,
  headword text not null,
  translation_zh text not null,
  pos text,
  ipa text,
  example_en text,
  example_zh text,
  tags text[] default '{}'
);
alter table public.words enable row level security;
create policy "words_read_all" on public.words for select using (true);

-- 复习记录（SRS，仅本人可读写）
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  word_id uuid not null references public.words(id) on delete cascade,
  reps int default 0,
  ease float default 2.5,
  interval_days int default 0,
  due_date date default current_date,
  last_reviewed_at timestamptz,
  next_due_at timestamptz,
  unique(user_id, word_id)
);
alter table public.reviews enable row level security;
create policy "reviews_own_rw"
  on public.reviews for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 小游戏战绩（仅本人可读写）
create table if not exists public.game_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  game_type text check (game_type in ('match','choice')),
  correct int default 0,
  total int default 0,
  duration_seconds int default 0,
  created_at timestamptz default now()
);
alter table public.game_sessions enable row level security;
create policy "games_own_rw"
  on public.game_sessions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 新用户自动创建 profile 与 progress
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id) values (new.id);
  insert into public.progress (user_id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 词书计数（导入/更新后可执行）
create or replace view public.deck_word_counts as
select d.id as deck_id, count(w.id)::int as cnt
from decks d left join words w on d.id = w.deck_id
group by d.id;

update decks d
set total_words = coalesce(v.cnt,0)
from public.deck_word_counts v
where d.id = v.deck_id;

insert into decks (slug, title, level, cefr, total_words) values
('bec-int', 'BEC 中级词书', 'BEC-Intermediate', 'B1', 0)
on conflict (slug) do nothing;

insert into decks (slug, title, level, cefr, total_words) values
('bec-adv', 'BEC 高级词书', 'BEC-Advanced', 'C1', 0)
on conflict (slug) do nothing;
