import { Injectable } from '@nestjs/common';

export type RepaymentPlanEntry = {
  year: number;
  rate: number;
  interestPortion: number;
  rePaymentShare: number;
  residualDebt: number;
};

export type CalcResponse = {
  monthlyRate: number;
  residualDebt: number;
  rePaymentPlan: RepaymentPlanEntry[];
};

@Injectable()
export class AppService {
  calcRepaymentPlan(
    loanAmount: number,
    interestRate: number,
    initialRepayment: number,
    fixedInterestPeriod: number,
  ): CalcResponse {
    const months = calcMonthlyRepaymentPlan(loanAmount, interestRate, initialRepayment);
    const years = transformMonthsIntoYears(months);
    const residualDebt = fixedInterestPeriod != 0 ? 
      months[(fixedInterestPeriod * 12) - 1].residualDebt :
      years[years.length - 1].residualDebt;

    return {
      monthlyRate: months[0].rate,
      residualDebt: residualDebt,
      rePaymentPlan: years,
    };
  }
}

const transformMonthsIntoYears = (months: RepaymentPlanEntry[]): RepaymentPlanEntry[] => {
  const chunks = chunk(months, 12);

  const years = chunks.map((chunk, chunkIndex) => {
    return chunk.reduce((acc: RepaymentPlanEntry, curr: RepaymentPlanEntry) => {
      const rate = fixedNumber(acc.rate + curr.rate);
      const interestPortion = fixedNumber(acc.interestPortion + curr.interestPortion);
      const repaymentShare = fixedNumber(acc.rePaymentShare + curr.rePaymentShare);
      const residualDebt = curr.residualDebt;

      return createData(chunkIndex + 1, rate, interestPortion, repaymentShare, residualDebt);
    }, createData(0, 0, 0, 0, 0));
  });

  return years;
}

// TODO
// interest rate after end of fixed interest period is not defined
// interest rate will stay the same for now. Would need to be adjusted (same as monthly rate, interest portion & repayment share)
const calcMonthlyRepaymentPlan = (loanAmount: number, interestRate: number, initialRepayment: number): RepaymentPlanEntry[] => {
  const list = [];
  let month = 1;
  let interestPortion = calcInterestPortion(loanAmount, interestRate);
  let repaymentShare = calcInterestPortion(loanAmount, initialRepayment);
  let monthlyRate = interestPortion + repaymentShare;
  let residualDebt = loanAmount - repaymentShare;

  list.push(createData(month++, monthlyRate, interestPortion, repaymentShare, residualDebt));
  
  for(; residualDebt > 0; month++) {
    interestPortion = calcInterestPortion(residualDebt, interestRate);

    if (monthlyRate > residualDebt) {
      repaymentShare = residualDebt;
      monthlyRate = interestPortion + repaymentShare;
      residualDebt = 0;
    }
    else {
      repaymentShare = calcRepaymentShare(monthlyRate, interestPortion);
      residualDebt = calcResidualDebt(residualDebt, repaymentShare);
    }

    list.push(createData(month, monthlyRate, interestPortion, repaymentShare, residualDebt));
  }

  return list;
}

const fixedNumber = (value: number, fractionDigits: number = 2): number => {
  return Number(value.toFixed(fractionDigits));
}

const calcInterestPortion = (debt: number, interest: number): number => {
  return fixedNumber((debt * (interest / 100)) / 12)
}

const calcRepaymentShare = (rate: number, interestPortion: number): number => {
  return fixedNumber(rate - interestPortion);
}

const calcResidualDebt = (debt: number, repaymentShare: number): number => {
  return fixedNumber(debt - repaymentShare);
}

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
    arr.slice(index * size, index * size + size)
  );

function createData(
  year: number,
  rate: number,
  interestPortion: number,
  rePaymentShare: number,
  residualDebt: number
) {
  return { year, rate, interestPortion, rePaymentShare, residualDebt };
}
