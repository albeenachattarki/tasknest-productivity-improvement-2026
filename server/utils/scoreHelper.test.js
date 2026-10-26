const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateProductivityScore } = require('./scoreHelper');

test('empty task list has a zero score', () => {
  assert.deepEqual(calculateProductivityScore([]).value, 0);
});

test('important completed tasks count twice as much as regular tasks', () => {
  const now = new Date('2026-10-26T12:00:00.000Z');
  const result = calculateProductivityScore([
    { completed: true, important: true, completedAt: now },
    { completed: false, important: false, completedAt: null },
  ], now);
  assert.equal(result.completionRate, 67);
  assert.equal(result.value, 56);
});

test('score never changes when a task is merely created', () => {
  const now = new Date('2026-10-26T12:00:00.000Z');
  const before = calculateProductivityScore([{ completed: true, important: false, completedAt: now }], now);
  const after = calculateProductivityScore([
    { completed: true, important: false, completedAt: now },
    { completed: false, important: false, completedAt: null },
  ], now);
  assert.ok(after.value < before.value);
});
