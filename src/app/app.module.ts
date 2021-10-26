import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemComponent } from './item-list/item/item.component';
import { MyItemListComponent } from './my-item-list/my-item-list.component';
import { ItemDetailComponent } from './item-list/item-detail/item-detail.component';
import { EditComponent } from './my-item-list/edit/edit.component';
import { MyItemComponent } from './my-item-list/my-item/my-item.component';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    ItemListComponent,
    ItemComponent,
    MyItemListComponent,
    ItemDetailComponent,
    EditComponent,
    MyItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
