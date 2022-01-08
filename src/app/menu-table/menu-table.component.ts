import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-table',
  templateUrl: './menu-table.component.html',
  styleUrls: ['./menu-table.component.css']
})
export class MenuTableComponent implements OnInit {

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) { }
  data: any = '';
  dataEquipment: any = '';
  dataClient: any = '';
  data2: any = '';
  alertMessage: string = "";
  serviceId: string = "";
  baseUrl: string = `http://localhost:3001/`;
  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.serviceId = params['search'];
      console.log(params['search']);
    })

    let url = this.baseUrl + `public/services`;

    //remove - arranjar forma de passar o /{id} 
    // let url2 = 'http://localhost:3001/public/services/48';
    // this.http.delete(url2).subscribe((res2) => ((this.data2 = res2), console.log(res2)));

    this.http.get(url)
      .subscribe((res: any) => {
        this.data = res;
        console.log(this.data)
        this.http
          .get(this.baseUrl + `public/equipments`)
          .subscribe((res: any) => {
            this.dataEquipment = res;
            console.log(res)
            this.http
              .get(this.baseUrl + `public/clients`)
              .subscribe((res: any) => {
                this.dataClient = res;
                console.log(res)
              })
          })
      })

  }

}
