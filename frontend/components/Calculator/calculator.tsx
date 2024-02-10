"use client";

import React, { useState } from "react";
import Form, { RepaymentInfos } from "../Form/form";
import Results, { ResultsProps } from "../Results/results";
import queryString from "query-string";

const BASE_URL = "http://localhost:4000/calculate/repayment-plan?";

const initialRePaymentInfos = (): RepaymentInfos => {
  return {
    loanAmount: 250000,
    interestRate: 2,
    initialRePayment: 3,
    fixedInterestPeriod: 0,
  };
};

// TODO
// adding integration/e2e tests

const Calculator: React.FC = () => {
  // TODO
  // using reducer (+ separate testing) instead of state
  const [results, setResults] = useState<ResultsProps | null>(null);
  const [repaymentInfos, setRepaymentInfos] = useState<RepaymentInfos>(
    initialRePaymentInfos()
  );
  const [validParams, setValidParams] = useState<boolean>(true);

  const callApi = async () => {
    try {
      const queries = queryString.stringify(repaymentInfos);

      const res = await fetch(BASE_URL + queries);
      const results: ResultsProps = await res.json();

      setResults(() => results);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitHandler = () => {
    callApi();
  };

  const onChangeHandler = (infos: RepaymentInfos, error: boolean) => {
    setRepaymentInfos(() => infos);

    if (error) {
      setValidParams(() => false);
      return;
    }

    setValidParams(() => true);

    if (results === null) return;

    callApi();
  };

  return (
    <div>
      <Form
        data={repaymentInfos}
        onSubmit={onSubmitHandler}
        onChange={onChangeHandler}
        submitButtonDisabled={!validParams}
      />
      {results && (
        <Results
          monthlyRate={results.monthlyRate}
          residualDebt={results.residualDebt}
          rePaymentPlan={results.rePaymentPlan}
        />
      )}
    </div>
  );
};

export default Calculator;
