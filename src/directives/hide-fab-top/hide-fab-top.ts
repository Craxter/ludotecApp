import { Directive, ElementRef, Renderer } from '@angular/core';
import { Content } from "ionic-angular";

@Directive({
  selector: '[hide-fab-top]',
  host: {
    '(ionScroll)': 'ocultar($event)'
  }
})
export class HideFabTopDirective {

  private fab;
  private storedScroll: number = 0;

  constructor(public element: ElementRef, public renderer: Renderer) {
    console.log('arranca');
  }

  ngOnInit() {
    this.fab = this.element.nativeElement.getElementsByClassName("fab")[0];
    this.renderer.setElementStyle(this.fab, 'display', 'none');
    this.renderer.setElementStyle(this.fab, 'transition', 'transform 500ms,top 500ms');
  }

  ocultar(event: Content) {
    if (event.scrollTop > this.storedScroll || event.scrollTop < 100) { //scroll hacia abajo o se ve la cabecera
      this.renderer.setElementStyle(this.fab, 'top', '60px');
      this.renderer.setElementStyle(this.fab, 'transform', 'scale3d(.1,.1,.1)');
    } else if (event.scrollTop < this.storedScroll) { //scroll hacia arriba
      this.renderer.setElementStyle(this.fab, 'display', 'block');
      this.renderer.setElementStyle(this.fab, 'top', '0');
      this.renderer.setElementStyle(this.fab, 'transform', 'scale3d(1,1,1)');
    }
    this.storedScroll = event.scrollTop;
  }
}
