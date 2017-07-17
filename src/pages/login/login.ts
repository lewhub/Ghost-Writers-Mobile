import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { SignupPage } from '../signup/signup';
import { UserService } from '../../app/services/service';
import { TabsPage } from '../tabs/tabs';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FilesPage } from '../imgfiles/imgFiles'
import { CreatePage } from '../create/createpage'

declare var swal:any;

@Component({
  selector: 'page-login',
  providers: [UserService],
  templateUrl: 'login.html'
})
export class LoginPage {

  username: any;
  password: any;
  userPost: any;
  errorMessage: string;
  users: any;
  postData: any;
  public base64Image: string;

  constructor(public navCtrl: NavController, private userService: UserService, private camera: Camera) {
    this.base64Image = 'https://placehold.it/150x150'
  }

  user = {
    username: null,
    password: null,
  }
  ngOnInit() { this.getAllUsers() }

  getInput = () => {
    console.log(this.user)
  }

  redirectToSignup = () => {
    this.navCtrl.push(SignupPage);
  }

  redirectToProfile = () => {
    this.navCtrl.push(ProfilePage, {
      id: "123",
      name: "Carl"
    })
  }

  getAllUsers() {
    this.userService.getUsers()
      .subscribe(
      users => this.users = users,
      error => this.errorMessage = <any>error
      );
  }

  loginButton() {
    this.userService.loginUser(this.user)
      .subscribe(
      user => this.userPost = user,
      error => console.log('error boi'),
      () => {
        console.log(this.userPost.user)
        if (this.userPost.user !== null) {
          this.navCtrl.push(TabsPage)
          swal({
            title: 'Welcome',
            text: 'Create custom underground ghost art in as little as three steps. Make a custom marker by taking a picture of any painting or unique wall. Upload your art onto the marker. View art with ghost vision.',
            imageUrl: 'http://weburbanist.com/wp-content/uploads/2016/10/graffiti-revealed-mural-644x369.jpg',
            imageWidth: 400,
            imageHeight: 200,
            animation: false
          })
        }
      }
      )
  }

  takePicture() {
    this.camera.getPicture({
      quality: 75,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      saveToPhotoAlbum: false
    }).then(imageData => {
      console.log('IMAGE INFORMATION', imageData)
      this.base64Image = "data:image/jpeg;base64," + imageData;
      localStorage['Photo_' + localStorage.length] = imageData;
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  redirectToFilesPage() {
    this.navCtrl.push(FilesPage);
  }

  redirectToCreatePage() {
    this.navCtrl.setRoot(CreatePage);
  }

}
