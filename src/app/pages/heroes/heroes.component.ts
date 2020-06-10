import {Component, OnInit} from '@angular/core';
import {HeroesService} from '../../services/heroes.service';
import {map} from 'rxjs/operators';
import {HeroeModel} from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[] = [];
  cargando = true;

  constructor(private heroesService: HeroesService) {
  }

  ngOnInit(): void {

    this.cargando = true;
    this.heroesService.getHeroes()
      .subscribe(resp => {
          this.heroes = resp;
          // console.log(resp);
          console.log(this.heroes);
          this.cargando = false;
        }
      );
  }

  borrarHeroe(heroe: HeroeModel, index: number) {
    Swal.fire({
      title: 'Estas seguro?',
      text: `Esta seguro que desa borrar a ${heroe.nombre}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(
      resp => {
        if (resp.value) {
          this.heroesService.deleteHeroe(heroe.id).subscribe();
          this.heroes.splice(index);
        }
      }
    );


  }
}
