import {Component, ViewEncapsulation} from '@angular/core';
import {Pet} from "../pet";
import {LoadingStatus} from "../loading-status";
import {delay, Subscription} from "rxjs";
import {PetDataService} from "../pet-data.service";
import {RouterLink} from "@angular/router";
import {TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    RouterLink,
    TitleCasePipe
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  pets: Pet[] | undefined;

  loadingStatus: LoadingStatus = LoadingStatus.LOADING;

  private petSub : Subscription | undefined;

  constructor(petDataService : PetDataService) {

    this.petSub = petDataService.getAllPets().subscribe({
        next:pets=>{
          delay(30000);
          this.pets = pets;
          this.loadingStatus = LoadingStatus.SUCCESS;
        },

        error:()=> this.loadingStatus = LoadingStatus.ERROR

      }

    );
  }

  ngOnDestroy(): void {
    this.petSub?.unsubscribe();
  }

  protected readonly LoadingStatus = LoadingStatus;
}
