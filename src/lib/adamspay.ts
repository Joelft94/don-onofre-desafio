import axios from 'axios';

const ADAMSPAY_API_URL = process.env.ADAMSPAY_API_URL;
const ADAMSPAY_API_KEY = process.env.ADAMSPAY_API_KEY;

export async function createDebt(amount: number, concept: string, docId: string) {
  try {
    const now = new Date();
    const end = new Date(now.getTime() + 48 * 60 * 60 * 1000); // 48 hours from now

    const formatDate = (date: Date) => {
      return date.toISOString().split('.')[0] + '-04:00'; // Assuming Paraguay time zone (GMT-4)
    };

    const response = await axios.post(
      `${ADAMSPAY_API_URL}/debts`,
      {
        debt: {
          docId: docId,
          amount: {
            currency: "PYG",
            value: Math.round(amount).toString()
          },
          label: concept,
          validPeriod: {
            start: formatDate(now),
            end: formatDate(end)
          }
        }
      },
      {
        headers: {
          'apikey': ADAMSPAY_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('AdamsPay response:', response.data);

    if (response.data.debt) {
      return {
        payUrl: response.data.debt.payUrl,
        debtId: response.data.debt.docId
      };
    } else {
      throw new Error('Debt creation failed: ' + JSON.stringify(response.data));
    }
  } catch (error) {
    console.error('AdamsPay error response:', error.response?.data || error.message);
    throw error;
  }
}