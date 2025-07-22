import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Portfolio } from '@app/resources/portfolios/entities/portfolio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyStockDto } from '@app/resources/stocks/dto/buy-stock.dto';
import { User } from '@app/resources/users/entities/user.entity';

@Injectable()
export class PortfoliosService extends  TypeOrmCrudService<Portfolio>{
  constructor(@InjectRepository(Portfolio) repo) {
    super(repo);
  }

  async saveHolding(dto: BuyStockDto, quantity: number, user: User): Promise<Portfolio> {
    // First, check if user already owns this stock
    const  holding = await this.repo.findOne({
      where: {
        user: { id: user.id } as User,
        stock: dto.symbol,
      },
    });
    if (!holding) {
      // No holding, create it from scratch
      return await this.repo.save({
        user,
        stock: dto.symbol,
        quantity,
      });
    }

    return await this.repo.save({ ...holding, quantity:  holding.quantity += quantity });
  }
}
