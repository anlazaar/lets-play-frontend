import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-page',
  imports: [RouterLink],
  providers: [ProductService],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductPage implements OnInit {
  product: any;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.productService.getProductById(id!).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => console.log(err),
    });
  }
}
