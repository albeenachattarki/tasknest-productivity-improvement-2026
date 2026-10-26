const WINDOW_DAYS = 7;
const MAX_SCORE = 100;

/**
 * Productivity is derived from the current tasks instead of being mutated by
 * unrelated CRUD operations. Important tasks count twice as much as regular
 * tasks, and recent activity contributes a small consistency bonus.
 */
const calculateProductivityScore = (tasks = [], now = new Date()) => {
  if (tasks.length === 0) {
    return { value: 0, completedPoints: 0, completionRate: 0, consistencyBonus: 0, activeDays: 0 };
  }

  const totalWeight = tasks.reduce((sum, task) => sum + (task.important ? 2 : 1), 0);
  const completedWeight = tasks.filter((task) => task.completed)
    .reduce((sum, task) => sum + (task.important ? 2 : 1), 0);
  const completionRate = totalWeight === 0 ? 0 : completedWeight / totalWeight;
  const windowStart = new Date(now);
  windowStart.setHours(0, 0, 0, 0);
  windowStart.setDate(windowStart.getDate() - (WINDOW_DAYS - 1));
  const activeDays = new Set(
    tasks.filter((task) => task.completed && task.completedAt)
      .map((task) => new Date(task.completedAt))
      .filter((date) => date >= windowStart && date <= now)
      .map((date) => date.toISOString().slice(0, 10)),
  ).size;

  const completedPoints = Math.round(completionRate * 80);
  const consistencyBonus = Math.round((activeDays / WINDOW_DAYS) * 20);
  return {
    value: Math.min(MAX_SCORE, completedPoints + consistencyBonus),
    completedPoints,
    completionRate: Math.round(completionRate * 100),
    consistencyBonus,
    activeDays,
  };
};

module.exports = { calculateProductivityScore };
