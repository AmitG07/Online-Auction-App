import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APIService } from '../Services/api.service';
import { AlertService } from '../Services/alert.service';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  ProductForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: APIService,
    private alertService: AlertService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Initialize the form and get logged-in user's ID
    this.initializeForm();
  }

  initializeForm(): void {
    this.ProductForm = this.formBuilder.group({
        Name: ['', [Validators.required, Validators.maxLength(50)]],
        Description: ['', [Validators.required, Validators.maxLength(200)]],
        StartingPrice: [0],
        ReservedPrice: [0],
        AuctionEndTime: [Validators.required],
        Category: ['', [Validators.required, Validators.maxLength(50)]],
        Image: ['']
    });
  }  

  addProduct(): void {
    if (this.ProductForm.valid) {
        console.log('Form value:', this.ProductForm.value);

        this.apiService.AddProduct(this.ProductForm.value).subscribe({
            next: (response: any) => {
                this.alertService.openSnackBar('Product added successfully');
                this.router.navigate(['homepage']);
            },
            error: (error) => {
                console.error('Error adding product:', error);
                if (error.error) {
                    console.error('Error details:', error.error);
                }
            }
        });
    } else {
        console.log('Form invalid. Form value:', this.ProductForm.value);
        console.log('Form errors:', this.ProductForm.errors);
        this.alertService.openSnackBar('Please fill in all required fields.');
    }
  }      
}
