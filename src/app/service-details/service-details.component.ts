import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/modules/service.model';
import { ServiceService } from 'src/services/service.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {


  // s1: Service;

  // service1: ServiceService;
  // constructor( private activeRoute: ActivatedRoute, service: ServiceService ) {
    // this.service1 = service;
  // }

  ngOnInit(): void { 
    // this.activeRoute.params.subscribe((p) => {
    //   debugger;
    //   this.service1.convertSingleService(p.id).then((data : any) => {
        
    //   this.s1 = data.serviceData;
    //   });
    // });
  }
}
