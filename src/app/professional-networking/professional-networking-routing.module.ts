import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfessionalNetworkingComponent } from './professional-networking.component';
import { SomeoneElseProfileComponent } from './someone-else-profile/someone-else-profile.component';
import { MyProfileDropdownComponent } from './my-profile-dropdown/my-profile-dropdown.component';
import { TimelineLikeReactComponent } from './timeline-like-react/timeline-like-react.component';
import { NotificationDropdownComponent } from './notification-dropdown/notification-dropdown.component';
import { TimelineCommentComponent } from './timeline-comment/timeline-comment.component';
import { TimelineReactEmojiComponent } from './timeline-react-emoji/timeline-react-emoji.component';
import { MyProfileEditableComponent } from './my-profile-editable/my-profile-editable.component';
import { PrivacySettingsComponent } from './privacy-settings/privacy-settings.component';
import { CompanyManagementComponent } from './company-management/company-management.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { CompanyAdminViewComponent } from './company-admin-view/company-admin-view.component';
import { CompanyUserViewComponent } from './company-user-view/company-user-view.component';

const routes: Routes = [
  {
    path: '', component: ProfessionalNetworkingComponent,
    children: [
      { path: 'profiles', component: SomeoneElseProfileComponent },
      { path: 'my-profile', component: MyProfileDropdownComponent },
      { path: 'timeline-like-react', component: TimelineLikeReactComponent },
      { path: 'notification-dropdown', component: NotificationDropdownComponent },
      { path: 'timeline-comment', component: TimelineCommentComponent },
      { path: 'timelime-react', component: TimelineReactEmojiComponent },
      { path: 'myprofile-editable', component: MyProfileEditableComponent },
      { path: 'privacy-settings', component: PrivacySettingsComponent },
      { path: 'company-management', component: CompanyManagementComponent },
      { path: 'create-company', component: CreateCompanyComponent },
      { path: 'company-admin-view', component: CompanyAdminViewComponent },
      { path: 'company-user-view', component: CompanyUserViewComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessionalNetworkingRoutingModule { }
