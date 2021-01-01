import { Template9Component } from './../../pages/user/templates/template9/template9.component';
import { Template8Component } from './../../pages/user/templates/template8/template8.component';
import { Template7Component } from './../../pages/user/templates/template7/template7.component';
import { Template6Component } from './../../pages/user/templates/template6/template6.component';
import { Template5Component } from './../../pages/user/templates/template5/template5.component';
import { Template4Component } from './../../pages/user/templates/template4/template4.component';
import { AdminPanelComponent } from './../../pages/admin-panel/admin-panel.component';
import { RolesComponent } from './../../pages/roles/roles.component';
import { UserCardDetailsComponent } from './../../pages/user-card-details/user-card-details.component';
import { Template1Component } from './../../pages/user/templates/template1/template1.component';
import { TemplateSelectComponent } from './../../pages/template-select/template-select.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { TableComponent }           from '../../pages/table/table.component';
import { TypographyComponent }      from '../../pages/typography/typography.component';
import { IconsComponent }           from '../../pages/icons/icons.component';
import { MapsComponent }            from '../../pages/maps/maps.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';
import { UpgradeComponent }         from '../../pages/upgrade/upgrade.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CkeditorComponent } from 'app/pages/ckeditor/ckeditor.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { Template2Component } from 'app/pages/user/templates/template2/template2.component';
import { Template3Component } from 'app/pages/user/templates/template3/template3.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule,
    MatProgressSpinnerModule,
    DragDropModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    CkeditorComponent,
    Template1Component,
    Template2Component,
    Template3Component,
    Template4Component,
    Template5Component,
    Template6Component,
    Template7Component,
    Template8Component,
    Template9Component,
    UserCardDetailsComponent,
    RolesComponent,
    AdminPanelComponent
  ]
})

export class AdminLayoutModule {}
