import * as React from 'react'

import { cn } from '@/lib/utils'

/* Fields are a recessed fill with a faint inset edge; focus draws a purple ring. */
export const fieldBase = [
  'w-full min-w-0 rounded-control bg-page px-3.5 text-[15px] text-ink',
  'shadow-[inset_0_0_0_1px_rgb(23_17_31/0.1)] placeholder:text-ink-3/80',
  'transition-shadow duration-150 outline-none',
  'focus-visible:shadow-[inset_0_0_0_2px_var(--purple)]',
  'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  'aria-invalid:shadow-[inset_0_0_0_2px_var(--destructive)]',
].join(' ')

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(function Input(
  { className, type, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(fieldBase, 'h-11 py-2 file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium', className)}
      {...props}
    />
  )
})

export { Input }
