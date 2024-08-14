import { Component, OnInit } from '@angular/core';
import { APIService } from '../Services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-bids-of-product',
  templateUrl: './all-bids-of-product.component.html',
  styleUrls: ['./all-bids-of-product.component.css']
})
export class AllBidsOfProductComponent implements OnInit {
  displayedColumns: string[] = ['productId', 'userId', 'bidAmount', 'bidTime', 'status'];
  dataSource = new MatTableDataSource<any>([]);
  currentProductId: number | undefined;

  constructor(
    private apiService: APIService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentProductId = +params['productId'];  // Convert to number
      console.log('Current Product ID:', this.currentProductId);
      this.loadUserBids(this.currentProductId);
    });
  }

  loadUserBids(productId: number): void {
    this.apiService.GetBidsByProductId(productId).subscribe({
      next: (bids: any) => {
        this.dataSource.data = bids.$values;
        console.log(bids.$values);
      },
      error: (error) => {
        console.error('No Bids Available:', error);
        this.snackBar.open('No Biding Available', 'Close', { duration: 3000 });
      }
    });
  }
}
