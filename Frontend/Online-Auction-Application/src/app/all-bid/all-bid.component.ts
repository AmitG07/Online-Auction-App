import { Component, OnInit } from '@angular/core';
import { APIService } from '../Services/api.service';
import { AuthService } from '../Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-all-bid',
  templateUrl: './all-bid.component.html',
  styleUrls: ['./all-bid.component.css']
})
export class AllBidComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'userName', 'bidAmount', 'bidTime', 'status', 'delete'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadUserBids();
  }

  loadUserBids(): void {
    this.apiService.GetAllBids().subscribe({
      next: (bids) => {
        const bidRequests: Observable<any>[] = bids.$values.map((bid: any) =>
          forkJoin({
            product: this.apiService.GetProductById(bid.productId),
            user: this.apiService.GetUserById(bid.userId)
          }).pipe(
            map(({ product, user }) => ({
              ...bid,
              productName: product.name,
              userName: user.name
            }))
          )
        );

        forkJoin(bidRequests).subscribe({
          next: (bidDetails: any[]) => {
            this.dataSource.data = bidDetails;
            console.log(bidDetails);
          },
          error: (error) => {
            console.error('Error fetching product or user details:', error);
            this.snackBar.open('Error fetching product or user details', 'Close', { duration: 3000 });
          }
        });
      },
      error: (error) => {
        console.error('No Bids Available:', error);
        this.snackBar.open('No Bids Available', 'Close', { duration: 3000 });
      }
    });
  }

  deleteBid(bidId: number): void {
    if (confirm('Are you sure you want to delete this bid?')) {
      this.apiService.DeleteBid(bidId).subscribe({
        next: () => {
          this.loadUserBids(); // Refresh the list after deletion
          this.snackBar.open('Bid deleted successfully', 'Close', { duration: 3000 });
          console.log(bidId);
        },
        error: (error) => {
          console.error('Error deleting bid:', error);
          this.snackBar.open('Error deleting bid', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
