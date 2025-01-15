import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/admin/home/home.component';
import { PropertiesComponent } from './pages/admin/properties/properties.component';
import { RepairsComponent } from './pages/admin/repairs/repairs.component';
import { CreatePropertyComponent } from './pages/admin/properties/components/create-property/create-property.component';
import { UpdatePropertyComponent } from './pages/admin/properties/components/update-property/update-property.component';
import { CreateRepairComponent } from './pages/admin/repairs/components/create-repair/create-repair.component';
import { RepairFormComponent } from './pages/admin/repairs/components/repair-form/repair-form.component';
import { CreateOwnerComponent } from './pages/admin/properties/components/create-owner/create-owner.component';
import { UpdateOwnerComponent } from './pages/admin/properties/components/update-owner/update-owner.component';
import { UpdateRepairComponent } from './pages/admin/home/update-repair/update-repair.component';
import { SearchOwnerComponent } from './pages/admin/properties/components/search-owner/search-owner.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent
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
        path:'create-repair',
        component: CreateRepairComponent
    },
    {
        path: 'repair-form',
        component: RepairFormComponent
    }

    { 
        path: 'create-owner', 
        component: CreateOwnerComponent 
    },
    { 
        path: 'update-owner/:id', 
        component: UpdateOwnerComponent 
    },
    {
        path: 'update-repair/:id',
        component: UpdateRepairComponent
    },
    { 
        path: 'search-owner', 
        component: SearchOwnerComponent 
    },

];

