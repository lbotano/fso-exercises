export type Gender = 'male' | 'female' | 'other';
export type HealthRating = 0 | 1 | 2 | 3;

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: Date;
  ssn: string;
  gender: Gender;
  occupation: string;
  healthRating?: HealthRating;
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export interface DiagnoseEntry {
  code: string,
  name: string,
  latin?: string
}
