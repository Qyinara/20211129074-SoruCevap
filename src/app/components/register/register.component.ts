import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sonuc } from 'src/app/models/sonuc';
import { Uye } from 'src/app/models/uye';
import { FirebaseService } from 'src/app/services/fbServis.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  sonuc: Sonuc = new Sonuc();
  secUye: Uye = new Uye();
  constructor(
    public fbservis:FirebaseService,
    public router: Router,
    public toast:ToastrService
  ) { }

  ngOnInit(): void {
  }


  KayitYap(){
    var tarih = new Date();
    
    this.fbservis.UyeOl(this.secUye).then(d => {
d.user.updateProfile({
  displayName:this.secUye.adsoyad

}).then();
this.secUye.kayTarih= tarih.getTime().toString();
this.secUye.uid = d.user.uid;
localStorage.setItem("user", JSON.stringify(d.user));
this.UyeEkle();
    },err =>{
      this.sonuc.islem = false;
      this.sonuc.mesaj =  "Hata Oluştu Tekrar Deneyiniz!"
    });
  }


UyeEkle(){
this.fbservis.UyeEkle(this.secUye).then(d=>{
this.router.navigate(['/login']);
});
this.toast.success("Giriş Yapabilirsiniz","Kayıt Başarılı")
}
}
