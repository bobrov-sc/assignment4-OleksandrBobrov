import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataJson, PetJson} from "./json-structure";
import {Pet} from "./pet";
import {delay, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PetDataService {

  constructor(private http: HttpClient) { }

  private static imageFolder: string = 'http://localhost:8080/images/pets/';
  private static dataUri: string = 'http://localhost:8080/api/pets';

  private static toPetObj(petJson: PetJson) {

    const pet: Pet = new Pet();

    pet.id = petJson.id;
    pet.name = petJson.name;
    pet.petKind = petJson.petKind;
    pet.age = petJson.age;
    pet.image = PetDataService.imageFolder + petJson.image;
    pet.ownerId = petJson.ownerId;

    return pet;
  }

  public getAllPets(): Observable<Pet[]> {
    return this.http.get<DataJson>(PetDataService.dataUri)
      .pipe(
        delay(1000),
        map(data=>data._embedded.pets
          .map(pet=>PetDataService.toPetObj(pet)))
      )
  }

  public getPetById(id:number) :Observable<Pet> {
    return this.http.get<PetJson>(`${PetDataService.dataUri}/${id}`)
      .pipe(
        delay(1000),
        map(
          pet=>PetDataService.toPetObj(pet)
        )
      )
  }
}
