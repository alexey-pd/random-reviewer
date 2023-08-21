import {
  createEvent,
  restore,
  sample,
  createEffect,
  combine,
  createStore,
} from "effector";
import { createGate } from "effector-react";

const shuffleArray = (arr: string[]) =>
  arr.slice().sort(() => 0.5 - Math.random());

export const usersUpdated = createEvent<string>();
export const $users = createStore<string>("");
export const UsersGate = createGate<string | null>();

export const limitChanged = createEvent<number>();
export const $limit = restore(limitChanged, 3);

const getRandomUsersFx = createEffect<
  { users: string[]; limit: number },
  string[]
>(({ users, limit = 3 }) => shuffleArray(users).slice(0, limit));

export const $results = restore<string[]>(getRandomUsersFx.doneData, []);

export const randomActivated = createEvent<number>();

const splitUsers = (users: string) => users.split(/\r?\n?\s/);

export const $filtered = $users.map((users) =>
  splitUsers(users).filter((user) => Boolean(user) && !user.startsWith("/"))
);

export const $disabled = combine(
  $filtered,
  $limit,
  (split, limit) => split.length < limit
);

sample({
  clock: randomActivated,
  source: $filtered,
  fn: (users, limit) => ({ limit, users }),
  target: getRandomUsersFx,
});

sample({
  clock: UsersGate.open,
  filter: (data) => data !== null,
  fn: (data) => data || "",
  target: usersUpdated,
});

sample({
  clock: usersUpdated,
  fn: (users) => [...new Set(splitUsers(users.toLowerCase()))].join("\n"),
  target: $users,
});
