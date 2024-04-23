import { Routes } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { LoginComponent } from './login/login.component';
import { MapsComponent } from './dashboard-user/maps/maps.component';
import { AddCovoiturageComponent } from './dashboard-user/add-covoiturage/add-covoiturage.component';

export const routes: Routes = [
    { path: 'dashboardAdmin', component: DashboardAdminComponent },
    { path: 'dashboardUser', component: DashboardUserComponent , children:[
        {path: 'Maps', component:MapsComponent},
        { path: 'add-covoiturage', component:AddCovoiturageComponent }, 
       ]},
    { path: 'login', component: LoginComponent },
    {path: '', redirectTo:'login', pathMatch: 'full'},
    
];
