// Typescriptn't
// Bless this mess, live (s)laugh(ter) loiter

import { state } from "@angular/animations";

export class tsnt{
    static gebi(identifier: string): HTMLElement{
        /**
         * Get element by ID but for sane people.
         */
        let element = document.getElementById(identifier);
        if (element) return element;
        else throw `Element ${identifier} doesn't exist!`;
      }

    static clog(statement: string){
        console.log(statement);
    }
}