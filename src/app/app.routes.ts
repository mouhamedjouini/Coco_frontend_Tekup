import { Routes } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { LoginComponent } from './login/login.component';
import { MapsComponent } from './dashboard-user/maps/maps.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: 'dashboardAdmin', component: DashboardAdminComponent },
    { path: 'dashboardUser', component: DashboardUserComponent , children:[
        {path: 'Maps', component:MapsComponent}, ]},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path: '', redirectTo:'login', pathMatch: 'full'},
    
];
