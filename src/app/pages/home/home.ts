import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { TokenService } from '../../services/token.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/product.service';
import { AddProduct } from './add-product/add-product';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AddProduct, RouterLink],
  providers: [ProductService],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  products: Product[] = [];
  loading = false;
  isAdmin = false;
  token: string | null = ""

  showAddProduct = false;

  constructor(private productService: ProductService, private tokenService: TokenService) {}


  ngOnInit(): void {
    this.token = this.tokenService.getToken();
    this.isAdmin = this.tokenService.isAdmin();

    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log("PRODUCTS", data)
        
        
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  toggleAddProduct() {
    this.showAddProduct = !this.showAddProduct;
  }
}
