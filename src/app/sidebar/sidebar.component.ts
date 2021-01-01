import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-laptop',       class: '' },
    // { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    // { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    { path: '/card-details',          title: 'Card Details',      icon:'nc-single-copy-04',  class: '' },
    { path: '/roles',          title: 'Manage Roles',      icon:'nc-single-02',  class: '' },
    { path: '/user',          title: 'Create Card',      icon:'nc-album-2',  class: '' },
    //{ path: '/ckeditor',          title: 'CK Editor',      icon:'nc-caps-small',  class: '' }
    // { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {

    userRole: string;

    public menuItems: any[];

    constructor(){ }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.userRole = localStorage.getItem('userRole');
    }

}
