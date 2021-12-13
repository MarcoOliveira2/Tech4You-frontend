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

  searchQuery :string ='';
  Search: Service[] = [];
  query!: string;

  constructor(
    public servicesService: ServiceService,
    private activeRoute: ActivatedRoute,
    private router: Router) {
    this.router.events.subscribe((data: any) => {
      let query = this.activeRoute.snapshot.params['search'];
      if(query != this.searchQuery){
        this.searchQuery = query;
        this.servicesService.getServiceByID(query);
      }
    });
  }

  ngOnInit(): void {
  }

}
