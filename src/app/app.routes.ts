import { Routes } from '@angular/router';
import { HomeComponent } from './pages/admin/home/home.component';
import { PropertiesComponent } from './pages/admin/properties/properties.component';
import { RepairsComponent } from './pages/admin/repairs/repairs.component';
import { CreatePropertyComponent } from './pages/admin/properties/components/create-property/create-property.component';
import { UpdatePropertyComponent } from './pages/admin/properties/components/update-property/update-property.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomeComponent
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
    }
];
