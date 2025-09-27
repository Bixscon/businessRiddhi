import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        secondary: 'bg-secondary-200 text-base-black shadow-sm hover:bg-secondary-200/80',
        outline: 'border hover:bg-neutrals-100',
        ghost: 'hover:bg-neutrals-100',
        link: 'text-primary underline-offset-4 hover:underline',
        landing: 'bg-[#BFFF72] shadow-lg hover:shadow-none',
        nav: 'bg-primary-landing-light shadow-none transition-all duration-300 hover:shadow-md text-base-white',
      },
      size: {
        sm: 'py-2 px-4',
        md: 'py-2 px-6',
        lg: 'py-3 px-8',
        icon: 'p-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'lg',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    // Always forward onClick to ensure first click works
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={onClick}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
