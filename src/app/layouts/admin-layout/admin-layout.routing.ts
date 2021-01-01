import { AdminPanelComponent } from './../../pages/admin-panel/admin-panel.component';
import { ViewCardComponent } from './../../pages/view-card/view-card.component';
import { RolesComponent } from './../../pages/roles/roles.component';
import { UserCardDetailsComponent } from './../../pages/user-card-details/user-card-details.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { CkeditorComponent } from 'app/pages/ckeditor/ckeditor.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'admin-panel',    component: AdminPanelComponent },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'ckeditor',       component: CkeditorComponent },
    { path: 'card-details',   component: UserCardDetailsComponent },
    { path: 'roles',          component: RolesComponent }
];
