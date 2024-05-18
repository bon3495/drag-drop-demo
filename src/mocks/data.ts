const initialData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Chest Day - with Arm exercises',
      exercises: [
        {
          id: 'task-1-exercise-1',
          name: 'Bench Press',
          sets: '50 lb x 5, 60 lb x 5',
          times: 3,
        },
        {
          id: 'task-1-exercise-2',
          name: 'Squats',
          sets: '100 lb x 5, 120 lb x 5',
          times: 3,
        },
      ],
    },
    'task-2': {
      id: 'task-2',
      title: 'Exercise B',
      exercises: [
        {
          id: 'task-2-exercise-1',
          name: 'Deadlift',
          sets: '50 lb x 5, 60 lb x 5',
          times: 3,
        },
        {
          id: 'task-2-exercise-2',
          name: 'Overhead Press',
          sets: '100 lb x 5, 120 lb x 5',
          times: 3,
        },
      ],
    },
    'task-3': {
      id: 'task-3',
      title: 'Exercise C',
      exercises: [
        {
          id: 'task-3-exercise-1',
          name: 'Pull-Up',
          sets: '50 lb x 5, 60 lb x 5',
          times: 3,
        },
        {
          id: 'task-3-exercise-2',
          name: 'Barbell Row',
          sets: '100 lb x 5, 120 lb x 5',
          times: 3,
        },
      ],
    },
  },
  columns: {
    '2024-05-12T17:00:00.000Z': {
      id: '2024-05-12T17:00:00.000Z',
      title: 'Leg Day',
      taskIds: ['task-1', 'task-2'],
    },
    '2024-05-13T17:00:00.000Z': {
      id: '2024-05-13T17:00:00.000Z',
      title: '',
      taskIds: [],
    },
    '2024-05-14T17:00:00.000Z': {
      id: '2024-05-14T17:00:00.000Z',
      title: 'Leg Day',
      taskIds: ['task-3'],
    },
    '2024-05-15T17:00:00.000Z': {
      id: '2024-05-15T17:00:00.000Z',
      title: '',
      taskIds: [],
    },
    '2024-05-16T17:00:00.000Z': {
      id: '2024-05-16T17:00:00.000Z',
      title: '',
      taskIds: [],
    },
    '2024-05-17T17:00:00.000Z': {
      id: '2024-05-17T17:00:00.000Z',
      title: '',
      taskIds: [],
    },
    '2024-05-18T17:00:00.000Z': {
      id: '2024-05-18T17:00:00.000Z',
      title: '',
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: [
    '2024-05-12T17:00:00.000Z',
    '2024-05-13T17:00:00.000Z',
    '2024-05-14T17:00:00.000Z',
    '2024-05-15T17:00:00.000Z',
    '2024-05-16T17:00:00.000Z',
    '2024-05-17T17:00:00.000Z',
    '2024-05-18T17:00:00.000Z',
  ],
};

export { initialData };
