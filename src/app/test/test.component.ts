import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/test.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  productList: any;
  constructor(public testService:TestService) { }

  ngOnInit(): void {
    this.testService.getProduct().subscribe((data: any) => {
      if (data) {
        this.productList = data.productList;
      } 
    });
  }

}
