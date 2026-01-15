import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import fs from 'fs/promises';
import 'json-to-ts';
@Injectable()
export class TransactionsService {
  private createTransactionDto: CreateTransactionDto;
  constructor(
    @InjectModel(Transaction)
    private transactionModel: typeof Transaction,
  ) {}

  async checkItemExist(item: CreateTransactionDto): Promise<boolean> {
    const found = await this.transactionModel.findOne({
      where: { name: item.name },
    });
    if (found === null) {
      return false;
    }
    return true;
  }

  async readjson() {
    const res = await fs.readFile('./src/moneyOfUnit/budget.json');
    const data =  await JSON.parse(res);
    return data
  }

  checkPurchases(item: CreateTransactionDto, file) {
    const cost = item.quantity * item.pricePerUnit;
    if (cost > file) {
      return false;
    }
    return true;
  }

  async buyItems(purchases): Promise<any> {
    for (const item of purchases) {
      const check = await this.checkItemExist(item);
      if (!check) {
        await this.transactionModel.create(item);
        return 'item added';
      }
      if (check) {
        const data = await this.readjson();
        
        return data.count;
        // const validateMoney = this.checkPurchases(item, data);
        // if (validateMoney) {
        //   return 'item added';
        }
      }
    }
  }
// }
