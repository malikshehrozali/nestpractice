import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';

interface Product {
  id: number | Date;
  name: string | undefined;
  price: number | undefined;
  description: string | undefined;
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Get()
  getProducts(): Product[] {
    return this.productService.getProducts();
  }
  @Get(':id')
  getProductById(@Param('id') id: string): Product | undefined {
    return this.productService.getProductById(Number(id));
  }
  @Post()
  addProduct(
    @Body() body: { name: string; price: number; description: string },
  ): Product | void {
    return this.productService.addProduct(body);
  }
  @Put(':id')
  updateProduct(
    @Body() body: { name: string; price: number; description: string },
    @Param('id') id: string,
  ): Product | string | any {
    return this.productService.updateProduct(Number(id), body);
  }
  @Patch(':id')
  updateProductPartially(
    @Body() body: Partial<{ name: string; price: number; description: string }>,
    @Param('id') id: string,
  ): Product | string | any {
    return this.productService.updateProductPartially(Number(id), body);
  }
  @Delete(':id')
  deleteProduct(@Param('id') id: string): Product | string | any {
    return this.productService.deleteProduct(Number(id));
  }
}
