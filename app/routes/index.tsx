import { useUnit } from "effector-react";
import type { ChangeEvent } from "react";
import { $users, usersUpdated } from "~/model/users";

export default function Index() {
  const { users, usersChanged } = useUnit({
    users: $users,
    usersChanged: usersUpdated,
  });
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <textarea
          name="users"
          style={{ resize: "none" }}
          className="h-56 shadow border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          value={users}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            usersChanged(e.target.value)
          }
        />
      </form>
    </div>
  );
}
