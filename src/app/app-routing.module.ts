import { IcerikComponent } from './components/icerik/icerik.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KayitlarComponent } from './components/kayitlar/kayitlar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AngularFireAuthGuard,redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { DetayComponent } from './components/detay/detay.component';

const redirectLogin=()=>redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'adminpanel', component:AdminpanelComponent},
  {path:'icerik', component:IcerikComponent},
  {path:'profil', component:ProfilComponent},
  {path:"detay/:key",
  component:DetayComponent,
  canActivate:[AngularFireAuthGuard],
  data:{
    authGuardPipe: redirectLogin
  }
},
   
  {
    path:'kayitlar',
    component:KayitlarComponent,
    canActivate:[AngularFireAuthGuard],
    data:{
      authGuardPipe: redirectLogin
    },


},



  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
