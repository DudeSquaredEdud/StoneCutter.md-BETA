import { Component, HostListener, AfterContentInit, Input } from '@angular/core';
import { tsnt } from '../tsnt';

@Component({
  selector: 'app-section',
  imports: [],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent implements AfterContentInit {

  @Input() id = 0;

  gdid = -1;

  godDamnId() {
    if (this.gdid == -1) {
      this.gdid = this.id;
    }
    return this.gdid;
  }
  
  elements() {
    // I hate typescript
    return {
      id: this.godDamnId(), // MUST be updated by parent
      title: document.querySelector(`#i${this.id} > div.section-header`)!,
      text: document.querySelector(`#i${this.id} > div.section-text`)!,
      
    };
  }
  
  selectAllTextInTitle(){
    let title = this.elements().title;
    (title as HTMLInputElement).setSelectionRange(-1,0);
  }
  
  ngAfterContentInit(): void {
    setTimeout(() => {
      this.elements().title.addEventListener("click", this.selectAllTextInTitle)
    }, 100);

  }
  
  changetext(text: string){
    tsnt.gebi(this.elements().id.toString()).textContent = text;
  }


}
