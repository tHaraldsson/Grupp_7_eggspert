import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimerButtonComponent } from "./timer-button/timer-button.component";
import { ContinuousTimerButtonComponent } from "./continuous-timer-button/continuous-timer-button.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TimerButtonComponent, ContinuousTimerButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'eggspert';
}
