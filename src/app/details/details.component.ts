import {Component, ViewEncapsulation} from '@angular/core';
import {Pet} from "../pet";
import {LoadingStatus} from "../loading-status";
import {delay, Subscription} from "rxjs";
import {PetDataService} from "../pet-data.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {TitleCasePipe} from "@angular/common";


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    TitleCasePipe,
    RouterLink
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  pet: Pet | undefined;

  loadingStatus: LoadingStatus = LoadingStatus.LOADING;

  private petSub : Subscription | undefined;

  constructor(petDataService : PetDataService, activatedRoute: ActivatedRoute) {

    const id: number | null = activatedRoute.snapshot.params['id'];
    if (id != null) {
      this.petSub = petDataService.getPetById(id).subscribe({
        next: pet=>{

            this.pet = pet;
            this.loadingStatus = LoadingStatus.SUCCESS;
          },

          error:()=> this.loadingStatus = LoadingStatus.ERROR

        }

      );
    }

  }

  ngOnDestroy(): void {
    this.petSub?.unsubscribe();
  }

  protected readonly LoadingStatus = LoadingStatus;
}
