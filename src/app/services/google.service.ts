import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  private clientId = environment.clientId

  constructor() { }

  library(option:{ callback?:any}) {

    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: this.clientId,
        callback: option.callback,
        auto_select: false,
        cancel_on_tap_outside: true
      });

      // @ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById('buttonDiv'),
        { theme: "outline", size: 'medium', width: '100%', shape: 'pill' }
      );

      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => { });

    }
  }

}
