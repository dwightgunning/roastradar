import { GooglePlace } from './google-place';

export class Roaster {
  city: string;
  country: string;
  lat: number;
  lng: number;
  name: string;
  website?: string;
  googlePlaceId?: string;
  googlePlace?: GooglePlace;
  createdAt: Date;
  modifiedAt: Date;
}
