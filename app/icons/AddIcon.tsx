import type { FC, SVGProps } from 'react'

interface Props extends SVGSVGElement {
  color?: string
}

const AddIcon: FC<SVGProps<Props>> = ({ color = '#f05356', height = '24px', width = '24px', ...svgProps }) => {
  return (
    <svg fill='none' height={height} width={width} viewBox='0 0 32 32' {...svgProps}>
      <path fill={color} d='M22 15.5h-5.5V10h-1v5.5H10v1h5.5V22h1v-5.5H22v-1z' />
      <path
        fill={color}
        fillRule='evenodd'
        d='M29 16c0 7.18-5.82 13-13 13S3 23.18 3 16 8.82 3 16 3s13 5.82 13 13zm-1 0c0 6.627-5.373 12-12 12S4 22.627 4 16 9.373 4 16 4s12 5.373 12 12z'
        clipRule='evenodd'
      />
    </svg>
  )
}

export default AddIcon
