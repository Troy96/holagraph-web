import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LayoutComponent } from './layout/layout/layout.component';
import { AuthGuard } from './guards/Auth.guard';
import { InviteByEmailComponent } from './shared/invite-by-email/invite-by-email.component';
import { ImportContactComponent } from './shared/import-contact/import-contact.component';
import { InviteContactComponent } from './shared/invite-contact/invite-contact.component';
import { InviteLocalComponent } from './shared/invite-local/invite-local.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: LayoutComponent, loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'in', loadChildren: () => import('./professional-networking/professional-networking.module').then(m => m.ProfessionalNetworkingModule), canActivate: [AuthGuard] },
  { path: 'jobs', loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule), canActivate: [AuthGuard] },
  { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule), canActivate: [AuthGuard] },
  { path: 'online-learning', loadChildren: () => import('./online-learning/online-learning.module').then(m => m.OnlineLearningModule), canActivate: [AuthGuard] },
  { path: 'offline-learning', loadChildren: () => import('./offline-learning/offline-learning.module').then(m => m.OfflineLearningModule), canActivate: [AuthGuard] },
  { path: 'finance-center', loadChildren: () => import('./finance-center/finance-center.module').then(m => m.FinanceCenterModule), canActivate: [AuthGuard] },
  { path: 'import-contact',component:ImportContactComponent},
  { path: 'email-invite',component:InviteByEmailComponent},
  { path: 'invite-contact',component:InviteContactComponent},
  { path: 'invite-local',component:InviteLocalComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
