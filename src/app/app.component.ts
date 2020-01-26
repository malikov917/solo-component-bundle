import { Component, ɵmarkDirty } from '@angular/core';
import { ComponentDeps, COMMON_DIRECTIVES } from './util';

@Component({
  selector: 'my-element',
  templateUrl: './app.component.html'
})
@ComponentDeps({
  directives: [ 
    ...COMMON_DIRECTIVES
  ]
})
export class AppComponent {
  isShown = true;

  title = "Konstantin's";

  toggle() {
    this.isShown = !this.isShown;
    console.log("Stop clicking!", this.isShown)
    ɵmarkDirty(this);
  }
}
