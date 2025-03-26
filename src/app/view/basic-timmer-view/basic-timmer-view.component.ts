import { Component } from '@angular/core';
import { TimerButtonComponent } from '../../timer-button/timer-button.component';
import { EggTimerComponent } from "../../egg-timer/egg-timer.component";

@Component({
  selector: 'app-basic-timmer-view',
  standalone: true, 
  imports: [TimerButtonComponent, EggTimerComponent],
  templateUrl: './basic-timmer-view.component.html',
  styleUrl: './basic-timmer-view.component.css'
})
export class BasicTimmerViewComponent {

}
