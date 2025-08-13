import { describe, expect, it } from 'vitest';
import { nextSchedule, ReviewState } from '../../src/lib/srs';

describe('nextSchedule', () => {
  it('schedules first review on success', () => {
    const n = nextSchedule(undefined, 2);
    expect(n.reps).toBe(1);
    expect(n.interval_days).toBe(1);
  });

  it('increases interval on repeated success', () => {
    const first = nextSchedule(undefined, 2);
    const second = nextSchedule(first, 2);
    expect(second.reps).toBe(2);
    expect(second.interval_days).toBe(3);
    const third = nextSchedule(second, 2);
    expect(third.interval_days).toBeGreaterThan(3);
  });

  it('handles forgetting', () => {
    const start: ReviewState = { reps: 3, ease: 2.5, interval_days: 5, due_date: new Date() };
    const n = nextSchedule(start, 0);
    expect(n.reps).toBe(0);
    expect(n.interval_days).toBe(1);
  });

  it('ease has lower bound 1.3', () => {
    let state: ReviewState | undefined;
    for (let i = 0; i < 10; i++) {
      state = nextSchedule(state, 0);
    }
    expect((state as ReviewState).ease).toBe(1.3);
  });

  it('rounds interval', () => {
    const start: ReviewState = { reps: 2, ease: 2.6, interval_days: 3, due_date: new Date() };
    const n = nextSchedule(start, 2);
    expect(Number.isInteger(n.interval_days)).toBe(true);
  });
});
