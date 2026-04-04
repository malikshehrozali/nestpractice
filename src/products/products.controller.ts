import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './interfaces/products.interface';
import { ProductDto } from './dto/products.dto';
import { UppercasePipe } from 'src/common/pipes/uppercase/uppercase.pipe';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { HttpExceptionFilter } from 'src/filters/http-exception/http-exception.filter';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Get()
  @UseGuards(AuthGuard)
  getProducts(): Product[] {
    return this.productService.getProducts();
  }
  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  getProductById(@Param('id') id: string): Product | undefined {
    return this.productService.getProductById(Number(id));
  }
  @Post()
  addProduct(@Body() body: ProductDto): Product | void {
    return this.productService.addProduct(body);
  }
  @Put(':id')
  updateProduct(
    @Body() body: ProductDto,
    @Param('id') id: string,
  ): Product | string | any {
    return this.productService.updateProduct(Number(id), body);
  }
  @Patch(':id')
  updateProductPartially(
    @Body() body: Partial<ProductDto>,
    @Param('id') id: string,
  ): Product | string | any {
    return this.productService.updateProductPartially(Number(id), body);
  }
  @Delete(':id')
  deleteProduct(@Param('id') id: string): Product | string | any {
    return this.productService.deleteProduct(Number(id));
  }
  @Post('name')
  // custom pipe calling functionality
  updateProductName(@Body('name', new UppercasePipe()) name: string) {
    return { message: `Product name updated to ${name}` };
  }
  
}
