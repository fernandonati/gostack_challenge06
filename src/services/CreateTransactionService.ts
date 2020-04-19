 import AppError from '../errors/AppError';

import { getCustomRepository,getRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category : string;
}

class CreateTransactionService {
  public async execute({ title, value, type, category }: Request): Promise<Transaction> {
      const transactionsRespository = getCustomRepository(TransactionsRepository);
      const categoryRepository = getRepository(Category);
      //verify if catogory exists.
      //if exists, return Id, if not create new category. 
      
      const { total } = await transactionsRespository.getBalance();

      if (type === "outcome" && total < value) {
          throw new AppError("You do not have enough balance");
      }

      let transactionCategory = await categoryRepository.findOne({
        where: {
          title: category,
        }
      });

      if (!transactionCategory) {
        transactionCategory = categoryRepository.create({
          title: category,
        });

        await categoryRepository.save(transactionCategory);
      }
      
      const transaction = transactionsRespository.create({
        title,
        value,
        type,
        category: transactionCategory,
      });

      await transactionsRespository.save(transaction);

      return transaction;
  }
}

export default CreateTransactionService;
