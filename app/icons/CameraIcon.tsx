import type { FC, SVGProps } from 'react'

const CameraIcon: FC<SVGProps<SVGSVGElement>> = ({ height = '800px', width = '800px', ...svgProps }) => {
  return (
    <svg
      fill='#000000'
      height={height}
      width={width}
      version='1.1'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 507.9 507.9'
      xmlSpace='preserve'
      {...svgProps}
    >
      <g>
        <g>
          <path
            d='M451.6,113.05h-92.5l-25.6-56.1c-2.3-5-7.3-8.3-12.8-8.3H187.3c-5.5,0-10.5,3.2-12.8,8.3l-25.6,56.1H86.2v-5
			c0-7.8-6.3-14.1-14.1-14.1c-7.8,0-14.1,6.3-14.1,14.1v5h-1.6c-31.1,0-56.4,25.3-56.4,56.4v233.4c0,31.1,25.3,56.4,56.4,56.4h395.1
			c31.1,0,56.4-25.3,56.4-56.4v-233.4C508,138.35,482.7,113.05,451.6,113.05z M196.4,76.85h115.2l16.5,36.2H179.9L196.4,76.85z
			 M451.6,431.05H56.4c-15.6,0-28.2-12.7-28.2-28.2v-233.4c0-15.6,12.7-28.2,28.2-28.2h395.1c15.6,0,28.2,12.7,28.2,28.2v233.4h0.1
			C479.8,418.45,467.1,431.05,451.6,431.05z'
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d='M112.3,169.45H67.4c-7.8,0-14.1,6.3-14.1,14.1c0,7.8,6.3,14.1,14.1,14.1h44.9c7.8,0,14.1-6.3,14.1-14.1
			C126.4,175.75,120.1,169.45,112.3,169.45z'
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d='M254,169.45c-64.3,0-116.7,52.3-116.7,116.7c0,64.3,52.3,116.7,116.7,116.7c64.3,0,116.7-52.3,116.7-116.7
			C370.7,221.85,318.3,169.45,254,169.45z M254,374.65c-48.8,0-88.5-39.7-88.5-88.5s39.7-88.5,88.5-88.5s88.5,39.7,88.5,88.5
			S302.8,374.65,254,374.65z'
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d='M254,225.95c-7.8,0-14.1,6.3-14.1,14.1c0,7.8,6.3,14.1,14.1,14.1c17.7,0,32,14.4,32,32c0,7.8,6.3,14.1,14.1,14.1
			c7.8,0,14.1-6.3,14.1-14.1C314.2,252.95,287.2,225.95,254,225.95z'
          />
        </g>
      </g>
    </svg>
  )
}

export default CameraIcon
