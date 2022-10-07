import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  count = 1
  name = ''

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  check() {
    console.log(this.count)
    this.count++
    this.router.navigate(['']);
  }

}
