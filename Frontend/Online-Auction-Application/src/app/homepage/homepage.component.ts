import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { APIService } from '../Services/api.service';
import { AlertService } from 'src/app/Services/alert.service';
import { Product, ProductResponse } from '../models/product.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  Products: Product[] = [];
  displayedColumns: string[] = ['name', 'description', 'startingPrice', 'auctionEndTime', 'category', 'actions'];

  searchForm: FormGroup;
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private service: APIService,
    private _alert: AlertService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      name: [''],
      category: [''],
      minPrice: [null],
      maxPrice: [null],
      sortBy: ['']
    });
  }

  ngOnInit(): void {
    this.onSearchAndSort(); // Automatically trigger search and sort on component initialization
  }

  onSearchAndSort() {
    const formValues = this.searchForm.value;
    const params = {
      name: formValues.name || '',
      category: formValues.category || '',
      minPrice: formValues.minPrice || null,
      maxPrice: formValues.maxPrice || null,
      sortBy: formValues.sortBy || '',
      page: this.page,
      pageSize: this.pageSize
    };

    console.log('Request Params:', params); // Log request params

    // Fetch products based on search criteria
    this.service.SearchAndSortProducts(params).subscribe({
      next: (response: ProductResponse) => {
        console.log('API Response:', response); // Log API response
        this.Products = response.products.$values || [];
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this._alert.openSnackBar('Error fetching products');
      }
    });
  }

  clearFilters() {
    this.searchForm.reset();
  }
}
