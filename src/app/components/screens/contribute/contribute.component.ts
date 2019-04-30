import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { WebFormService } from '../../../services/web-form/web-form.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.scss']
})
export class ContributeComponent {
  public submission: any = {};
  submissionResponse = '';

  constructor(private webFormService: WebFormService) { }

  submitForm() {
    const fields = {
      name: this.submission.name,
      email: this.submission.email,
      message: this.submission.message,
      _replyto: this.submission.email
    };

    this.webFormService.submitContributionForm(fields).subscribe(
      (data) => {
        this.submissionResponse = 'Success';
      },
      (error: HttpErrorResponse) => {
        this.submissionResponse = 'A problem occurred. Please try again.';
      }
    );
  }

}
