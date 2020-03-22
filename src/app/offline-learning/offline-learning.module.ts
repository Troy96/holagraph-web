import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfflineLearningRoutingModule } from './offline-learning-routing.module';
import { OfflineLearningComponent } from './offline-learning.component';
import { SkillCoursesResultsComponent } from './skill-courses-results/skill-courses-results.component';
import { RegisterSkilledCoursesComponent } from './register-skilled-courses/register-skilled-courses.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    OfflineLearningComponent,
    RegisterSkilledCoursesComponent,
    SkillCoursesResultsComponent,
  ],
  imports: [
    CommonModule,
    OfflineLearningRoutingModule,
    SharedModule
  ]
})
export class OfflineLearningModule { }
