import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/admin/home/home.component';
import { PropertiesComponent } from './pages/admin/properties/properties.component';
import { RepairsComponent } from './pages/admin/repairs/repairs.component';
import { CreatePropertyComponent } from './pages/admin/properties/components/create-property/create-property.component';
import { UpdatePropertyComponent } from './pages/admin/properties/components/update-property/update-property.component';
import { CreateOwnerComponent } from './pages/admin/properties/components/create-owner/create-owner.component';
import { UpdateOwnerComponent } from './pages/admin/properties/components/update-owner/update-owner.component';
import { UpdateRepairComponent } from './pages/admin/home/update-repair/update-repair.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './shared/auth.guard';
import { SearchOwnerComponent } from './pages/admin/properties/components/search-owner/search-owner.component';


export const routes: Routes = [
    {
      path: '', // Default route
      redirectTo: '/login',
      pathMatch: 'full' // Ensures an exact match for the empty path
    },
    {
      path: 'login', // Login page
      component: LoginComponent
    },
    {
      path: 'home', // Home page
      component: HomeComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'properties', // Properties management
      component: PropertiesComponent
    },
    {
      path: 'repairs', // Repairs management
      component: RepairsComponent
    },
    {
      path: 'create-property', // Create a new property
      component: CreatePropertyComponent
    },
    {
      path: 'update-property/:id', // Update a property by ID
      component: UpdatePropertyComponent
    },
    {
      path: 'create-owner', // Create a new owner
      component: CreateOwnerComponent
    },
    {
      path: 'update-owner/:id', // Update an owner by ID
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

      path: 'update-repair/:id', // Update a repair by ID
      component: UpdateRepairComponent
    }
  ];
  

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}