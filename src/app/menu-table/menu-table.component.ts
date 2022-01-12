import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { TokenStorageService } from 'src/services/tokenStorage.service';

@Component({
  selector: 'app-menu-table',
  templateUrl: './menu-table.component.html',
  styleUrls: ['./menu-table.component.css']
})
export class MenuTableComponent implements OnInit {

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal,private tokenStorage: TokenStorageService) { }
  data: any = '';
  dataEquipment: any = '';
  dataClient: any = '';
  data2: any = '';
  alertMessage: string = "";
  serviceId: string = "";
  baseUrl: string = `http://localhost:3001/`;
  clickData: any = '';

  closeResult = '';

  search: number = 1;

  serviceIdd: any = '';

  token = this.tokenStorage.getUser();
  

  headers = { 'Authorization': `Bearer ${this.token.token}` };
  requestOption = { headers: new HttpHeaders(this.headers) }


  ngOnInit() {

    this.getRouteData();
  }

  getRouteData() {
    this.activatedRoute.params.subscribe(params => {
      this.serviceId = params['search'];
      console.log(params['search']);
    })

    let url = this.baseUrl + `v1/services`;
    this.http.get(url, this.requestOption).subscribe((res: any) => {
      this.data = res;
      console.log(this.data)
      this.http
        .get(this.baseUrl + `v1/equipments`, this.requestOption)
        .subscribe((res: any) => {
          this.dataEquipment = res;
          console.log(res)
          this.http
            .get(this.baseUrl + `v1/clients`, this.requestOption)
            .subscribe((res: any) => {
              this.dataClient = res;
              console.log(res)
            })
        })
    })
  }


  open(content: any, serviceIdd: string) {
    console.log(serviceIdd);

    let url = this.baseUrl + `v1/services/${serviceIdd}`;
    this.http.get(url, this.requestOption).subscribe((res: any) => {
      this.clickData = res;
      console.log(this.clickData)
      this.http
        .get(this.baseUrl + `v1/equipments/${this.clickData.equipment_id}`, this.requestOption)
        .subscribe((res: any) => {
          this.dataEquipment = res;
          console.log(res)
          this.http
            .get(this.baseUrl + `v1/clients/${this.dataEquipment.client_id}`, this.requestOption)
            .subscribe((res: any) => {
              this.dataClient = res;
              console.log(res)
            })
        })
    })


    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  delete(serviceIdd: string) {
    let url2 = this.baseUrl + `v1/services/${serviceIdd}`;
    this.http.delete(url2, this.requestOption).subscribe((res2) => ((this.data2 = res2), console.log(res2)));
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



