import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public toast:ToastrService
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

  ToastUygula(){
    this.toast.success("Mesajlarınız","Başlık")
  }
}



