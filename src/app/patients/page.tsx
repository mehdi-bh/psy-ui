"use client";

import { useState } from 'react';

interface Patient {
  id: number;
  name: string;
}

const Patients = () => {
  // Sample data for patients
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Robert Brown' },
    // Add more patients as needed
  ]);

  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1>Patients</h1>
      <input
        type="text"
        placeholder="Search patients..."
        value={searchTerm}
        onChange={handleSearch}
        style={styles.searchBar}
      />
      <ul style={styles.list}>
        {filteredPatients.map((patient) => (
          <li key={patient.id} style={styles.listItem}>
            {patient.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Basic styles
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  searchBar: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  list: {
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
};

export default Patients;
