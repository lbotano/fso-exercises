import diagnosesData from '../../data/diagnoses.json';
import {DiagnoseEntry} from '../types';

const diagnoses: Array<DiagnoseEntry> = diagnosesData as Array<DiagnoseEntry>;

const getEntries = (): Array<DiagnoseEntry> => diagnoses;

export default {
  getEntries
};
