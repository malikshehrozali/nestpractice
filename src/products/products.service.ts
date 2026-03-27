import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

interface Product {
  id: number | Date;
  name: string | undefined;
  price: number | undefined;
  description: string | undefined;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'iPhone 12',
      price: 999,
      description: 'A phone',
    },
    {
      id: 2,
      name: 'iPhone 12 Pro',
      price: 999,
      description: 'A phone',
    },
    {
      id: 3,
      name: 'iPhone 12 Pro Max',
      price: 999,
      description: 'A phone',
    },
    {
      id: 4,
      name: 'Mac Mini',
      price: 999,
      description: 'A Mac Mini Computer',
    },
  ];
  getProducts(): Product[] {
    return this.products;
  }
  getProductById(id: number): Product | undefined {
    const product = this.products.find((product) => product.id === id);
    return product;
  }
  addProduct(product: {
    name: string;
    price: number;
    description: string;
  }): Product | void {
    const newProduct = { id: new Date(), ...product };
    this.products.push(newProduct);

    return newProduct;
  }
  //   put request to totally update the product
  updateProduct(
    id: number,
    product: {
      name: string;
      price: number;
      description: string;
    },
  ): Product | string | any {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      return new NotFoundException('Product not found');
    }
    this.products[index] = { id, ...product };
    return this.products[index];
  }
  // patch request to partially update the product
  updateProductPartially(
    id: number,
    data: Partial<{ name: string; price: number; description: string }>,
  ): Product | string | any {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      return new NotFoundException('Product not found');
    }
    Object.assign(id, data);
    return this.products[index];
  }
  deleteProduct(id: number): Product | string | any {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      return new NotFoundException('Product not found');
    }
    this.products.splice(index, 1);
    return this.products[index];
  }
}
