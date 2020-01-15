import { Component, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, Inject, OnChanges } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { faUser, faUserEdit, faTrashAlt, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { filter, map, retry } from 'rxjs/operators';
import { text } from '@fortawesome/fontawesome-svg-core';


@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  form: FormGroup;
  _usuarios = [];
  _usuario = {};
  searchText = '';
  modal:NgbModalRef;
  enviado:boolean;
  usuarios=[];
  formValues: any;
  reset = false;
  baseUrl="http://localhost:5000/api/";
  faUser = faUser;
  faUserEdit = faUserEdit;
  faTrashAlt = faTrashAlt;
  closeResult: string;
  modalOptions:NgbModalOptions;


//----------------Agregar usuario----------------

  async adduser(mimodal, usuario) {
    
    if(this.form.valid){
      this.enviado = true;
      var x;
      
      if(usuario.id){
        x = await this.http.put<Usuario>(this.baseUrl + "Values/"+ usuario.id, usuario).toPromise();
        console.log(x)
        //this._usuario=usuario;
        this.getUsuarios();
      }
      else{
        x = await this.http.post<Usuario>(this.baseUrl + "Values", usuario).toPromise()
        console.log(x)
        
      }

      usuario = x;
      this.usuarios.push(JSON.parse(JSON.stringify(this._usuario)));
      this._usuario = {};
      this.reset = false;
      this.filtrar();
      mimodal.close();     
    }

      mimodal.error = "error no se pudo guardar";     
  }


//------------------Editar usuario--------------- 

  edituser(modal, usuario){
        
      this.open(this._usuario);
      this._usuario = usuario;   
    }


//-----------------Eliminar usuario---------------
deletuser(usuarios,modal,index){
  var service;
  if(usuarios[index].id){
    service = this.http.delete<Usuario>(this.baseUrl + "Values/"+ usuarios[index].id); 
    service.subscribe(x =>
      {
        var usuario = x;
        usuarios.splice(index,1);
        modal.close(); 
      }); 
  }else{
    modal.error = "no se puede eliminar";
  }    
}

//---------------Filtrar usuario-----------------
  filtrar(){
    this.usuarios = this._usuarios.filter(user => user.nombre.includes(this.searchText));
  }

  constructor(
    private modalService: NgbModal, private fb: FormBuilder, private http: HttpClient, 
  ){
      this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }

      this.form = this.fb.group({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required,Validators.minLength(10), Validators.maxLength(10)]),
      edad: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
    });

    this.getUsuarios();
  }

//-------------Aquí se muestran los usuarios------------ 
  getUsuarios() {
    return this.http.get<Usuario[]>(this.baseUrl + "Values")
    .subscribe(x => 
      { 
        this._usuarios = x;
        this.usuarios=JSON.parse(JSON.stringify(x));  
        //this.usuariosfiltrados=JSON.parse(JSON.stringify(x))
      });
  }

//------------------Abrir moodal-------------
  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
 
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}

