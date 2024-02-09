import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';

import Form from './form';

const data = {
  loanAmount: 1,
  interestRate: 2,
  initialRePayment: 3,
  fixedInterestPeriod: 0,
};
const emptyCallback = () => {};

describe('Form', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  
  afterEach(() => {
    cleanup();
  });

  it('renders Form', async () => {
    render(<Form data={data} onSubmit={emptyCallback} onChange={emptyCallback} />);
 
    const loanAmountInput = await screen.findByLabelText(/darlehensbetrag/i);
    const interestRateInput = await screen.findByLabelText(/sollzinssatz/i);
    const initialRePaymentInput = await screen.findByLabelText(/tilgung/i);
    const select = await screen.findByLabelText(/zinsbindungsdauer/i);
    const button = await screen.findByRole('button', { name: "Berechnen" });
 
    expect(loanAmountInput).toHaveValue(data.loanAmount);
    expect(interestRateInput).toHaveValue(data.interestRate);
    expect(initialRePaymentInput).toHaveValue(data.initialRePayment);
    expect(select).toHaveTextContent(/keine/i);
    expect(button).toBeInTheDocument();
  });

  it('calls onChange when changing loan amount value', async () => {
    const handleChange = jest.fn();

    render(<Form data={data} onSubmit={emptyCallback} onChange={handleChange} />);

    const loanAmountInput = await screen.findByLabelText(/darlehensbetrag/i);
    fireEvent.change(loanAmountInput, {target:{value:"100"}});

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('calls onChange when changing interest rate value', async () => {
    const handleChange = jest.fn();

    render(<Form data={data} onSubmit={emptyCallback} onChange={handleChange} />);

    const interestRateInput = await screen.findByLabelText(/sollzinssatz/i);
    fireEvent.change(interestRateInput, {target:{value:"100"}});

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('calls onChange when changing initial RePayment value', async () => {
    const handleChange = jest.fn();

    render(<Form data={data} onSubmit={emptyCallback} onChange={handleChange} />);

    const initialRePaymentInput = await screen.findByLabelText(/tilgung/i);
    fireEvent.change(initialRePaymentInput, {target:{value:"100"}});

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('calls onChange when changing fixed interest period value', async () => {
    const handleChange = jest.fn();

    render(<Form data={data} onSubmit={emptyCallback} onChange={handleChange} />);

    const select = await screen.findByLabelText(/zinsbindungsdauer/i);
    fireEvent.mouseDown(select);
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText(/30/i));

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit when clicking button', async () => {
    const handleSubmit = jest.fn();

    render(<Form data={data} onSubmit={handleSubmit} onChange={emptyCallback} />);
 
    const button = await screen.findByRole('button', { name: "Berechnen" });
    fireEvent.click(button);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});