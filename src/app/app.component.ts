import { provideHttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { addSharp, createOutline, saveSharp } from 'ionicons/icons';

import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
// import '@ionic/angular/css/palettes/dark.always.css';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone:true,
  imports: [IonApp, IonRouterOutlet]
})
export class AppComponent {
  constructor() {
    this.addallicons();
  }

  addallicons(){
    addIcons({
      saveSharp,
      addSharp,
      createOutline
    });
  }
}
