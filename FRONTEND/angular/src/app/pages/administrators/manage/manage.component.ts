import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Administrator } from 'src/app/models/administrator.model';
import { User } from 'src/app/models/user.model';
import { AdministratorService } from 'src/app/services/administrator.service';
import { SecurityService } from 'src/app/services/security.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode:number; //1->View, 2->Create, 3->Update 
  theAdministrator: Administrator;
  theUser: User;
  theFormGroup: FormGroup;
  trySend:boolean;

  constructor(private activateRoute: ActivatedRoute,
              private service: AdministratorService,
              private serviceUser: UserService,
              private securityService: SecurityService,
              private router: Router,
              private theFormBuilder: FormBuilder) { 

                this.trySend = false;
                this.mode = 1;
                this.theAdministrator={
                  id: 0,
                  privileges: "",
                  responsabilities: "",
                  user_id: ""
                }

                this.theUser = {
                  name: "",
                  email: "",
                  password: "",
                  identificationCard: ""
                }

                this.configFormGroup();

              }



  configFormGroup(){
    this.theFormGroup = this.theFormBuilder.group({
      //Primer elemento del vector, valor por defecto
      //Lista seran las reglas
      identificationCard: ['',[Validators.required]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      privileges: ['', [Validators.required, Validators.minLength(5)]],
      responsabilities: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.minLength(5), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls;
  }

  /*
  getTheaterData(){
    this.theater.capacity = this.getTheFormGroup.capacity.value;
    this.theater.location = this.getTheFormGroup.location.value;
  }*/

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");

    if(currentUrl.includes('view')){
      this.mode = 1;
    }else if(currentUrl.includes('create')){
      this.mode = 2;
    }else if(currentUrl.includes('update')){
      this.mode = 3;
    }
    
    if(this.activateRoute.snapshot.params.id){
      this.theAdministrator.id = this.activateRoute.snapshot.params.id;
      this.getAdministrator(this.theAdministrator.id);
    }
  }

  getAdministrator(id:number){

    this.service.view(id).subscribe(data=>{
      this.theAdministrator = data;

      this.serviceUser.view(this.theAdministrator.user_id).subscribe(data=>{
        this.theUser = data;
      })
    })    
  }

  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
      return;
    }

    this.securityService.getUserByEmail(this.theUser.email).subscribe(response =>{
      if(response){
        Swal.fire("Duplicación de Email", "Debe usar otro email", "error");
      }
      else{
        this.serviceUser.create(this.theUser).subscribe(data=>{
          if(data){
            this.theAdministrator.user_id = data._id;
            console.log(data._id);
    
            this.theAdministrator.user_id = data._id;
            console.log(JSON.stringify(this.theAdministrator));
            
            this.service.create(this.theAdministrator).subscribe(data=>{
              Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
              this.router.navigate(["administrators/list"]);
            });
    
          }
        })
      }
    })
    
  }

  update(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
      return;
    }

    /*this.securityService.getUserByEmail(this.theUser.email).subscribe(response =>{
      if(response){
        Swal.fire("Duplicación de Email", "Debe usar otro email", "error");
      }
      else{
        
      }
    });*/

    this.serviceUser.update(this.theUser).subscribe(data=>{
      this.service.update(this.theAdministrator).subscribe(data=>{
      
        console.log(JSON.stringify(this.theAdministrator));
        
        Swal.fire("Actualización Exitosa", "Se ha actualizado un nuevo registro", "success");
        
        this.router.navigate(["administrators/list"]);
      })
    });
  }

}
