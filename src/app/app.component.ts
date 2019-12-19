import { Component, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


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
  usuariosfiltrados=[];
  formValues: any;
  reset = false;

public get id() { return this.form.get('id'); }
public get nombre() { return this.form.get('nombre'); }
public get apellido() { return this.form.get('apellido'); }
public get tel() { return this.form.get('tel'); }
public get edad() { return this.form.get('edad'); }

  adduser(mimodal){
    this.enviado = true;
    if(this.form.valid){
      this._usuarios.push(JSON.parse(JSON.stringify(this._usuario)));
      this._usuario = {};
      this.reset = false;
      this.filtrar();
      mimodal.close();
    }
    else{
      this.reset = true;
    }
  }

  filtrar(){
    this.usuariosfiltrados = this._usuarios.filter(x => x.Nombre.includes(this.searchText));
  }
  faUser = faUser;

  closeResult: string;
  modalOptions:NgbModalOptions;
  
 
  constructor(
    private modalService: NgbModal, private fb: FormBuilder
  ){
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }

    this.form = this.fb.group({
      id: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required,Validators.minLength(10), Validators.maxLength(10)]),
      edad: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
    });
  }
  
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

