import { Delete } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { format } from 'date-fns';
import { useTranslation } from 'next-i18next';
import React from 'react';
import type { Medicine } from '../index';

interface MedicineTableProps {
  medicines: Medicine[];
  onDeleteRow: (index: number) => void;
}
const MedicineTable: React.FC<MedicineTableProps> = ({ medicines, onDeleteRow }) => {
  const { t } = useTranslation('common');

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('name')}</TableCell>
            <TableCell>{t('dose')}</TableCell>
            <TableCell>{t('nextDose')}</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {medicines.map((medicine, index) => {
            const doses = [];
            const now = new Date();
            for (let i = 0; i < medicine.maxDays * 24; i += medicine.interval) {
              const nextDose = new Date(now.getTime() + i * 60 * 60 * 1000);
              const dose = {
                name: medicine.name,
                dose: medicine.dose,
                unit: medicine.unit,
                time: format(nextDose, 'HH:mm'),
                date: format(nextDose, 'dd/MM/yyyy'),
              };
              doses.push(dose);
            }
            return (
              <React.Fragment key={index}>
                {doses.map((dose, i) => (
                  <TableRow key={`${index}-${i}`}>
                    {i === 0 && (
                      <>
                        <TableCell rowSpan={doses.length}>{medicine.name}</TableCell>
                        <TableCell rowSpan={doses.length}>{`${medicine.dose} ${t(medicine.unit)}`}</TableCell>
                      </>
                    )}
                    <TableCell>{`${dose.date} ${dose.time}`}</TableCell>
                    {i === 0 && (
                      <TableCell>
                        <IconButton onClick={() => onDeleteRow(index)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MedicineTable;
