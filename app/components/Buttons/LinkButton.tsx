import type { FC, RefAttributes } from 'react'
import type { RemixLinkProps } from '@remix-run/react/dist/components'
import { Link } from '@remix-run/react'

interface Props extends RemixLinkProps, RefAttributes<HTMLAnchorElement> {
  text: string
}

const LinkButton: FC<Props> = ({ text, className, ...props }) => {
  return (
    <Link
      {...props}
      className={`bg-transparent hover:bg-primary text-label font-semibold hover:text-fontcolor-white py-2 px-4 ml-4 border hover:border-transparent rounded ${className}`}
    >
      {text}
    </Link>
  )
}

export default LinkButton
