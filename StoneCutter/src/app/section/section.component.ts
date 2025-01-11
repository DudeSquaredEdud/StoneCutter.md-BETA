import { Component, HostListener, AfterContentInit } from '@angular/core';
import { tsnt } from '../tsnt';

@Component({
  selector: 'app-section',
  imports: [],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent implements AfterContentInit {
  
  elements(){
    /**
     * Javascript is Easy and fun
     */
    return {
      title: tsnt.gebi("section-title"),
      text:  tsnt.gebi("section-text"),
      id: 0,
    }
  }
  
  selectAllTextInTitle(){
    let title = this.elements().title;
    (title as HTMLInputElement).setSelectionRange(-1,0);
  }
  
  ngAfterContentInit(): void {
    this.elements().title.addEventListener("click", this.selectAllTextInTitle);
  }
  
  changetext(text: string){
    tsnt.gebi("section").textContent = text;
  }


}
