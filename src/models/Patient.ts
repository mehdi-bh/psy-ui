export interface Patient {
  PatientId: string;
  FirstName: string;
  LastName: string;
  DateOfBirth: string;
  Sex: string;
  Email: string;
  PhoneNumber: string;
  Address: {
    Street: string;
    City: string;
    State: string;
    ZipCode: string;
  };
  Description?: string;
  Photo?: string;
  PsychologistId: string;
}
