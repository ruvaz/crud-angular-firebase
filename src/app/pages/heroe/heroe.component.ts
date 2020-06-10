import {Component, OnInit} from '@angular/core';
import {HeroeModel} from '../../models/heroe.model';
import {NgForm} from '@angular/forms';
import {HeroesService} from '../../services/heroes.service';

import {Observable} from 'rxjs';
import Swal from 'sweetalert2';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(private heroesService: HeroesService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // para el get de un heroe
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.heroesService.getHeroe(id)
        .subscribe(
          (resp: HeroeModel) => {
            this.heroe = resp;
            this.heroe.id = id;
            console.log(resp);
          }
        );
    }
  }

  guardar(form: NgForm) {
    // console.log(form);
    // console.log(this.heroe);
    if (form.invalid) {
      console.log('Formulario no valido');
    }


    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let perticion: Observable<any>;

    if (this.heroe.id) {
      perticion = this.heroesService.updateHeroe(this.heroe);
    } else {
      perticion = this.heroesService.createHeroe(this.heroe);
    }

    perticion.subscribe(resp => {
      // console.log(resp);
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        type: 'success'
      });
    });
  } // fin guardar


}
