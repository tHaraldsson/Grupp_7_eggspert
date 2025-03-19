import { Routes } from '@angular/router';
import { BasicTimmerViewComponent } from './view/basic-timmer-view/basic-timmer-view.component';
import { ContinuousTimmerViewComponent } from './view/continuous-timmer-view/continuous-timmer-view.component';
import { RecipeViewComponent } from './view/recipe-view/recipe-view.component';

export const routes: Routes = [
  { path: '', component: BasicTimmerViewComponent },
  { path: 'continuous', component: ContinuousTimmerViewComponent },
  { path: 'recipe', component: RecipeViewComponent },
];
