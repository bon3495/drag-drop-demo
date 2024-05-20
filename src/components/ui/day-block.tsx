import { format, isEqual, startOfToday } from 'date-fns';
import { BlockProps } from '../../types/globals.type';
import { cn } from '../../utils';
import React from 'react';

interface ComponentProps extends BlockProps {
  day: Date;
  buttonAdd: React.ReactNode;
}

const today = startOfToday();

const DayBlock = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ day, className, children, buttonAdd, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('rounded-md flex flex-col', className)}
        {...props}
      >
        <h3
          className={cn('mb-2 text-muted-200 text-xs font-semibold uppercase')}
        >
          {format(day, 'eee')}
        </h3>
        <div className="bg-bg-gray flex-1 flex flex-col p-2 overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <p
              className={cn('text-xs text-muted-100 font-semibold', {
                'text-primary font-bold': isEqual(day, today),
              })}
            >
              {format(day, 'dd')}
            </p>
            {buttonAdd}
          </div>
          {children}
        </div>
      </div>
    );
  }
);

DayBlock.displayName = 'DayBlock';

export { DayBlock };
