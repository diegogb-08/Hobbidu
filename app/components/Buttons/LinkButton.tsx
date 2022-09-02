import type { Ref, RefAttributes } from 'react'
import { forwardRef } from 'react'
import type { RemixLinkProps } from '@remix-run/react/dist/components'
import { Link } from '@remix-run/react'

interface Props extends RemixLinkProps, RefAttributes<HTMLAnchorElement> {
  text?: string
  color?: 'primary' | 'blue'
}

const LinkButton = forwardRef(({ text, children, className, color, ...props }: Props, ref: Ref<HTMLAnchorElement>) => {
  const primaryColor = 'rounded hover:bg-primary text-primary'
  const blueColor = 'rounded-3xl hover:bg-blue text-blue'
  return (
    <Link
      {...props}
      ref={ref}
      rel='stylesheet'
      className={`
      bg-transparent font-semibold hover:text-fontcolor-white py-2 px-4 ml-4 border hover:border-transparent 
      ${color === 'primary' && primaryColor} 
      ${color === 'blue' && blueColor}
      ${className}
     `}
    >
      {text || children}
    </Link>
  )
})

LinkButton.displayName = 'LinkButton'

export default LinkButton
