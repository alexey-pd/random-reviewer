import { createEvent, restore, sample, createEffect } from "effector";
import { createGate } from "effector-react";

const shuffleArray = (arr: string[]) => arr.sort(() => 0.5 - Math.random());

export const usersUpdated = createEvent<string>();
export const $users = restore<string>(usersUpdated, "");
export const UsersGate = createGate<string | null>();

const getRandomUsersFx = createEffect<
  { users: string[]; limit: number },
  string[]
>(({ users, limit = 2 }) =>
  shuffleArray([
    ...new Set(users.filter((user) => user?.trim()?.length > 0)),
  ]).slice(0, limit)
);

export const $results = restore<string[]>(getRandomUsersFx.doneData, []);

export const randomActivated = createEvent<number>();

sample({
  clock: randomActivated,
  source: $users,
  fn: (users, limit) => ({ limit, users: users.split(/\r?\n?\s/) }),
  target: getRandomUsersFx,
});

sample({
  clock: UsersGate.open,
  filter: (data) => data !== null,
  fn: (data) => data || "",
  target: usersUpdated,
});
