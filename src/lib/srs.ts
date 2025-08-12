export interface ReviewState {
  reps: number;
  ease: number; // 记忆难度
  interval_days: number;
  due_date: Date;
}

/**
 * 根据上一状态和打分计算下一次复习计划。
 */
export function nextSchedule(prev: ReviewState | undefined, grade: 0 | 1 | 2): ReviewState {
  let reps = prev?.reps ?? 0;
  let ease = prev?.ease ?? 2.5;
  let interval = prev?.interval_days ?? 0;

  if (grade === 0) {
    reps = 0;
    interval = 1;
    ease = Math.max(1.3, ease - 0.2);
  } else {
    reps += 1;
    if (grade === 1) ease = Math.max(1.3, ease - 0.15);
    if (grade === 2) ease = Math.min(2.8, ease + 0.1);

    if (reps === 1) interval = 1;
    else if (reps === 2) interval = 3;
    else interval = Math.round(interval * ease);
  }

  const due = new Date();
  due.setDate(due.getDate() + interval);

  return {
    reps,
    ease,
    interval_days: interval,
    due_date: due,
  };
}
