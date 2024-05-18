import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from '@hello-pangea/dnd';
import {
  eachDayOfInterval,
  endOfWeek,
  startOfToday,
  startOfWeek,
} from 'date-fns';
import cloneDeep from 'lodash.clonedeep';

import { useState } from 'react';
import { initialData } from '../../mocks/data';
import { DayBlock } from './day-block';
import { TaskItem } from './task-item';
import { EXERCISES_ARRAY, TYPE_EXERCISE, TYPE_WORKOUT } from '../../constant';
import { getRandomItem } from '../../utils';
import { PlusIcon } from '../icons/plus';

const Content = () => {
  const today = startOfToday();

  const days = eachDayOfInterval({
    start: startOfWeek(new Date(today), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(today), { weekStartsOn: 1 }),
  });

  const [data, setData] = useState({
    ...initialData,
    columnOrder: days.map((day) => day.toISOString()),
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === TYPE_WORKOUT) {
      const home =
        data.columns[source.droppableId as keyof typeof data.columns];
      const foreign =
        data.columns[destination.droppableId as keyof typeof data.columns];

      if (home.id === foreign.id) {
        const newTaskIds = cloneDeep(home.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);
        const newHome = {
          ...home,
          taskIds: newTaskIds,
        };

        setData((prev) => ({
          ...prev,
          columns: {
            ...prev.columns,
            [newHome.id]: newHome,
          },
        }));

        return;
      }

      const homeTaskIds = cloneDeep(home.taskIds);
      homeTaskIds.splice(source.index, 1);
      const newHome = {
        ...home,
        taskIds: homeTaskIds,
      };

      const foreignTaskIds = cloneDeep(foreign.taskIds);
      foreignTaskIds.splice(destination.index, 0, draggableId);
      const newForeign = {
        ...foreign,
        taskIds: foreignTaskIds,
      };

      setData((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [newHome.id]: newHome,
          [newForeign.id]: newForeign,
        },
      }));
      return;
    }

    if (type === TYPE_EXERCISE) {
      const home = data.tasks[source.droppableId as keyof typeof data.tasks];
      const foreign =
        data.tasks[destination.droppableId as keyof typeof data.tasks];

      if (home.id === foreign.id) {
        const newExercises = cloneDeep(home.exercises);
        const existingExercise = newExercises.find(
          (ex) => ex.id === draggableId
        );
        newExercises.splice(source.index, 1);
        existingExercise &&
          newExercises.splice(destination.index, 0, existingExercise);

        const newHome = {
          ...home,
          exercises: newExercises,
        };

        setData((prev) => ({
          ...prev,
          tasks: {
            ...prev.tasks,
            [newHome.id]: newHome,
          },
        }));

        return;
      }

      const homeExercises = cloneDeep(home.exercises);
      const existingExercise = homeExercises.find(
        (ex) => ex.id === draggableId
      );
      homeExercises.splice(source.index, 1);

      const newHome = {
        ...home,
        exercises: homeExercises,
      };

      const foreignExercises = cloneDeep(foreign.exercises);
      existingExercise &&
        foreignExercises.splice(destination.index, 0, existingExercise);

      const newForeignExercises = {
        ...foreign,
        exercises: foreignExercises,
      };

      setData((prev) => ({
        ...prev,
        tasks: {
          ...prev.tasks,
          [newHome.id]: newHome,
          [newForeignExercises.id]: newForeignExercises,
        },
      }));
    }
  };

  const handAddNewWorkout = (day: string) => {
    const existingWorkout = data.columns[day as keyof typeof data.columns];
    const newTaskName = `task-${Object.keys(data.tasks).length + 1}`;
    const newTaskIds = [...existingWorkout.taskIds, newTaskName];

    const newWorkout = {
      ...existingWorkout,
      taskIds: newTaskIds,
    };

    const newTasks = {
      ...cloneDeep(data.tasks),
      [newTaskName]: {
        id: newTaskName,
        title: 'Exercise C',
        exercises: [],
      },
    };

    setData((prev) => ({
      ...prev,
      tasks: newTasks,
      columns: {
        ...prev.columns,
        [day]: newWorkout,
      },
    }));
  };

  const handleAddNewExercise = (droppableId: string) => {
    const existingTask = data.tasks[droppableId as keyof typeof data.tasks];

    const newEx = {
      ...existingTask,
      exercises: [
        ...existingTask.exercises,
        {
          id: `${droppableId}-exercise-${existingTask.exercises.length + 1}`,
          name: getRandomItem(EXERCISES_ARRAY),
          sets: '100 lb x 5, 120 lb x 5',
          times: 1,
        },
      ],
    };

    setData((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [droppableId]: newEx,
      },
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="py-20 flex-1 grid grid-cols-7 gap-x-2.5">
        {data.columnOrder.map((day) => {
          const column = data.columns[day as keyof typeof data.columns];

          const tasks = column.taskIds.map(
            (taskId) => data.tasks[taskId as keyof typeof data.tasks]
          );

          return (
            <DayBlock
              key={day}
              day={new Date(day)}
              buttonAdd={
                <button className="flex" onClick={() => handAddNewWorkout(day)}>
                  <PlusIcon />
                </button>
              }
            >
              <Droppable droppableId={day} type={TYPE_WORKOUT}>
                {(provided) => (
                  <div
                    className="flex flex-col space-y-2 flex-1"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {tasks.map((task, index) => {
                      return (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <TaskItem
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              title={task.title}
                              isDragging={snapshot.isDragging}
                              task={task}
                              buttonAdd={
                                <button
                                  className="flex"
                                  onClick={() => handleAddNewExercise(task.id)}
                                >
                                  <PlusIcon />
                                </button>
                              }
                            ></TaskItem>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DayBlock>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export { Content };
