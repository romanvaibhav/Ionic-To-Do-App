import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButton, IonLabel, IonList, IonInput, IonTextarea, IonButtons, IonIcon, IonToast } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { GroceryService } from 'src/app/service/grocery/grocery.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
  standalone: true,
  imports: [IonToast, ReactiveFormsModule,IonIcon, IonTextarea, IonInput, IonList, IonButton, IonBackButton, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule]
})
export class ItemDetailPage implements OnInit {

  // private fomb=Inject(FormBuilder);
  form!:FormGroup;
  item:any;
  isToast:boolean=false;
  constructor(private fomb: FormBuilder,private route: ActivatedRoute,  private router: Router,private groceryService:GroceryService) { }

  // item:any;
  ngOnInit() {
    this.initForm();

    this.getParamData();

  }

  initForm(){
    this.form=this.fomb.group({
      title:[null,Validators.required],
      description:[null,Validators.required]
    });
  }

  async getParamData(){
    const id = this.route.snapshot.paramMap.get("id");
    console.log(id);
    if(id){
      this.item=await this.groceryService.getTaskById(+id)
      this.updateValue({...this.item});
    }

        // const Items=this.groceryService.getItems();
    //  this.item=Items.find(item=>item.id==id);
    // console.log(this.item);
  }

  updateValue(data: { title:string, description:string}){
    console.log(data);
    this.form.patchValue({
      ...data
    });
  }


  onSubmit(){
    this.isToast=true;
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;

    }
    console.log(this.form.value)
    if(this.item){
      this.groceryService.editTask(this.form.value,this.item);
    }
    else this.groceryService.addTask(this.form.value);
  }




}
