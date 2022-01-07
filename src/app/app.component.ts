import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth} from '@angular/fire/auth'
import { Uye } from './models/uye';
import { FirebaseService } from './services/fbServis.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sorucevapfirebase';
  
  private dbUye = '/Uyeler';
  

  uyeRef: AngularFireList<Uye> = null;
  constructor(
    public fbServis:FirebaseService,
    public router:Router,
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase
  ) { }

  ngOnInit(): void {
  }
  OturumKontrol(){
    if(localStorage.getItem("user")){
      return true;
    }
    else{
      return false;
    }
    }

    OturumuKapat(){
      this.fbServis.OturumKapat().then(()=>{
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
      });
    }
    
}



