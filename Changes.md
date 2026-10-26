# TaskNest Productivity Improvement

## 1. How the productivity score worked before

The original `/score` endpoint combined a stored `Score.value` with a dynamic momentum bonus. Creating a task added 5 points to the stored value, completing a task added another 10 points, and completed tasks could add a second bonus through `scoreHelper.js`. The score therefore depended on the order of actions rather than the current task state.

## 2. Issues discovered

- Creating a task increased productivity even though no work had been completed.
- Completing a task could be counted both by a database increment and by the dynamic bonus.
- Deleting a task did not remove its contribution from the stored score.
- The momentum formula changed at two completed-task thresholds and returned fractional values that were then rounded.
- The client requirement mentioned important tasks, but the database, API, and interface had no importance field or control.
- There was no completion timestamp, so the system could not explain or measure consistency.

## 3. Engineering interpretation

The score should be a deterministic summary of the current work: completing tasks should help, important tasks should matter more, and repeated activity should earn a modest consistency bonus. I chose a 0–100 score so the value is easy to understand and compare.

- **80 points:** weighted completion rate. Important tasks have weight 2; regular tasks have weight 1.
- **20 points:** consistency bonus based on the number of distinct days with completed work in the last seven days.
- A new task does not change the score until it is completed. Removing a task naturally recalculates the score from the remaining tasks.

## 4. Implementation details

- Added `important` and nullable `completedAt` fields to `Task`.
- Replaced stored-score mutations with `calculateProductivityScore`, returning the value and a breakdown.
- Updated task create/update endpoints to validate titles, accept importance, and set/clear completion timestamps.
- Added important-task controls to task creation and task cards.
- Updated the dashboard widget to show weighted completion, consistency points, active days, and a descriptive status.
- Added backend unit tests for empty state, importance weighting, and the fact that creating an incomplete task cannot increase the score.
- Made the frontend API URL configurable through `VITE_API_URL` for deployment.

## 5. Verification

From `server`: `npm test`

From `client`: `npm run lint` and `npm run build`

For a fresh PostgreSQL database, set `DATABASE_URL`, run `npx prisma db push`, optionally run `npm run prisma:seed`, and then start the API with `npm start`.

## 6. Deployment links

- Frontend Deployment Link: to be added after deployment
- Backend Deployment Link: to be added after deployment
