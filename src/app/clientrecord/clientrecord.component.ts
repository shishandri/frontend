import { Component, OnInit,ViewChild } from '@angular/core';
import { ClientserviceService } from '../shared/clientservice.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
 import { NgForm } from "@angular/forms";
 import { MatPaginator } from '@angular/material/paginator';
 import { MatTableDataSource } from '@angular/material/table';
 import { Router } from "@angular/router";
import { Client } from '../shared/client.model';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
@Component({
  selector: 'app-clientrecord',
  templateUrl: './clientrecord.component.html',
  styleUrls: ['./clientrecord.component.css']
})
export class ClientrecordComponent implements OnInit
 {  StudentData: any = [];
  // dataSource: MatTableDataSource<Client>;
 // @ViewChild(MatPaginator) paginator: MatPaginator; 
//   displayedColumns: string[] = [ 'ClientName', 'ClientEmail', 'ClientSkype', 'ServerDetail'];
//     cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
//   map(({ matches }) => {
//     if (matches) {
//       return [
//         { title: 'Client Detail', cols: 1, rows: 1 },
//         // { title: 'Card 2', cols: 1, rows: 1 },
     
//       ];
//     }

//     return [
//       { title: 'Client Detail', cols: 2, rows: 1 },
//       // { title: 'Card 2', cols: 1, rows: 1 },
//     ];
//   })
// );


  constructor(private Clientservice: ClientserviceService,private router:Router,private formBuilder: FormBuilder,private breakpointObserver: BreakpointObserver) { }
 registerForm: any;
  employeeIdUpdate = null;

  submitted = false;
  massage = null;  
  abc:any;
 // dataSource:any;
dataSaved = false;
emp:any;
form:any;
  client =
  {
    ClientName :'',
    ClientEmail:'',
    ClientSkype:'',
    ServerDetail:''

  };
 
    ngOnInit() {
    //  debugger;
       this.registerForm = this.formBuilder.group(
        {
          ClientName: ["", Validators.required],
          ClientEmail: ["", [Validators.required, Validators.email]],
          ClientSkype: ["", Validators.required],
          ServerDetail: ["", Validators.required]
        },
       
      );
      this.refreshclientlist();
    }
    get f() {
      return this.registerForm.controls;
    }
    Deleteclient(emp:any){
      
     debugger;
      this.Clientservice.deleteclient(emp).subscribe((res)=>
      {
         debugger;
         this.abc=res;
      })
      this.refreshclientlist();
    }

    Editclient(emp:any) 
    {  
     debugger;  
      this.router.navigate(['/addclient'+`/${emp._id}`]);
   }
     
     AddClient()
     {
      this.router.navigate(['/addclient']);
   //  this.router.navigate(['/addclient']);
     }
     onLogout(){
     
      this.router.navigate(['/login']);
    }
     refreshclientlist()
     {   
       debugger;
       this.Clientservice.getEmployeeList().subscribe((res)=>
       {
         debugger;
      //   this.StudentData = res;
        this.abc=res;
      //    this.dataSource = new MatTableDataSource<Client>(this.StudentData);
      //    setTimeout(() => {
      //   //   this.dataSource.paginator = this.paginator;
      // }, 0);
     //  this.dataSource =res;
       })
     }    
}
