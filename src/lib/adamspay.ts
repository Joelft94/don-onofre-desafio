import axios from 'axios';

const ADAMSPAY_API_URL = process.env.ADAMSPAY_API_URL;
const ADAMSPAY_API_KEY = process.env.ADAMSPAY_API_KEY;

interface DebtAmount {
  currency: string;
  value: string;
}

interface ValidPeriod {
  start: string;
  end: string;
}

interface Debt {
  docId: string;
  amount: DebtAmount;
  label: string;
  validPeriod: ValidPeriod;
}

export async function createDebt(amount: number, concept: string, docId: string) {
  try {
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 days from now

    const debt: Debt = {
      docId: docId,
      amount: {
        currency: "PYG",
        value: amount.toString()
      },
      label: concept,
      validPeriod: {
        start: startDate.toISOString(),
        end: endDate.toISOString()
      }
    };

    const response = await axios.post(
      `${ADAMSPAY_API_URL}/debts`,
      { debt: debt },
      {
        headers: {
          'apikey': ADAMSPAY_API_KEY,
          'Content-Type': 'application/json',
          'x-if-exists': 'update'
        }
      }
    );

    if (response.data.debt) {
      return {
        payUrl: response.data.debt.payUrl,
        debtId: response.data.debt.docId
      };
    } else {
      throw new Error('Debt creation failed');
    }
  } catch (error) {
    console.error('Error creating debt:', error);
    throw error;
  }
}