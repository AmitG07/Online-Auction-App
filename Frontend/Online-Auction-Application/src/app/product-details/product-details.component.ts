import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../Services/api.service';
import { AuthService } from '../Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product$: Observable<any> = of(null); // Initialize with an empty observable
  product: any; // To hold the product data for display
  currentProductId: number | undefined;

  constructor(
    private apiService: APIService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentProductId = +params['productId'];  // Convert to number
      console.log('Current Product ID:', this.currentProductId);
      this.loadProductDetails(this.currentProductId);
    });
  }

  loadProductDetails(productId: number): void {
    this.apiService.GetProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
        console.log('Product details:', product);
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      }
    });
  }

  placeBid(): void {
    if (this.authService.isloggedin()) {
      this.router.navigate(['/add-bid', this.product.productId]);
    } else {
      this.snackBar.open('You must be logged in to place a bid.', 'Close', {
        duration: 3000,
      });
    }
  }
}
