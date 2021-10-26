import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { ItemDetailComponent } from './item-list/item-detail/item-detail.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemResolver } from './item-list/item.resolver';
import { LoginComponent } from './login/login.component';
import { EditComponent } from './my-item-list/edit/edit.component';
import { EditResolver } from './my-item-list/edit/edit.resolver';
import { MyItemListComponent } from './my-item-list/my-item-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path:'items', component: ItemListComponent,},
  {path: 'items/detail/:id', component: ItemDetailComponent, resolve: [ItemResolver]},
  {path: 'myitems', component: MyItemListComponent, canActivate: [AuthGuard],
  // children: [
  //   {path: 'edit/:id', component: EditComponent}
  // ]
  },
  {path: 'myitems/edit/:userId/:objectId', component: EditComponent, resolve: [EditResolver], canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
