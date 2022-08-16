import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { User } from '@prisma/client'
import { db as database } from '../utils/db.server'

interface LoaderData {
  users: User[]
}

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    users: await database.user.findMany()
  }
  return json(data)
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  console.debug(data)
  return <div className='h-full w-full bg-secondary'>hello Index</div>
}
