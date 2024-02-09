import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';

import Results from './results';

const data = {
  monthlyRate: 1,
  residualDebt: 2,
  rePaymentPlan: [{
    year: 0,
    rate: 0,
    interestPortion: 0,
    rePaymentShare: 0,
    residualDebt: 0,
  }]
};

describe('Form', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  
  afterEach(() => {
    cleanup();
  });

  it('renders Results', async () => {
    render(<Results monthlyRate={data.monthlyRate} residualDebt={data.residualDebt} rePaymentPlan={data.rePaymentPlan} />);

    const monthlyRateInput = await screen.findByLabelText(/monatliche rate/i);
    const residualDebtInput = await screen.findByLabelText(/restschuld am ende der zinsbindung/i);
    const x = await screen.getByLabelText(/repayment plan table/i);

    expect(monthlyRateInput).toHaveDisplayValue(data.monthlyRate);
    expect(residualDebtInput).toHaveDisplayValue(data.residualDebt);
    expect(x.querySelectorAll('tr').length).toBe(2);
  });
});