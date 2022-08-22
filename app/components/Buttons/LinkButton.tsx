import type { FC, RefAttributes } from 'react'
import type { RemixLinkProps } from '@remix-run/react/dist/components'
import { Link } from '@remix-run/react'

interface Props extends RemixLinkProps, RefAttributes<HTMLAnchorElement> {
  text: string
  color: 'primary' | 'blue'
}

const LinkButton: FC<Props> = ({ text, className, color, ...props }) => {
  const primaryColor = 'rounded hover:bg-primary text-label'
  const blueColor = 'rounded-3xl hover:bg-blue text-blue'
  return (
    <Link
      {...props}
      rel='stylesheet'
      className={`bg-transparent font-semibold hover:text-fontcolor-white py-2 px-4 ml-4 border hover:border-transparent 
      ${color === 'primary' && primaryColor} 
      ${color === 'blue' && blueColor}
      ${className}`}
    >
      {text}
    </Link>
  )
}

export default LinkButton
