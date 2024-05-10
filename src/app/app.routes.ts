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
import { ChattroomAssitanceComponent } from './dashboard-user/chattroom-assitance/chattroom-assitance.component';
import { ReclamtionComponent } from './dashboard-user/reclamtion/reclamtion.component';
import { WebsocketComponent } from './dashboard-user/websocket/websocket.component';
import { ClaimsComponent } from './dashboard-admin/claims/claims.component';
import { StatComponent } from './dashboard-admin/stat/stat.component';

export const routes: Routes = [
    { path: 'dashboardAdmin', component: DashboardAdminComponent, children:[
        {path:'claims', component : ClaimsComponent},
        {path:'stat', component:StatComponent},
    ] },
    { path: 'dashboardUser', component: DashboardUserComponent , children:[
        {path: 'Maps', component:MapleafletComponent},
        { path: 'add-collocation', component:AddCollocationComponent }, 
        { path: 'add-covoiturage', component:AddCovoiturageComponent }, 
        {path: 'listmeetcovoi', component: ListCovoiturageComponent},
        {path :'listcovoiturageUser', component :ListannonceuserComponent},
        {path: 'listcollocation', component: ListCollocationComponent}, 
        {path:'Chattroomassitance', component: ChattroomAssitanceComponent},
        {path:'reclamtion', component:ReclamtionComponent},
        
       ]},

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path: '', redirectTo:'login', pathMatch: 'full'},
    
];
