import { Directive, ElementRef, Renderer } from '@angular/core';
import { Content } from "ionic-angular";

@Directive({
  selector: '[hide-fab-top]',
  host: {
    '(ionScroll)': 'handleScroll($event)'
  }
})
export class HideFabTopDirective {

  private fab;
  private storedScroll: number = 0;

  constructor(public element: ElementRef, public renderer: Renderer) { }

  ngOnInit() {
    this.fab = this.element.nativeElement.getElementsByClassName("fab")[0];
    this.renderer.setElementStyle(this.fab, 'transition', 'transform 500ms,top 500ms');
    this.renderer.setElementStyle(this.fab, 'display', 'none');
  }

  handleScroll(event: Content) {
    if (event.scrollTop - this.storedScroll > 0 || event.scrollTop < 100) {
      this.renderer.setElementStyle(this.fab, 'top', '60px');
      this.renderer.setElementStyle(this.fab, 'transform', 'scale3d(.1,.1,.1)');
    } else if (event.scrollTop - this.storedScroll < 0) {
      this.renderer.setElementStyle(this.fab, 'display', 'block');
      this.renderer.setElementStyle(this.fab, 'top', '0');
      this.renderer.setElementStyle(this.fab, 'transform', 'scale3d(1,1,1)');
    }
    console.log(event.scrollTop);
    this.storedScroll = event.scrollTop;
  }
}
