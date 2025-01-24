import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';


const TASK_KEY="taskskey";
@Injectable({
  providedIn: 'root'
})
export class GroceryService {

  private task$=new BehaviorSubject<any[]>([]);




//  private Items:any[]=[
//     {
//       id:1,
//       name:'Tomato',
//       description:'Ripe and Sweet Tomato',
//     },
//     {
//       id:2,
//       name:'Pineapple',
//       description:'Yellowish Pineapple',
//     },
//     {
//       id:3,
//       name:'Orange',
//       description:'Orange Color Orange',

//     },
//     {
//       id:4,
//       name:'Wine',
//       description:'TasteLess Wine',
//     }
//   ];
  constructor() {
    // this.getTasks();
  }

  // getItems(){
  //   console.log("sending Itemas",this.Items);
  //   let item=this.Items
  //   return item;
  // }

  async addTask(data:{title:string, description:string}){
    console.log("data",data);

    const task_data=this.task$.value;
    let tasks=[{ ...data, created_at:new Date(),id:task_data?.length+1}];
    tasks=tasks.concat(task_data);
    await this.setStorage(tasks);
    console.log(tasks);
    this.task$.next(tasks);
  }


  get task(){
    return this.task$.asObservable();
  }

  async getTaskById(id:number){
    let tasks=this.task$.value;
    if(tasks.length==0){
      tasks=await this.getTasks();

    }
    const task=tasks.find((tas)=> tas.id==id);
    console.log(task);
    return task;
  }


  async editTask(data:{title:string, description:string},oldTask:any){
    console.log("data",data);

    const tasks_data=this.task$.value;
    const index=tasks_data.findIndex((task)=>task.id==oldTask.id);
    if(index>=0){
      tasks_data[index]={ ...tasks_data[index], ...data};
      await this.setStorage(tasks_data);

      this.task$.next(tasks_data);
    }
  }

  setStorage(tasks:any[]){

    return Preferences.set({
      key:TASK_KEY,
      value:JSON.stringify(tasks),
    });

  }


  getStorage(){
    return Preferences.get({
      key:TASK_KEY
    });
  }

  async getTasks(){
    let tasks=this.task$.value;
    if(!tasks || tasks.length==0){
      const data=await this.getStorage();
      console.log(data);
      if(data?.value){
        tasks=JSON.parse(data.value);
        this.task$.next(tasks);
      }
    }
    return tasks;
  }
}
