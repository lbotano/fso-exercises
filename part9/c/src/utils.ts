import {Gender, NewPatientEntry} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseString = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error(`Expected string but got ${param}`);
  }
  return param;
};

const parseDate = (param: unknown): string => {
  if (!param || !isString(param) || !isDate(param)) {
    throw new Error(`Invalid date: ${param}`);
  }
  return param;
};

export const parseGender = (param: unknown): Gender => {
  if (!param || !isGender(param)) {
    throw new Error(`Invalid gender: ${param}`);
  }
  return param;
};

type PatientFields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown
};

export const toNewPatientEntry = (fields: PatientFields): NewPatientEntry => ({
  name: parseString(fields.name),
  dateOfBirth: parseDate(fields.dateOfBirth),
  ssn: parseString(fields.ssn),
  gender: parseGender(fields.gender),
  occupation: parseString(fields.occupation)
});
