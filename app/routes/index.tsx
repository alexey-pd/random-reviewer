import { useUnit, useGate } from "effector-react";
import type { ChangeEvent } from "react";
import {
  $users,
  usersUpdated,
  randomActivated,
  $results,
  UsersGate,
} from "~/model/users";
import { useLoaderData, useSearchParams } from "@remix-run/react";

export const loader = ({ request }: any) => {
  const url = new URL(request.url);

  return url.searchParams.get("users");
};

export default function Index() {
  const { users, results, usersChanged, buttonClicked } = useUnit({
    users: $users,
    results: $results,
    usersChanged: usersUpdated,
    buttonClicked: randomActivated,
  });

  const data = useLoaderData<typeof loader>();

  useGate(UsersGate, data);

  let [, setSearchParams] = useSearchParams();

  const updateQuery = () => {
    setSearchParams({ users });
  };

  return (
    <div
      className="flex flex-col h-screen"
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
    >
      <form className="shadow-md rounded p-4 text-center max-w-xl w-screen m-auto">
        <div className="flex">
          <img className="" src="/hero.png" width={100} alt="" />
          <h1>Code review enforcer</h1>
        </div>
        <textarea
          name="users"
          style={{ resize: "none", marginTop: "-3px" }}
          className="h-56 shadow border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          value={users}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            usersChanged(e.target.value)
          }
        />
        <button
          type="button"
          disabled={!users}
          className="px-4 py-2 font-semibold text-sm bg-green-700 
          text-white rounded-full bg-violet-500 hover:bg-violet-600 
          active:bg-violet-700 focus:outline-none focus:ring 
          focus:ring-violet-300 cursor-pointer disabled:opacity-50 
          disabled:bg-violet-500"
          onClick={() => {
            buttonClicked(2);

            updateQuery();
          }}
        >
          Get lucky
        </button>
        {results?.length > 0 && (
          <p className="py-10">{results.map((result) => `@${result} `)}</p>
        )}
      </form>
    </div>
  );
}
