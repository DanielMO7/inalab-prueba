import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LayoutComponent } from './modules/layout/layout.component';
import { LoginComponent } from './modules/login/login.component';
import { AuthLoginGuard } from './modules/guard/auth-login.guard';
import { AuthGuard } from './modules/guard/auth.guard';
import { SignUpComponent } from './modules/sign-up/sign-up.component';
import { PerfilComponent } from './modules/perfil/perfil.component';
import { InsumosComponent } from './modules/insumos/insumos.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent, canActivate: [AuthGuard]
      },
      {
        path: 'sign-up',
        component: SignUpComponent, canActivate: [AuthGuard]
      },
      {
        path: 'home',
        component: HomeComponent, canActivate: [AuthLoginGuard]
      },
      {
        path: 'perfi',
        component: PerfilComponent, canActivate: [AuthLoginGuard]
      },
      {
        path: 'insumos',
        component: InsumosComponent, canActivate: [AuthLoginGuard]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
