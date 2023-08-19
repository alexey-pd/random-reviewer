import { createEvent, restore, sample } from "effector";
import { persist } from "effector-storage/query";

export const usersUpdated = createEvent<string>();
export const $users = restore<string>(usersUpdated, "");

persist({ store: $users, key: "users" });

sample({
  clock: usersUpdated,
  target: $users,
});
