import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
// import { IonHeader, IonToolbar, IonTitle, IonContent ,IonFooter, IonLabel,IonGrid,IonCol, IonRow, IonList, IonItem} from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { GroceryService } from '../service/grocery/grocery.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule,RouterLink],
})
export class HomePage implements OnInit,OnDestroy {
  // private groceryService=inject(GroceryService);
  constructor(private router:Router,private groceryService:GroceryService) {}
  Item?:any[];
  taskSub!:Subscription;
  isToast:boolean=false;
  ngOnInit():void{
    // this.Item=this.groceryService.getItems();
    // console.log("Printing",this.groceryService.getItems());
    this.groceryService.getTasks()
    this.taskSub=this.groceryService.task.subscribe({next:(value:any)=>{
      this.Item=value;
    },
    error:(err)=>{
      console.log("Got Error here");
    }
  })
    console.log("Printing Item",this.Item);
  }

  view(id:number){
    console.log("Clicked On the button",id)
    this.groceryService.getTaskById(id)
    this.router.navigateByUrl(`/list/${id}`);
  }


  // Camera Plugin Ionic Capacitor


  // image:any;
  // async uploadImage(){
  //   try{
  //     const image = await Camera.getPhoto({
  //       quality: 90,
  //       allowEditing: true,
  //       source:CameraSource.Prompt,
  //       resultType: CameraResultType.Uri
  //     });
  //     console.log(image);
  //     this.image=image.webPath;
  //   }
  //   catch(e){
  //     console.log(e);
  //   }
  // }

  ngOnDestroy(): void {
    if(this.taskSub) this.taskSub.unsubscribe();
  }
}
