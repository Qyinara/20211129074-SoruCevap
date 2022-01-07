import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './components/home/home.component';
import { KayitlarComponent } from './components/kayitlar/kayitlar.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { ProfilComponent } from './components/profil/profil.component';
import { DetayComponent } from './components/detay/detay.component';
import { IcerikComponent } from './components/icerik/icerik.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    KayitlarComponent,
    LoginComponent,
    RegisterComponent,
    AdminpanelComponent,
    ProfilComponent,
    DetayComponent,
    IcerikComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
