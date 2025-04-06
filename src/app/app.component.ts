import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HamburgerMenuComponent } from "./hamburger-menu/hamburger-menu.component";
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',]
})
export class AppComponent {
  title = 'eggspert';

  currentRoute: string = '';
  isDesktop = window.innerWidth >= 768;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });

     // Uppdatera isDesktop vid fönsterändring
     window.addEventListener('resize', () => {
      this.isDesktop = window.innerWidth >= 768;
    });
  }

}
