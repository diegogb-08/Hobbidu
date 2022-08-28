import { Chip } from '@mui/material'
import { motion } from 'framer-motion'

interface Props<T> {
  obj: T
  onClick: (object: T) => void
  text: string
}
const ChipCustom = <T,>({ obj, onClick, text }: Props<T>) => {
  return <Chip component={motion.div} onClick={() => onClick(obj)} label={text} />
}

export default ChipCustom
