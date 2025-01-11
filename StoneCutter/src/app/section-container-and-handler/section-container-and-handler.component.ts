import { Component, viewChildren } from '@angular/core';
import { tsnt } from '../tsnt';
import { SectionComponent } from '../section/section.component';

@Component({
  selector: 'app-section-container-and-handler',
  imports: [SectionComponent],
  templateUrl: './section-container-and-handler.component.html',
  styleUrl: './section-container-and-handler.component.css'
})
export class SectionContainerAndHandlerComponent {



  // dynamic ID setting
  __currentID = 0;
  setID(section: SectionComponent){
    section.elements().id = this.__currentID;
    this.__currentID++;
  }

  sectionComponents = viewChildren(SectionComponent);
  
  sections = {
    count: 1,
    components: this.sectionComponents(),
    range: function() {
      let r = [];
      for (let i=0; i < this.count; i++){
        r.push(i);
      }
      return r;
    },
  }


  constructor(){
    
  };

  
}
