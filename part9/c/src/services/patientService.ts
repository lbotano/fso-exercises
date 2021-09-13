import {v1 as uuid} from 'uuid';

import {parseGender} from '../utils';
import patientsData from '../../data/patients.json';
import {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry
} from '../types';

const patients: Array<PatientEntry> = patientsData.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    ssn: patient.ssn,
    gender: parseGender(patient.gender),
    occupation: patient.occupation
}));

const getEntries = (): Array<PatientEntry> => patients;

const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
  return patients.map(({id, name, occupation, gender, dateOfBirth}) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth
  }));
};

const createPatient = (patient: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  createPatient
};
