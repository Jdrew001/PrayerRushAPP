import { Directive, Renderer, ElementRef } from '@angular/core';

@Directive({
  selector: '[auto-hide]',
  host: {
    '(ionScroll)': 'onContentScrolled($event)'
  } // Attribute selector
})
export class AutoHideDirective {

  fabButton;
  oldScrollTop: number = 0

  constructor(private renderer: Renderer, private element : ElementRef) {
    console.log('Hello AutoHideDirective Directive');
  }

  ngOnInit() {
    this.fabButton = this.element.nativeElement.getElementsByClassName("fab")[0];
    this.renderer.setElementStyle(this.fabButton, 'webkitTransition', 'transform 500ms, opacity 500ms');
  }

  onContentScrolled(e) {
    console.log(e.scrollTop);
    if(e.scrollTop - this.oldScrollTop > 5) {
      this.renderer.setElementStyle(this.fabButton, 'opacity', '0');
      this.renderer.setElementStyle(this.fabButton, 'webkitTransform', 'scale3d(.1,.1,.1)');
    } else if(e.scrollTop - this.oldScrollTop < 0) {
      this.renderer.setElementStyle(this.fabButton, 'opacity', '1');
      this.renderer.setElementStyle(this.fabButton, 'webkitTransform', 'scale3d(1,1,1)');
    }

    this.oldScrollTop = e.scrollTop;
  }

}
