import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HeroeModel} from '../models/heroe.model';
import {catchError, delay, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url: string = 'https://login-app-crud.firebaseio.com';

  constructor(private http: HttpClient) {
  }

  createHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe)
      .pipe(
        map((resp: any) => {
          heroe.id = resp.name;
          return heroe;
        })
      );
  }

  updateHeroe(heroe: HeroeModel) {

    // estructura nueva sin ID para  que no vaya en el put body pero si en el url con heroe.id
    const heroeTemp = {
      ...heroe
    };
    delete heroeTemp.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map(
          resp => this.crearArreglo(resp), delay(2500)
        )
      );
  }


  private crearArreglo(heroesObj: object) {
    const heroes: HeroeModel[] = [];
    // console.log(heroesObj);
    if (heroesObj === null) {
      return [];
    }

    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;  //id firebase
      heroes.push(heroe);
    });

    return heroes;
  }


  getHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  deleteHeroe(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

}
