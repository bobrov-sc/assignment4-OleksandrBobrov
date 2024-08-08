export interface PictureJson {
  small: string;
  large: string;
}

export interface PetJson {
  id:number;
  name: string;
  petKind: string;
  age: number;
  image:string;
  ownerId:number;
}

export interface CatalogJson {
  pets: PetJson[];
}

export interface DataJson {
  _embedded: CatalogJson;
}
