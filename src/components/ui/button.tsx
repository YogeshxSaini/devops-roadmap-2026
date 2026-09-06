import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const VARIANT: Record<Variant, string> = {
  primary: 'border border-accent text-accent hover:bg-accent/10',
  secondary: 'border border-border bg-bg-raised text-fg-primary hover:border-accent',
  ghost: 'border border-transparent text-fg-muted hover:text-fg-primary hover:border-border-subtle',
  outline: 'border border-border text-fg-primary hover:border-accent',
};

const SIZE: Record<Size, string> = {
  sm: 'text-[11px] px-2.5 py-1',
  md: 'text-mono text-xs px-3 py-1.5',
  lg: 'text-mono text-sm px-5 py-2.5',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'secondary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:pointer-events-none',
          VARIANT[variant],
          SIZE[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

// Render a child element (e.g. Next.js Link) styled as a Button.
// This is the shadcn/ui "asChild" pattern, in a single-purpose form
// that doesn't need Radix.
export function ButtonLink({
  variant = 'secondary',
  size = 'md',
  className,
  children,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-colors',
        VARIANT[variant],
        SIZE[size],
        className
      )}
    >
      {children}
    </span>
  );
}
