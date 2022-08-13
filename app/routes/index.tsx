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
  return <div className="h-full w-full bg-secondary">hello Index</div>;
}
