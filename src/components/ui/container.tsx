import { BlockProps } from '../../types/globals.type';
import { cn } from '../../utils';

export interface ContainerProps extends BlockProps {}

const Container = ({ className, children, ...props }: ContainerProps) => {
  return (
    <div
      {...props}
      className={cn('flex h-auto min-h-screen flex-col', className)}
    >
      <main className="container mx-auto flex-1 xl:px-16 flex flex-col">
        {children}
      </main>
    </div>
  );
};

export { Container };
