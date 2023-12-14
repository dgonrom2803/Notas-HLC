import { Component } from '@angular/core';
import {Nota} from '../nota';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  notaEditando = {} as Nota;
  arrayColeccionNotas: any = [{
    id: "",
    nota: {} as Nota
}];
idNotaSelec: string = "";

  constructor(private firestoreService: FirestoreService) {
    this.obtenerListaNotas();
  }

  clickBotonInsertar(){
    this.firestoreService.insertar("notas", this.notaEditando).then(() => {
    console.log('Nota creada correctamente!');
    this.notaEditando= {} as Nota;
    }, (error) => {
      console.error(error);
    });
  }

  obtenerListaNotas(){
    this.firestoreService.consultar("notas").subscribe((datosRecibidos) => {
      this.arrayColeccionNotas = [];
      datosRecibidos.forEach((datosNota) => {
        this.arrayColeccionNotas.push({
          id: datosNota.payload.doc.id,
          nota: datosNota.payload.doc.data()

        })
      });
    });
  }

  selecNota(idNota:string, notaSelec: Nota){
    this.notaEditando = notaSelec;
    this.idNotaSelec = idNota;
  }

  clickBotonBorrar(){
    this.firestoreService.borrar("notas", this.idNotaSelec).then(() => {
    console.log('Nota borrada correctamente!');
    this.notaEditando= {} as Nota;
    this.idNotaSelec = "";
    }, (error) => {
      console.error(error);
    });
  }
  clickBotonModificar(){
    this.firestoreService.modificar("notas",this.idNotaSelec, this.notaEditando).then(() => {
      console.log('Nota modificada correctamente!');
    }, (error) => {
      console.error(error);
    });
  }
 

  }
