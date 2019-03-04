//Packages
import { Component, OnInit } from '@angular/core';
//Services
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
public currentUser: any = null;
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    //Watches a variable User to see changes
    this.auth.currentUser.subscribe(user => {
      this.currentUser=user;//currentUser changes its value if observable currentUser User change.
    });
  }
}
