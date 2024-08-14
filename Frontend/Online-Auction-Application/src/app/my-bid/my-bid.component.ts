import { Component, OnInit } from '@angular/core';
import { APIService } from '../Services/api.service';
import { AuthService } from '../Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-my-bid',
  templateUrl: './my-bid.component.html',
  styleUrls: ['./my-bid.component.css']
})
export class MyBidComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'bidAmount', 'bidTime', 'status'];
  dataSource: any[] = [];

  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadUserBids();
  }

  loadUserBids(): void {
    const userId = this.authService.GetId();
    if (userId) {
      this.apiService.GetBidByUserId(userId).subscribe({
        next: (bids) => {
          const bidRequests: Observable<any>[] = bids.$values.map((bid: any) => 
            this.apiService.GetProductById(bid.productId).pipe(
              map((product: any) => ({ ...bid, productName: product.name }))
            )
          );
          
          forkJoin(bidRequests).subscribe({
            next: (bidDetails: any[]) => {
              this.dataSource = bidDetails;
              console.log(bidDetails);
            },
            error: (error) => {
              console.error('Error fetching product details:', error);
              this.snackBar.open('Error fetching product details', 'Close', { duration: 3000 });
            }
          });
        },
        error: (error) => {
          console.error('Error fetching user bids:', error);
          this.snackBar.open('Error fetching user bids', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('User not logged in', 'Close', { duration: 3000 });
    }
  }
}
