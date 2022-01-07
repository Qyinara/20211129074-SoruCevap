import { Uye } from './../models/uye';
import { Kayit } from './../models/kayit';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth} from '@angular/fire/auth'
import { Kayit2 } from '../models/kayit2';

@Injectable({
  providedIn: 'root'
})


  export class FirebaseService {

    private dbKayit = '/Kayitlar';
    private dbUye = '/Uyeler';
    private dbYorum = '/Yorum';
    
    
    kayitRef: AngularFireList<Kayit> = null;
    uyeRef: AngularFireList<Uye> = null;
    yorumRef: AngularFireList<Kayit2> = null;
    
    constructor(
    
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
    
    )
    {
    this.kayitRef = db.list(this.dbKayit);
    this.uyeRef = db.list(this.dbUye);
    this.yorumRef = db.list(this.dbYorum);
    }




    

OturumAc(mail:string,parola:string){
return this.afAuth.signInWithEmailAndPassword(mail,parola)
}
OturumKapat(){
return this.afAuth.signOut();
}

OturumKontrol(){
  if(localStorage.getItem("user")){
    return true;
  }
  else{
    return false;
  }
  }






/*kayitlar servis başlangıç */

KayitByKey(key:string){
  return this.db.object("/Kayitlar/"+key);
}


/*kayitlar servis bitiş */


/*Uye servisleri */

UyeListele(){
  return this.uyeRef;
}
UyeSil(key:string){
  return this.uyeRef.remove(key)
}

UyeOl(uye:Uye){
return this.afAuth.createUserWithEmailAndPassword(uye.mail, uye.parola);
}

UyeEkle(uye:Uye){
return this.uyeRef.push(uye);
}





KayitListele(){
  return this.kayitRef;
}
KayitListeleByUID(uid:string){
  return this.db.list("/Kayitlar",q=>q.orderByChild("uid").equalTo(uid));
}
KayitEkle(kayit:Kayit){
  return this.kayitRef.push(kayit);
}
KayitDuzenle(kayit:Kayit){
  return this.kayitRef.update(kayit.key,kayit);
}
KayitSil(key:string){
  return this.kayitRef.remove(key);
}
/* firabase bitiş */ 



Kayit2Listele(){
  return this.yorumRef;
}
Kayit2ListeleByUID(uid:string){
  return this.db.list("/Yorum",q2=>q2.orderByChild("uid").equalTo(uid));
}
Kayit2Ekle(kayit2:Kayit2){
  return this.yorumRef.push(kayit2);
}
Kayit2Duzenle(kayit2:Kayit2){
  return this.yorumRef.update(kayit2.key2,kayit2);
}
Kayit2Sil(key2:string){
  return this.yorumRef.remove(key2);
}







}
