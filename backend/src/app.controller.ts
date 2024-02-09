import { Controller, Get, Query } from '@nestjs/common';
import { AppService, CalcResponse } from './app.service';

@Controller('calculate')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('repayment-plan')
  calculateRepaymentPlan(@Query() query): CalcResponse {
    // TODO
    // Validation for query params (Pipe?)
    const { loanAmount, interestRate, initialRePayment, fixedInterestPeriod } =
      query;

    return this.appService.calcRepaymentPlan(
      loanAmount,
      interestRate,
      initialRePayment,
      fixedInterestPeriod,
    );
  }
}
