"use client";

const ERROR_MSG = "fehlerhafte Eingabe";

import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";

export type RepaymentInfos = {
  loanAmount: number;
  interestRate: number;
  initialRePayment: number;
  fixedInterestPeriod: number;
};

export type FormProps = {
  data: RepaymentInfos;
  onSubmit: () => void;
  onChange: (infos: RepaymentInfos, error: boolean) => void;
  submitButtonDisabled: boolean;
};

const Form: React.FC<FormProps> = ({
  data,
  onSubmit,
  onChange,
  submitButtonDisabled,
}) => {
  const { loanAmount, interestRate, initialRePayment, fixedInterestPeriod } =
    data;

  // TODO
  // proper validtion of TextFields entries + error message for user
  return (
    <Stack spacing={2}>
      <TextField
        required
        error={isNaN(loanAmount)}
        helperText={isNaN(loanAmount) && ERROR_MSG}
        id="loan-amount"
        type="number"
        size="small"
        label="Darlehensbetrag"
        value={loanAmount}
        onChange={(e) => {
          const newLoanAmount = parseInt(e.target.value);

          onChange(
            { ...data, loanAmount: newLoanAmount },
            isNaN(newLoanAmount)
          );
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">€&nbsp;</InputAdornment>
          ),
          inputProps: { min: 0 },
        }}
      ></TextField>

      <TextField
        required
        error={isNaN(interestRate)}
        helperText={isNaN(interestRate) && ERROR_MSG}
        id="interest-rate"
        type="number"
        size="small"
        label="Sollzinssatz"
        value={interestRate}
        onChange={(e) => {
          const newInterestRate = parseInt(e.target.value, 10);

          onChange(
            { ...data, interestRate: newInterestRate },
            isNaN(newInterestRate)
          );
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">%&nbsp;</InputAdornment>
          ),
          inputProps: { min: 0, max: 100 },
        }}
      ></TextField>

      <TextField
        required
        error={isNaN(initialRePayment)}
        helperText={isNaN(initialRePayment) && ERROR_MSG}
        id="initial-repayment"
        type="number"
        size="small"
        label="anfängliche Tilgung"
        value={initialRePayment}
        onChange={(e) => {
          const newInitialRePayment = parseInt(e.target.value, 10);

          onChange(
            { ...data, initialRePayment: newInitialRePayment },
            isNaN(newInitialRePayment)
          );
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">%&nbsp;</InputAdornment>
          ),
          inputProps: { min: 0, max: 100 },
        }}
      ></TextField>

      <FormControl fullWidth>
        <InputLabel id="fixed-interest-period-select-label">
          Zinsbindungsdauer (Jahre)
        </InputLabel>
        <Select
          labelId="fixed-interest-period-select-label"
          id="fixed_interest_period"
          size="small"
          label="Zinsbindungsdauer (Jahre)"
          value={fixedInterestPeriod.toString()}
          onChange={(e) => {
            const newFixedInterestPeriod = parseInt(e.target.value);

            onChange(
              { ...data, fixedInterestPeriod: newFixedInterestPeriod },
              isNaN(newFixedInterestPeriod)
            );
          }}
        >
          <MenuItem value="0">
            <em>keine</em>
          </MenuItem>
          {Array.from(Array(30)).map((_, index) => {
            const i = index + 1;
            return (
              <MenuItem key={i} value={i}>
                {i}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Button
        disabled={submitButtonDisabled}
        variant="outlined"
        onClick={onSubmit}
      >
        Berechnen
      </Button>
    </Stack>
  );
};

export default Form;
