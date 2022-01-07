import { FirebaseService } from 'src/app/services/fbServis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sonuc } from 'src/app/models/sonuc';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  sonuc: Sonuc = new Sonuc();
  constructor(
    public fbservis:FirebaseService,
    public router: Router,
    public toast:ToastrService
  ) { }

  ngOnInit(): void {
  }
  GirisYap(mail:string,parola:string){
this.fbservis.OturumAc(mail,parola).then(d=>{
if (d.user){
  localStorage.setItem("user",JSON.stringify(d.user));
  this.router.navigate(['/']);
  this.toast.success("Giriş Başarılı")
  
}
}, err =>{
  this.sonuc.islem = false;
  this.sonuc.mesaj =  "E-posta/Parola Geçersiz"
  this.toast.error("Kullanıcı Adı veya Parola Yanlış","Hatalı Giriş")
});
  }
}
