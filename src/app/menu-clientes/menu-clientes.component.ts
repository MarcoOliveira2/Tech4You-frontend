import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from 'src/services/tokenStorage.service';

@Component({
  selector: 'app-menu-clientes',
  templateUrl: './menu-clientes.component.html',
  styleUrls: ['./menu-clientes.component.css']
})
export class MenuClientesComponent implements OnInit {

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal, private tokenStorage: TokenStorageService) { }
  baseUrl: string = `http://localhost:3001/`;

  data: any = '';
  clickData: any = '';
  deleteData: any = '';

  alertMessage: string = "";
  serviceId: string = "";
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

    let url = this.baseUrl + `v1/clients`;
    this.http.get(url, this.requestOption).subscribe((res: any) => {
      this.data = res;
      console.log(this.data)
    })
  }


  open(content: any, serviceIdd: string) {
    console.log(serviceIdd);
    let url = this.baseUrl + `v1/clients/${serviceIdd}`;
    this.http.get(url, this.requestOption).subscribe((res: any) => {
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
    let urlIndividual = this.baseUrl + `v1/clients/${serviceIdd}`;
    this.http.delete(urlIndividual, this.requestOption).subscribe((res2) => ((this.deleteData = res2), console.log(res2)));
    this.getRouteData();
  }

  // //post
  // edit = (msgForm: NgForm) => {
  //   let apiURL = 'http://localhost:3001/public/services/9';
  //   console.log(msgForm.value)
  //   this.http
  //     .put(`${apiURL}`, msgForm.value)
  //     .subscribe((res) => this.getPosts(res, msgForm));
  // };

  // //
  // getPosts = (param: any, formData: NgForm) => {
  //   console.log(param.requestCode);
  //   if (param.requestCode === 1) {
  //     formData.reset();
  //   } else {
  //     this.alertMessage = param.msg;
  //   }
  // };


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  errorStatus: any = '';
  errorMessage1: any = "";
  errorMessage = '';
  isLoggedIn = false;
  isLoginFailed = false;

  sendMessage = (msgForm: NgForm, content3: any) => {
    let apiURL =  this.baseUrl + `v1/clients/`;
    console.log(this.requestOption);
    this.http
      .post( apiURL, msgForm.value, this.requestOption)
      .subscribe(
        (res: any) => {
          console.log(res.status);
          if (res.requestCode === 1) {
            msgForm.reset();
          } else {
            this.alertMessage = res.msg;
          }
          
        },
        err => {
        
          this.modalService.open(content3, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      
          });
          
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
          this.errorMessage1=  err.error.error;
          this.errorStatus = err.status;
          console.log(err);
          console.log(this.errorMessage1);
          console.log(this.errorStatus);
        }
        
      )
      
  };




  edit = (msgForm: NgForm, id: string, content3: any) => {
    let apiURL =  this.baseUrl + `v1/clients/${id}`;
    console.log(this.requestOption);
    this.http
      .put( apiURL,msgForm.value, this.requestOption)
      .subscribe(
        (res: any) => {
          if (res.requestCode === 1) {
            msgForm.reset();
          } else {
            this.alertMessage = res.msg;
          }
         
        },
        err => {
        
          this.modalService.open(content3, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      
          });
          
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
          this.errorMessage1=  err.error.error;
          this.errorStatus = err.status;
          console.log(err);
          console.log(err.error.message);
          console.log(this.errorStatus);
        }
      )
  };


  open2(content2: any) {

    this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
}
