import { Routes } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { LoginComponent } from './login/login.component';
import { MapsComponent } from './dashboard-user/maps/maps.component';
import { AddCollocationComponent } from './dashboard-user/add-collocation/add-collocation.component';

export const routes: Routes = [
    { path: 'dashboardAdmin', component: DashboardAdminComponent },
    { path: 'dashboardUser', component: DashboardUserComponent , children:[
        {path: 'Maps', component:MapsComponent},
        { path: 'add-collocation', component:AddCollocationComponent }, 
     ]},
    { path: 'login', component: LoginComponent },
    {path: '', redirectTo:'login', pathMatch: 'full'},
    
];
