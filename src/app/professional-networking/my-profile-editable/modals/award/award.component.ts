import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthServices } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MyprofileEditableService } from '../../myprofile-editable.service';
import { CertificateService } from '../certificate/certificate.service';
import { AwardService } from './award.service';

@Component({
  selector: 'app-award',
  templateUrl: './award.component.html',
  styleUrls: ['./award.component.css']
})
export class AwardComponent implements OnInit {

  awardForm: FormGroup
  profile_id = JSON.parse(localStorage.getItem('currentUser'))['profile_id'];

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthServices,
    private notifService: NotificationService,
    private _myProfile: MyprofileEditableService,
    public _award: AwardService
  ) { }

  ngOnInit() {
    this.awardForm = this._fb.group({
      title: [''],
      issuer: [''],
      issue_time: [''],
      desc: [''],
    })
  }

  async onSubmit() {
    if (this.awardForm.invalid) return;

    try {
      const resp = await this._authService.add_award({
        ...this.awardForm.value,
        user: this.profile_id
      }).toPromise();

      this.notifService.showSuccess('Award added!', 'add alert');
      this._myProfile.updateUserDetails();
      this._award.closeModal();


    } catch (err) {
      this._myProfile.handleError(err)
    }
  }
}
