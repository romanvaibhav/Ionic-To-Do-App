import { Routes } from '@angular/router';
import { ItemDetailPage } from './home/item-detail/item-detail.page';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'item-detail',
    loadComponent: () => import('./home/item-detail/item-detail.page').then( m => m.ItemDetailPage)
  },
  {
    path: 'list/:id',
    component:ItemDetailPage
  },
  {
    path: 'add-task',
    component:ItemDetailPage
  },
];
