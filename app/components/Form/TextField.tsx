import type { FC, HTMLProps } from 'react';

interface Props extends HTMLProps<HTMLInputElement> {
  isError?: boolean;
  text?: string;
  helperText?: string;
  className?: string;
}

const TextField: FC<Props> = ({
  isError,
  text,
  helperText,
  className,
  ...inputProps
}: Props) => {
  return (
    <div className="w-full">
      <label htmlFor="floatingInput" className="text-black">
        {text}
      </label>
      <input
        className={`form-control
        block
        w-full
        px-2
        py-1.5
        text-base
        font-normal
        bg-white bg-clip-padding
        border border-solid border-gray
        rounded
        transition
        ease-in-out
        m-0 focus:bg-white focus:border-blue focus:outline-non ${className}`}
        {...inputProps}
      />
      {helperText && (
        <span className={`${isError ? 'text-red' : 'text-gray'}`}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export default TextField;
