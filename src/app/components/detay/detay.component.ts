import { FirebaseService } from 'src/app/services/fbServis.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Kayit } from 'src/app/models/kayit';
import { Kayit2 } from 'src/app/models/kayit2';
import { Sonuc } from 'src/app/models/sonuc';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detay',
  templateUrl: './detay.component.html',
  styleUrls: ['./detay.component.css']
})
export class DetayComponent implements OnInit {
  adsoyad:string;
  uid:string;
  kayitlar:Kayit[];
  kayitlar2:Kayit2[];
key:string;
sonuc:Sonuc= new Sonuc();
secKayit:Kayit= new Kayit();

secKayit2:Kayit2= new Kayit2();
  constructor(

    public route : ActivatedRoute,
    public  fbServis : FirebaseService,
    public router : Router,
    public toast:ToastrService
  ) { }

  ngOnInit(): void {
    var user2 = JSON.parse(localStorage.getItem("user"));
    this.uid = user2.uid;
    this.Kayit2Listele();
    this.route.params.subscribe(p=>{

      this.key = p.key;
      this.KayitGetir();
  });

}
KayitGetir(){
  this.fbServis.KayitByKey(this.key).snapshotChanges().subscribe(data=>{
   const y ={...data.payload.toJSON(),key:this.key};
    this.secKayit =(y as Kayit)
  })
}
Kaydet2(){
  var user2 = JSON.parse(localStorage.getItem("user"));
  this.secKayit2.uid = user2.uid;

  this.fbServis.Kayit2Ekle(this.secKayit2).then(d=>{
    this.toast.success("Yorum Paylaşıldı")
    
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


}

