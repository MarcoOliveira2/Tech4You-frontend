import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from 'src/services/tokenStorage.service';

@Component({
  selector: 'app-menu-equipamentos',
  templateUrl: './menu-equipamentos.component.html',
  styleUrls: ['./menu-equipamentos.component.css']
})
export class MenuEquipamentosComponent implements OnInit {

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal, private tokenStorage: TokenStorageService) { }
  baseUrl: string = `http://localhost:3001/`;

  data: any = '';
  clickData: any = '';
  deleteData: any = '';

  serviceId: string = "";
  closeResult = '';
  search: number = 1;
  id: any = ''
  alertMessage: string = "";
  token = this.tokenStorage.getUser();
  

  headers = { 'Authorization': `Bearer ${this.token.token}` };
  requestOption = { headers: new HttpHeaders(this.headers) }
  ngOnInit() {
   
    console.log(this.requestOption);
    this.getRouteData();
   
  }

  getRouteData() {
    this.activatedRoute.params.subscribe(params => {
      this.serviceId = params['search'];
    })

    let url = this.baseUrl + `v1/equipments`;
    this.http.get(url,this.requestOption).subscribe((res: any) => {
      this.data = res;
    })
  }


  open(content: any, id: string) {
    let url = this.baseUrl + `v1/equipments/${id}`;
    this.http.get(url,this.requestOption).subscribe((res: any) => {
      this.clickData = res;
    })

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  delete(id: string) {
    let urlIndividual = this.baseUrl + `v1/equipments/${id}`;
    this.http.delete(urlIndividual,this.requestOption).subscribe((res2) => ((this.deleteData = res2)));
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

  sendMessage = (msgForm: NgForm,id: string) => {
    console.log(this.id)
    let apiURL =  this.baseUrl + `v1/equipments/${id}`;
    console.log(this.requestOption);
    this.http
      .put( apiURL,msgForm.value, this.requestOption)
      .subscribe((res) => this.getPosts(res, msgForm));
  };

  //
  getPosts = (param: any, formData: NgForm) => {
    if (param.requestCode === 1) {
      formData.reset();
    } else {
      this.alertMessage = param.msg;
    }
  };
}
