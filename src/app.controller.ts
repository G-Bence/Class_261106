import { Controller, Get, Render, Param, Post, Body } from '@nestjs/common';
import { AppService } from './app.service.js';
import { GoodsDto } from './goods.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  goods: GoodsDto[] = [
    { name: 'Product 1', price: 10.99, image: 'https://placehold.co/600x400?text=Product+1', id: 1 },
    { name: 'Product 2', price: 19.99, image: 'https://placehold.co/600x400?text=Product+2', id: 2 },
    { name: 'Product 3', price: 5.99, image: 'https://placehold.co/600x400?text=Product+3', id: 3 },
  ];

  cart: GoodsDto[] = [];

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App',
      goods: this.goods,
      cart: this.cart,
    }
  }

  @Post('/')
  @Render('index')
  addToCart(@Body() body: { productId: number }) {
    const productId = Number(body.productId);
    const product = this.goods.find(item => item.id === productId);
    if (product) {
      this.cart.push(product);
      console.log(`Added product with ID ${productId} to cart.`);
      console.log('Current cart:', this.cart);
    }

    return {
      title: 'My First NestJS App',
      goods: this.goods,
      cart: this.cart,
    }
  }
}
