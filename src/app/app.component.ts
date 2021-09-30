import { Component } from '@angular/core';
import { TestService } from './test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aci-frontend';
  productList: any;
  constructor(public testService:TestService) { }

  ngOnInit(): void {
    this.testService.getProduct().subscribe((data: any) => {
      if (data) {
        this.productList = data;
      } 
    });
  }
}
