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
  id = {
    currentSelected: 0,
    
    setID: function(section: SectionComponent){
      section.elements().id = this.currentSelected;
      this.currentSelected++;
    },

    setAllID: function(components: SectionComponent[]){
      this.currentSelected = 0;
      components.forEach(sec => {
        this.setID(sec);
      })
    },
  }

  

  sectionComponents = viewChildren(SectionComponent);

  // next up:
  // sections: give them their own delete button
  // drag-to-rearrange sections
  // footnote support
  // 
  
  sections = {
    count: 1,
    components: this.sectionComponents,
    range: function() {
      let r = [];
      for (let i=0; i < this.count; i++){
        r.push(i);
      }
      return r;
    },
    newSection: function(event: MouseEvent){
        this.count++
    },
    delete: function(id: number){
      // Takes in the ID of a section and deletes it.
    },
  }

  
}
