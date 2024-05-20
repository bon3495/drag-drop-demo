import { SVGProps } from 'react';

export type IconProps = SVGProps<SVGSVGElement>;

export interface BlockProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ExerciseItemProps {
  id: string;
  name: string;
  sets: string;
  times: number;
}

export interface TaskItemProps {
  id: string;
  title: string;
  exercises: ExerciseItemProps[];
}

export interface ColumnItemProps {
  id: string;
  taskIds: string[];
}
