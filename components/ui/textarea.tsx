import * as React from 'react'

import { cn } from '@/lib/utils'
import { fieldBase } from '@/components/ui/input'

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(
        fieldBase,
        'flex field-sizing-content min-h-24 py-2.5',
        className,
      )}
      {...props}
    />
  )
})

export { Textarea }
