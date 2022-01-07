import { Router } from '@angular/router';
import { Kayit } from './../../models/kayit';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/sonuc';
import { FirebaseService } from 'src/app/services/fbServis.service';
import { Kayit2 } from 'src/app/models/kayit2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-kayitlar',
  templateUrl: './kayitlar.component.html',
  styleUrls: ['./kayitlar.component.css']
})
export class KayitlarComponent implements OnInit {
  secKayit:Kayit= new Kayit();
  adsoyad:string;
  uid:string;
  kayitlar:Kayit[];
  ekleduzenle:boolean = false;



  secKayit2:Kayit2= new Kayit2();
  kayitlar2:Kayit2[];


  constructor(
    public fbServis:FirebaseService,
    public router:Router,
    public toast:ToastrService
  ) { }

  ngOnInit(): void {
    
    var user=JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.adsoyad = user.displayName;
    this.KayitListele();
    



    var user2 = JSON.parse(localStorage.getItem("user"));
    this.uid = user2.uid;
    this.Kayit2Listele();
  }
  Kaydet(){
    var user = JSON.parse(localStorage.getItem("user"));
    this.secKayit.uid = user.uid;
    var tarih = new Date();
    this.secKayit.kayTarih= tarih.getTime().toString();
    this.secKayit.duzTarih= tarih.getTime().toString();
    this.secKayit.islem = false;
    this.fbServis.KayitEkle(this.secKayit).then(d=>{
      this.toast.success("Kaydınız başarıyla paylaşıldı!")
      this.router.navigate(['/kayitlar'])
    })
  }



  Kaydet2(){
    var user2 = JSON.parse(localStorage.getItem("user"));
    this.secKayit2.uid = user2.uid;
  
    this.fbServis.Kayit2Ekle(this.secKayit2).then(d=>{
      this.toast.success("Kaydınız başarıyla paylaşıldı!")
    })
  }

  KayitListele(){
    this.fbServis.KayitListeleByUID(this.uid).snapshotChanges().subscribe(data=>{
      this.kayitlar=[];
      data.forEach(satir=>{
        const y ={...satir.payload.toJSON(),key:satir.key};
        this.kayitlar.push( y as Kayit);
      });
    })
  }


  Kayit2Listele(){
    this.fbServis.Kayit2ListeleByUID(this.uid).snapshotChanges().subscribe(data=>{
      this.kayitlar2=[];
      data.forEach(satir=>{
        const x ={...satir.payload.toJSON(),key2:satir.key};
        this.kayitlar2.push(x as Kayit2);
      });
    })
  }

  OturumKapat(){
    this.fbServis.OturumKapat().then(d=>{
      localStorage.removeItem("user")
      this.router.navigate(['/login'])
    })
  }

}
