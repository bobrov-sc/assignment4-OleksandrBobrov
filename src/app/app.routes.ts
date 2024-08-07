import { Routes } from '@angular/router';
import {ListComponent} from "./list/list.component";
import {DetailsComponent} from "./details/details.component";

export const routes: Routes = [
  {path: 'catalog', component: ListComponent},
  {path: 'pets/:id', component: DetailsComponent},
  {path: '', redirectTo: 'catalog'},
  {path: '**', redirectTo: 'catalog'}
];
