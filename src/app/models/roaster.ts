export class Roaster {
  city: string;
  location: {
    lat: number;
    lng: number;
  };
  name: string;
  website?: string;
  googlePlaceId?: string;
  createdAt: Date;
  modifiedAt: Date;
}
