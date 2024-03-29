import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServices} from 'src/app/services/auth.service';
import { NetworkingService } from 'src/app/services/networking.service';
import { Observable, observable } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { ContactUsElseService } from './contact-us-else/contact-us-else/contact-us-else.service';

@Component({
  selector: 'app-someone-else-profile',
  templateUrl: './someone-else-profile.component.html',
  styleUrls: ['./someone-else-profile.component.css']
})
export class SomeoneElseProfileComponent implements OnInit {

  userId: any;
  user: any;
  userDetails: any;
  userList = [];
  contactList: any[];
  connectionStatus: any;
  isLoading: boolean = true;

  profileConnectionStatus: string;
  coverImgStyle: SafeStyle;

  privacySettingsMap: any;


  constructor(
    private router: ActivatedRoute,
    private authService: AuthServices,
    private netService: NetworkingService,
    private notifyService: NotificationService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    public contactUs: ContactUsElseService
  ) {
    this.activatedRoute.params.subscribe(param => {
      this.userId = param.id;
      this.getUserDetails();
      this.getUserContacts();
      this.getPrivacySettings();

    })
  }

  ngOnInit() {

  }

  getUserDetails() {
    this.authService.get_user_details(this.userId)
      .subscribe(respObj => {
        this.userDetails = respObj;
        console.log(this.userDetails)
        this.user = respObj.user;
        this.setinitCover();
        this.getProfileConnectionStatus();
        // this.userDetails = this.userList.find(obj => obj['user'] == this.userId);
      })
  }

  getProfileConnectionStatus() {
    this.netService.get_connection_status(this.user)
      .subscribe(respObj => {
        this.profileConnectionStatus = respObj.status;
      })
  }

  getUserContacts() {
    this.netService.get_contacts()
      .subscribe(respObj => {
        this.contactList = [...respObj];
        this.getConnectionStatus();
      })
  }

  onConnectRequest() {
    this.onFollowRequest()
  }

  isCurrentUserProfile() {
    return this.userId === this.currentUser['user_id'];
  }

  onFollowRequest() {
    this.netService.follow_request(this.user)
      .subscribe(respObj => {
        this.getProfileConnectionStatus();
        this.notifyService.showSuccess('Your request has been sent to the user', 'Connection Alert');
      });
  }

  onCancelRequest() {
    this.netService.cancel_request(this.user)
      .subscribe(respObj => {
        this.getProfileConnectionStatus();
        this.notifyService.showInfo('Connection request rejected!', 'Connection Alert');
      })
  }


  onAcceptRequest() {
    this.netService.accept_request(this.user)
      .subscribe(respObj => {
        this.getProfileConnectionStatus();
        this.notifyService.showInfo('Connection request accepted!', 'Connection Alert');
      })
  }

  onDeleteRequest() {
    this.netService.delete_request(this.user)
      .subscribe(respObj => {
        this.getProfileConnectionStatus();
        this.notifyService.showInfo('Connection request deleted!', 'Connection Alert');
      })
  }

  isUserConnection() {
    const user = this.userList.find(user => user['id'] === this.userId);
    if (user) return true;
    return false;
  }

  openContactInfo(){
    this.contactUs.openContactInfo(this.userDetails);
  }

  getConnectionStatus() {
    this.contactList.forEach(user => {
      if ((user['user_from']['id'] === this.currentUser['user_id']) && (user['user_to']['id'] === this.userId)) {
        console.log('pending');
        return this.connectionStatus = 'pending';
      }
      else if ((user['user_from']['id'] === this.userId) && (user['user_to']['id'] === this.currentUser['user_id'])) {
        console.log('approval needed');
        return this.connectionStatus = 'approval needed';
      }
    })
    if (!!this.isUserConnection()) {
      this.connectionStatus = 'connected';
    }
    else if ((!this.isUserConnection()) && ((this.connectionStatus != 'pending') && (this.connectionStatus != 'approval needed'))) {
      this.connectionStatus = 'none';
    }
  }

  get currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  setinitCover() {
    if (!this.userDetails.cover_photo) {
      this.coverImgStyle = this.getSanitizedPhoto(`background-image: url("./assets/icons/1x/Asset 2.png")`);
    }
    else {
      this.coverImgStyle = this.getSanitizedPhoto(`background-image: url(${this.userDetails.cover_photo}`);
    }
  }

  getSanitizedPhoto(photoUrl: string) {
    return this.sanitizer.bypassSecurityTrustStyle(photoUrl);
  }

  getPrivacySettings() {
    this.authService.getuser_privacy_details(this.userId)
      .subscribe(respObj => {
        console.log(respObj)
        this.privacySettingsMap = { ...respObj };
        console.log(this.privacySettingsMap)
      })
  }


}
