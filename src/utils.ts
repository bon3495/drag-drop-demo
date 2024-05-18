import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomItem(array: string[]) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
