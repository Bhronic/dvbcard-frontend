import { TemplateSelectComponent } from './pages/template-select/template-select.component';
import { ViewTemplate9Component } from './pages/view-card/templates/view-template9/view-template9.component';
import { ViewTemplate8Component } from './pages/view-card/templates/view-template8/view-template8.component';
import { ViewTemplate7Component } from './pages/view-card/templates/view-template7/view-template7.component';
import { ViewTemplate6Component } from './pages/view-card/templates/view-template6/view-template6.component';
import { ViewTemplate5Component } from './pages/view-card/templates/view-template5/view-template5.component';
import { ViewTemplate4Component } from './pages/view-card/templates/view-template4/view-template4.component';
import { ViewTemplate3Component } from './pages/view-card/templates/view-template3/view-template3.component';
import { ViewCardComponent } from './pages/view-card/view-card.component';
import { ViewTemplate1Component } from './pages/view-card/templates/view-template1/view-template1.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { ViewTemplate2Component } from './pages/view-card/templates/view-template2/view-template2.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegisterComponent,
    ViewCardComponent,
    ViewTemplate1Component,
    ViewTemplate2Component,
    ViewTemplate3Component,
    ViewTemplate4Component,
    ViewTemplate5Component,
    ViewTemplate6Component,
    ViewTemplate7Component,
    ViewTemplate8Component,
    ViewTemplate9Component,
    TemplateSelectComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatMenuModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    MatProgressSpinnerModule
  ]
})
export class AppModule { }
