import patientsData from '../../data/patients.json';
import {PatientEntry, NonSensitivePatientEntry} from '../types';
import {verifyGender} from '../utils';

const patients: Array<PatientEntry> = patientsData.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: new Date(patient.dateOfBirth),
    ssn: patient.ssn,
    gender: verifyGender(patient.gender),
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

export default {
  getEntries,
  getNonSensitiveEntries
};
