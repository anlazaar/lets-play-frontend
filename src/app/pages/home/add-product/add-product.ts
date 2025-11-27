import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [ProductService],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.css'],
})
export class AddProduct {
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private productService = inject(ProductService);

  productForm = this.fb.group({
    name: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(1)]],
    quantity: [0, [Validators.required, Validators.min(1)]],
  });

  successMessage = '';
  errorMessage = '';

  onSubmit() {
    if (this.productForm.invalid) return;

    this.productService.addProduct(this.productForm.value).subscribe({
      next: (res) => {
        this.successMessage = 'Product added successfully!';
        this.errorMessage = '';
        this.onClose();
        this.productForm.reset();
      },
      error: (err) => {
        this.errorMessage = 'Failed to add product';
        this.successMessage = '';
        console.log(err);
      },
    });
  }

  onClose() {
    this.productForm.reset();
    this.close.emit();
  }
}
