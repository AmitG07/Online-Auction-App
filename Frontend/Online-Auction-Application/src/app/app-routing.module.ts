import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddBidComponent } from './add-bid/add-bid.component';
import { AuthGuard } from './auth.guard';
import { MyBidComponent } from './my-bid/my-bid.component';
import { AllBidComponent } from './all-bid/all-bid.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AllProductComponent } from './all-product/all-product.component';
import { AllBidsOfProductComponent } from './all-bids-of-product/all-bids-of-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'customer-dashboard', component: CustomerDashboardComponent },
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: 'add-bid/:productId', component: AddBidComponent, canActivate: [AuthGuard]  },
  { path: 'my-bid', component: MyBidComponent },
  { path: 'all-bid', component: AllBidComponent, canActivate: [AuthGuard] },
  { path: 'product-details/:productId', component: ProductDetailsComponent, canActivate: [AuthGuard] },
  { path: 'all-products', component: AllProductComponent, canActivate: [AuthGuard] },
  { path: 'allBids-of-Product/:productId', component: AllBidsOfProductComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
