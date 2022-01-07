import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/modules/service.model';
import { ServiceService } from 'src/services/service.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }
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

    let url = this.baseUrl + `public/services/${this.serviceId}`;

    //remove - arranjar forma de passar o /{id} 
    // let url2 = 'http://localhost:3001/public/services/48';
    // this.http.delete(url2).subscribe((res2) => ((this.data2 = res2), console.log(res2)));

    this.http.get(url)
      .subscribe((res: any) => {
        this.data = res;
        console.log(this.data)
        this.http
          .get(this.baseUrl + `public/equipments/${this.data.equipment_id}`)
          .subscribe((res: any) => {
            this.dataEquipment = res;
            console.log(res)
            this.http
              .get(this.baseUrl + `public/clients/${this.dataEquipment.client_id}`)
              .subscribe((res: any) => {
                this.dataClient = res;
                console.log(res)
              })
          })
      })

  }


  getRes = () => { };


  //post
  sendMessage = (msgForm: NgForm) => {
    let apiURL = 'http://localhost:3001/public/services/';
    console.log(msgForm.value)
    this.http
      .post(`${apiURL}`, msgForm.value)
      .subscribe((res) => this.getPosts(res, msgForm));
  };

  //
  getPosts = (param: any, formData: NgForm) => {
    console.log(param.requestCode);
    if (param.requestCode === 1) {
      formData.reset();
    } else {
      this.alertMessage = param.msg;
    }
  };

}
