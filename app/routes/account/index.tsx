import { redirect } from '@remix-run/server-runtime'

export const loader = () => {
  return redirect('account/login')
}

const index = () => {
  return <div></div>
}

export default index
