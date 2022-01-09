import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu-clientes',
  templateUrl: './menu-clientes.component.html',
  styleUrls: ['./menu-clientes.component.css']
})
export class MenuClientesComponent implements OnInit {

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) { }
  baseUrl: string = `http://localhost:3001/`;

  data: any = '';
  clickData: any = '';
  deleteData: any = '';

  serviceId: string = "";
  closeResult = '';
  search: number = 1;
  serviceIdd: any = '';


  ngOnInit() {
    this.getRouteData();
  }

  getRouteData() {
    this.activatedRoute.params.subscribe(params => {
      this.serviceId = params['search'];
      console.log(params['search']);
    })

    let url = this.baseUrl + `public/clients`;
    this.http.get(url).subscribe((res: any) => {
      this.data = res;
      console.log(this.data)
    })
  }


  open(content: any, serviceIdd: string) {
    console.log(serviceIdd);
    let url = this.baseUrl + `public/clients/${serviceIdd}`;
    this.http.get(url).subscribe((res: any) => {
      this.clickData = res;
      console.log(this.clickData)
    })

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  delete(serviceIdd: string) {
    let urlIndividual = this.baseUrl + `public/clients/${serviceIdd}`;
    this.http.delete(urlIndividual).subscribe((res2) => ((this.deleteData = res2), console.log(res2)));
    this.getRouteData();
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
