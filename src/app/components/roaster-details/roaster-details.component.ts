import { Component, Input } from '@angular/core';

import { Roaster } from '../../models/roaster';

@Component({
  selector: 'app-roaster-details',
  templateUrl: './roaster-details.component.html',
  styleUrls: ['./roaster-details.component.scss']
})
export class RoasterDetailsComponent {

  @Input() roaster: Roaster;

  constructor() { }

}
