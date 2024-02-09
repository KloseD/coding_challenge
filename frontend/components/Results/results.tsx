"use client";

import {
  Divider,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React from "react";

export type RePaymentPlanRow = {
  year: number;
  rate: number;
  interestPortion: number;
  rePaymentShare: number;
  residualDebt: number;
};

export type ResultsProps = {
  monthlyRate: number;
  residualDebt: number;
  rePaymentPlan: RePaymentPlanRow[];
};

const Results: React.FC<ResultsProps> = ({
  monthlyRate,
  residualDebt,
  rePaymentPlan,
}) => {
  return (
    <Stack spacing={2}>
      <br />

      <TextField
        id="monthly-rate"
        size="small"
        label="monatliche Rate"
        value={monthlyRate}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">€&nbsp;</InputAdornment>
          ),
          readOnly: true,
        }}
      ></TextField>

      <TextField
        id="residual-debt"
        size="small"
        label="Restschuld am Ende der Zinsbindung"
        value={residualDebt}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">€&nbsp;</InputAdornment>
          ),
          readOnly: true,
        }}
      ></TextField>

      <Divider>Tilgungsplan mit jährlicher Aufgliederung</Divider>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="repayment plan table">
          <TableHead>
            <TableRow>
              <TableCell>Jahr</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Zinsanteil</TableCell>
              <TableCell>Tilgungsanteil</TableCell>
              <TableCell>Restschuld</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rePaymentPlan.map((row) => (
              <TableRow
                key={row.year}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.year}
                </TableCell>
                <TableCell>{row.rate}&nbsp;€</TableCell>
                <TableCell>{row.interestPortion}&nbsp;€</TableCell>
                <TableCell>{row.rePaymentShare}&nbsp;€</TableCell>
                <TableCell>{row.residualDebt}&nbsp;€</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
    </Stack>
  );
};

export default Results;
