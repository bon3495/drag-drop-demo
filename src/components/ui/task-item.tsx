import { Droppable, Draggable } from '@hello-pangea/dnd';
import React from 'react';
import { BlockProps, TaskItemProps } from '../../types/globals.type';
import { cn } from '../../utils';
import { EllipsisIcon } from '../icons/ellipsis';
import { TYPE_EXERCISE } from '../../constant';

interface ComponentProps extends BlockProps {
  isDragging?: boolean;
  title: string;
  task: TaskItemProps;
  buttonAdd: React.ReactNode;
}

const TaskItem = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ isDragging, className, title, task, buttonAdd, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          'shadow-card p-1 border border-border-card rounded-md bg-white',
          {
            'bg-gray-300': isDragging,
          },
          className
        )}
      >
        <div className="flex justify-between items-center px-2">
          <h3 className="line-clamp-1 text-xs font-bold text-primary uppercase">
            {title}
          </h3>
          <button className="flex">
            <EllipsisIcon />
          </button>
        </div>
        <Droppable droppableId={task.id} type={TYPE_EXERCISE}>
          {(provided) => (
            <div
              className="flex flex-col space-y-2 my-2"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {task.exercises.map((ex, index) => {
                return (
                  <Draggable key={ex.id} draggableId={ex.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        key={ex.id}
                        className={cn(
                          'flex shadow-card rounded-md flex-col p-1 border border-border-card bg-white',
                          { 'bg-blue-100': snapshot.isDragging }
                        )}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p className="text-right text-xs text-black font-semibold">
                          {ex.name}
                        </p>
                        <p className="flex justify-between items-center">
                          <span className="text-muted-300 text-xs font-bold text-[10px]">
                            {ex.times}x
                          </span>
                          <span className="text-muted-400 text-[10px] font-normal line-clamp-1">
                            {ex.sets}
                          </span>
                        </p>
                      </div>
                    )}
                  </Draggable>
                );
              })}

              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <div className="flex justify-end">{buttonAdd}</div>
      </div>
    );
  }
);

export { TaskItem };
