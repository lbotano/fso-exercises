import {Gender} from './types';

export const verifyGender = (gender: string): Gender => {
  if (
    gender !== 'male'
    && gender !== 'female'
    && gender !== 'other'
  ) {
    throw new Error('invalid gender');
  }

  return gender as Gender;
}
