import { Routes } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { LoginComponent } from './login/login.component';
import { MapsComponent } from './dashboard-user/maps/maps.component';
import { AddCollocationComponent } from './dashboard-user/add-collocation/add-collocation.component';
import { RegisterComponent } from './register/register.component';
import { AddCovoiturageComponent } from './dashboard-user/add-covoiturage/add-covoiturage.component';
import { ListCovoiturageComponent } from './dashboard-user/list-covoiturage/list-covoiturage.component';
import { ListannonceuserComponent } from './dashboard-user/listannonceuser/listannonceuser.component';
import { ListCollocationComponent } from './dashboard-user/list-collocation/list-collocation.component';
import { MapleafletComponent } from './dashboard-user/mapleaflet/mapleaflet.component';

export const routes: Routes = [
    { path: 'dashboardAdmin', component: DashboardAdminComponent },
    { path: 'dashboardUser', component: DashboardUserComponent , children:[
        {path: 'Maps', component:MapleafletComponent},
        { path: 'add-collocation', component:AddCollocationComponent }, 
        { path: 'add-covoiturage', component:AddCovoiturageComponent }, 
        {path: 'listmeetcovoi', component: ListCovoiturageComponent},
        {path :'listcovoiturageUser', component :ListannonceuserComponent},
        {path: 'listcollocation', component: ListCollocationComponent}, 
 
       ]},
       
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path: '', redirectTo:'login', pathMatch: 'full'},
    
];
