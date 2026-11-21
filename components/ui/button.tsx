import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

/*
 * Flat buttons: no outlines, no shadows. Secondary actions are a lighter or
 * darker surface fill, never a bordered box.
 */
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control font-medium shrink-0 select-none',
    'transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50',
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    'outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-page',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-purple text-white hover:bg-purple-2',
        secondary: 'bg-sunk text-ink hover:bg-[#e2d5bd]',
        surface: 'bg-card text-ink hover:bg-white',
        /** Alias kept for shadcn primitives; same flat surface, no outline. */
        outline: 'bg-card text-ink hover:bg-white',
        ink: 'bg-ink text-page hover:bg-ink-2',
        destructive: 'bg-destructive text-white hover:bg-destructive/90',
        ghost: 'text-ink hover:bg-ink/[0.06]',
        link: 'text-ink underline underline-offset-4 decoration-ink/30 hover:decoration-purple hover:text-purple px-0',
      },
      size: {
        default: 'h-11 px-5 text-[15px]',
        sm: 'h-9 px-3.5 text-sm',
        lg: 'h-11 px-4 text-[14.5px] sm:h-[52px] sm:px-6 sm:text-[15.5px]',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
