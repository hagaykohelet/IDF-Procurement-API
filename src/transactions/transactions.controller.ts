import { Controller, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  check(@Body() req: any) {
    return this.transactionsService.buyItems(req);
  }
}
