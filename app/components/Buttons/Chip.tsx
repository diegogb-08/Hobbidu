import { Chip } from '@mui/material'

interface Props<T> {
  obj: T
  onClick: (object: T) => void
  text: string
}
const ChipCustom = <T,>({ obj, onClick, text }: Props<T>) => {
  return <Chip onClick={() => onClick(obj)} label={text} />
}

export default ChipCustom
