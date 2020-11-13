import { Component } from '@angular/core';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  x: any;
  y: any;
  z: any;
  timestamp: any;
  light: any;
  constructor(public gyroscope: Gyroscope,private flashlight: Flashlight) {
  }

  ionViewWillEnter() {
    this.light = false;
    let options: GyroscopeOptions = {
      frequency: 1000
    }
    this.gyroscope.getCurrent(options)
      .then((orientation: GyroscopeOrientation) => {
        //console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
      })
      .catch()


    this.gyroscope.watch(options)
      .subscribe((orientation: GyroscopeOrientation) => {
        this.x = orientation.x;
        this.y = orientation.y;
        this.z = orientation.z;
        this.timestamp = orientation.timestamp;
        if(orientation.x > 0.75 || orientation.x < -0.75){
          if(this.light == true){
            this.flashlight.switchOff();
            this.light = false;
          }
          else{
            this.flashlight.switchOn();
            this.light = true;
          }
        }
        //console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
      });
  }
  ionViewWillLeave(){
    this.flashlight.switchOff();
  }

}
