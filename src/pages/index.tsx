// pages/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container, Typography, Box } from '@mui/material';
import MedicineTable from './components/MedicineTable';
import LanguageSwitcher from './components/LanguageSwitcher';
import MedicineForm from './components/MedicineForm';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useEffect } from 'react';

export type Medicine = {
  name: string;
  dose: number;
  unit: string;
  interval: number;
  maxDays: number;
};


const Home: NextPage = () => {
  const { t } = useTranslation('common');
  const [medicines, setMedicines] = useLocalStorage<Medicine[]>('medicines', []);


  const addMedicine = (medicine: Medicine) => {
    const newMedicines = [...medicines, medicine];
    setMedicines(newMedicines);
    localStorage.setItem('medicines', JSON.stringify(newMedicines));
  };

  const deleteRow = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const storedMedicines = localStorage.getItem('medicines');
    if (storedMedicines) {
      setMedicines(JSON.parse(storedMedicines));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('medicines', JSON.stringify(medicines));
  }, [medicines]);


  return (
    <>
      <Head>
        <title>Medicine Schedule</title>
      </Head>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {t('nextDoses')}
          </Typography>
          <LanguageSwitcher />
          <MedicineForm addMedicine={addMedicine}   />
          <MedicineTable medicines={medicines} onDeleteRow={deleteRow} />
        </Box>
      </Container>
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Home;
