import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sonuc } from 'src/app/models/sonuc';
import { Uye } from 'src/app/models/uye';
import { FirebaseService } from 'src/app/services/fbServis.service';
import {map} from 'rxjs/operators'
import { Kayit } from 'src/app/models/kayit';
import { Kayit2 } from 'src/app/models/kayit2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {
  secKayit:Kayit= new Kayit();
  adsoyad:string;

  kayitlar:Kayit[];
  ekleduzenle:boolean = false;
  sonuc: Sonuc = new Sonuc();
  silme:boolean=false;
  secUye: Uye = new Uye();
  uyeler: Uye[];



  constructor(
    public fbServis:FirebaseService,
    public router:Router,
    public toast:ToastrService
  ) { }

  ngOnInit(): void {
    var user=JSON.parse(localStorage.getItem("user"));
    this.adsoyad = user.displayName;
    
    this.UyeListele();

    var user2 = JSON.parse(localStorage.getItem("user"));
   
  
  }


  UyeSec(k:Uye){
    Object.assign(this.secUye,k)
  }

  UyeListele(){
    this.fbServis.UyeListele().snapshotChanges().subscribe(data=>{
      this.uyeler=[];
      data.forEach(satir=>{
        const y ={...satir.payload.toJSON(),key:satir.key};
        this.uyeler.push( y as Uye);
      });
    })
  }
  Sil(){
    this.fbServis.UyeSil(this.secUye.key).then(d=>{
      this.sonuc.islem=true;
      this.sonuc.mesaj="Kayıt Silindi";
      this.silme=false;
  
    });
  
    }

  TamamlaIptal(k: Kayit, islem: boolean) {
    k.islem = islem;
    this.fbServis.KayitDuzenle(k).then(d => {
      this.sonuc.islem = true;
    })
  }

}
