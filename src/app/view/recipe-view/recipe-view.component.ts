import { Component, } from '@angular/core';
import { RecipeComponent } from "../../recipe/recipe.component";
import { HRecipeComponent } from "../../h-recipe/h-recipe.component";
import { EggTipsComponent } from "../../egg-tips/egg-tips.component";


@Component({
  selector: 'app-recipe-view',
  imports: [HRecipeComponent],
  templateUrl: './recipe-view.component.html',
  styleUrl: './recipe-view.component.css'
})
export class RecipeViewComponent {

}


