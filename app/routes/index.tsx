import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { User } from '@prisma/client';
import { db } from '../utils/db.server';

type LoaderData = { users: Array<User> };

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    users: await db.user.findMany(),
  };
  return json(data);
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  console.log(data);
  return (
    <div className="bg-red-500">
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
