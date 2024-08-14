import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { APIService } from '../Services/api.service';
import { AlertService } from '../Services/alert.service';
import { AuthService } from '../Services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-bid',
  templateUrl: './add-bid.component.html',
  styleUrls: ['./add-bid.component.css']
})
export class AddBidComponent implements OnInit {
  BidForm!: FormGroup;
  currentProductId: number | undefined;
  currentUserId: number | undefined;
  highestBid: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: APIService,
    private alertService: AlertService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Initialize the form and get logged-in user's ID
    this.initializeForm();
    this.currentUserId = this.authService.GetId();
    console.log(this.currentUserId);
  }

  initializeForm(): void {
    const currentDate = new Date().toISOString().split('T')[0];
    // Fetch the product ID from the route parameters
    this.route.params.subscribe(params => {
      this.currentProductId = +params['productId'];  // Convert to number
      console.log('Current Product ID:', this.currentProductId);
      this.loadProductDetails(this.currentProductId);
    });
    this.currentUserId = this.authService.GetId();
    // Initialize the form only when both values are available
    if (this.currentProductId !== undefined && this.currentUserId !== undefined) {
      this.BidForm = this.formBuilder.group({
        ProductId: [this.currentProductId],  // Use the primitive value
        UserId: [this.currentUserId],        // Use the primitive value
        BidAmount: [, [Validators.required, this.bidAmountValidator.bind(this)]],
        BidTime: [currentDate, Validators.required]
      });
    }
  }

  loadProductDetails(productId: number): void {
    this.apiService.GetProductById(productId).subscribe({
      next: (product) => {
        this.highestBid = product.currentHighestBid || 0;
        console.log(product.currentHighestBid);
        // Update the BidAmount validator with the new highest bid
        this.BidForm.get('BidAmount')?.updateValueAndValidity();
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      }
    });
  }

  bidAmountValidator(control: AbstractControl): { [key: string]: any } | null {
    if (control.value <= this.highestBid) {
      return { 'bidTooLow': true };
    }
    return null;
  }

  placeBid(): void {
    if (this.BidForm.valid) {
      console.log('Form value:', this.BidForm.value);
      this.apiService.PlaceBid(this.BidForm.value).subscribe({
        next: (response: any) => {
          this.alertService.openSnackBar('Bid Placed successfully');
          this.router.navigate(['homepage']);
        },
        error: (error) => {
          console.error('Error in placing bid:', error);
          if (error.error && error.error.message) {
            this.alertService.openSnackBar(error.error.message); // Display error message from backend
          } else {
            this.alertService.openSnackBar('An unexpected error occurred.');
          }
        }
      });
    } else {
      console.log('Form invalid. Form value:', this.BidForm.value);
      console.log('Form errors:', this.BidForm.errors);
      this.alertService.openSnackBar('Please fill in all required fields and ensure bid amount is higher than the current highest bid and starting price.');
    }
  }  
}
