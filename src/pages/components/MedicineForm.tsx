import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import type { Medicine } from '../index';

interface MedicineFormProps {
  addMedicine: (medicine: Medicine) => void;
}

const MedicineForm: React.FC<MedicineFormProps> = ({ addMedicine }) => {
  const { t } = useTranslation('common');
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  const [unit, setUnit] = useState('');
  const [interval, setInterval] = useState('');
  const [maxDays, setMaxDays] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name && dose && unit && interval && maxDays) {
      addMedicine({
        name,
        dose: parseInt(dose),
        unit,
        interval: parseInt(interval),
        maxDays: parseInt(maxDays),
      });

      setName('');
      setDose('');
      setUnit('');
      setInterval('');
      setMaxDays('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mt={2}>
      <Typography variant="h6" gutterBottom>
        {t('addMedicine')}
      </Typography>
      <TextField label={t('name')} value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" />
      <TextField label={t('dose')} value={dose} onChange={(e) => setDose(e.target.value)} fullWidth margin="normal" />
      <FormControl fullWidth margin="normal">
        <InputLabel>{t('unit')}</InputLabel>
        <Select value={unit} onChange={(e) => setUnit(e.target.value as string)}>
          <MenuItem value="unitDrops">{t('unitDrops')}</MenuItem>
          <MenuItem value="unitPills">{t('unitPills')}</MenuItem>
          <MenuItem value="unitShots">{t('unitShots')}</MenuItem>
        </Select>
      </FormControl>
      <TextField label={t('interval')} value={interval} onChange={(e) => setInterval(e.target.value)} fullWidth margin="normal" />
      <TextField label={t('maxDays')} value={maxDays} onChange={(e) => setMaxDays(e.target.value)} fullWidth margin="normal" />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        {t('add')}
      </Button>
    </Box>
  );
};

export default MedicineForm;
