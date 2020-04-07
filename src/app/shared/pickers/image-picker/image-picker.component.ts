import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild, Input } from '@angular/core';
import { Plugins, Capacitor, CameraSource, Camera, CameraResultType } from '@capacitor/core';
import { Platform } from '@ionic/angular';

function detectWebcam(callback) {
  const md = navigator.mediaDevices;
  if (!md || !md.enumerateDevices) { return callback(false); }
  md.enumerateDevices().then(devices => {
    callback(devices.some(device => 'videoinput' === device.kind));
  });
}

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @ViewChild('filePicker', { static: false }) filePickerRef: ElementRef<HTMLInputElement>;
  @Output() imagePick = new EventEmitter<string | File>();
  @Input() showPreview = false;

  selectedImage: any;
  usePicker = false;

  constructor(
    private platform: Platform
  ) { }

  ngOnInit() {
    if ((this.platform.is('mobile') && !this.platform.is('hybrid')) || this.platform.is('desktop')) {
      this.usePicker = true;
    }
  }

  // detectWebcam(function(hasWebcam) {
  //   console.log('Webcam: ' + (hasWebcam ? 'yes' : 'no'));
  // })

  onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera') || this.usePicker) {
      console.log('Camera plugin not available');
      this.filePickerRef.nativeElement.click();
      return;
    } else {
      Plugins.Camera.getPhoto({
        quality: 50,
        source: CameraSource.Prompt,
        correctOrientation: true,
        width: 600,
        resultType: CameraResultType.DataUrl
      }).then(img => {
        this.selectedImage = img.dataUrl;
        this.imagePick.emit(this.selectedImage);
      }).catch(err => {
        console.log(err);
        if (this.usePicker) {
          this.filePickerRef.nativeElement.click();
        }
        return false;
      });
    }
  }

  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) {
      return;
    }
    const fr = new FileReader();
    fr.readAsDataURL(pickedFile);
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
      this.imagePick.emit(pickedFile);
    };
  }
}
