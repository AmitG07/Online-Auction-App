import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
import { MatSortModule } from '@angular/material/sort'; // Import MatSortModule
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddBidComponent } from './add-bid/add-bid.component';
import { MyBidComponent } from './my-bid/my-bid.component';
import { AllBidComponent } from './all-bid/all-bid.component';
import { AllProductComponent } from './all-product/all-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { TruncatePipe } from './truncate.pipe';
import { AllBidsOfProductComponent } from './all-bids-of-product/all-bids-of-product.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminDashboardComponent,
    CustomerDashboardComponent,
    HomepageComponent,
    AddProductComponent,
    AddBidComponent,
    MyBidComponent,
    AllBidComponent,
    AllProductComponent,
    ProductDetailsComponent,
    TruncatePipe,
    AllBidsOfProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
