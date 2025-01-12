import { Routes } from '@angular/router';
import { HomeComponent } from './pages/admin/home/home.component';
import { PropertiesComponent } from './pages/admin/properties/properties.component';
import { RepairsComponent } from './pages/admin/repairs/repairs.component';
import { CreatePropertyComponent } from './pages/admin/properties/components/create-property/create-property.component';
import { UpdatePropertyComponent } from './pages/admin/properties/components/update-property/update-property.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'properties',
        component: PropertiesComponent
    },
    {
        path: 'repairs',
        component: RepairsComponent
    },
    { 
        path: 'create-property', 
        component: CreatePropertyComponent 
    },
    { 
        path: 'update-property/:id', 
        component: UpdatePropertyComponent 
    },
    {
        path:'login',
        component:LoginComponent
    }
];
