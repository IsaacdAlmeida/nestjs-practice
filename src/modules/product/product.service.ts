import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ProductDTO } from './product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: ProductDTO) {
    const productExists = await this.prisma.product.findFirst({
      where: {
        productName: data.productName,
      },
    });

    if (productExists) {
      throw new Error('PRoduct already exists');
    }

    const product = await this.prisma.product.create({
      data,
    });

    return product;
  }

  async findAll() {
    const allProducts = await this.prisma.product.findMany();

    return allProducts;
  }

  async update(id: string, data: ProductDTO) {
    const productExists = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!productExists) throw new Error('Product does not exists!');

    return await this.prisma.product.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const productExists = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!productExists) throw new Error('Product does not exists!');

    return await this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
