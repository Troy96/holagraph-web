import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessionalNetworkingRoutingModule } from './professional-networking-routing.module';

import { ProfessionalNetworkingComponent } from './professional-networking.component';
import { AcceptDeclineRequestComponent } from './accept-decline-request/accept-decline-request.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { MyProfileDropdownComponent } from './my-profile-dropdown/my-profile-dropdown.component';
import { NotificationDropdownComponent } from './notification-dropdown/notification-dropdown.component';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { SomeoneElseProfileComponent } from './someone-else-profile/someone-else-profile.component';
import { TimelineLikeReactComponent } from './timeline-like-react/timeline-like-react.component';
import { SharedModule } from '../shared/shared.module';
import { TimelineCommentComponent } from './timeline-comment/timeline-comment.component';
import { TimelineReactEmojiComponent } from './timeline-react-emoji/timeline-react-emoji.component';
import { MyProfileEditableComponent } from './my-profile-editable/my-profile-editable.component'

@NgModule({
  declarations: [
    ProfessionalNetworkingComponent,
    AcceptDeclineRequestComponent,
    ForgotPasswordPageComponent,
    MyProfileDropdownComponent,
    NotificationDropdownComponent,
    ResetPasswordPageComponent,
    SomeoneElseProfileComponent,
    TimelineLikeReactComponent,
    TimelineCommentComponent,
    TimelineReactEmojiComponent,
    MyProfileEditableComponent
  ],
  imports: [
    CommonModule,
    ProfessionalNetworkingRoutingModule,
    SharedModule
  ]
})
export class ProfessionalNetworkingModule { }
