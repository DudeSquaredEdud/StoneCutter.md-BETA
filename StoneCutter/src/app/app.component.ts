import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

class StoneCutterFile {
  fileData: {
    uniqueName: Function,
    header: {title: string, wordCount: number, __date: number, dateString: Function}, 
    sections: {subheader: string, __text: string, textClean: Function}[]
    } = {
      uniqueName: function()
        {
          return this.header.title + this.header.__date.toString;
        },
      header: {
        title: "",
        wordCount: 0,
        __date: 0,
        dateString: function(){
          return this.__date.toString();
        }
      },
    sections:[
      {
        subheader: "",
        __text: "",
        textClean: function(){
          return this.__text.replace(RegExp("(\^\^\^[^\^]*\^\^\^)", "g"), (match) => {return ""});
        }
      }
    ]
  };

  update(data: (typeof this.fileData)){
    this.fileData = data;
  }

  constructor(private router: Router, title: String){
    // Initialize values
    this.fileData.header.title = title.toString();
    this.fileData.header.__date = Date.now();
    this.fileData.header.wordCount = 0;
  };

  SaveToFile(){
    // Save the file
    let uniqueName = this.fileData.header.title + this.fileData.header.__date.toString;
    localStorage.setItem(uniqueName, JSON.stringify(this.fileData));
  };


  parseFootnotes(): string[]{
    // An array of strings
    let footnotes: string[] = [];
    
    // Get all footnotes from the text
    this.fileData.sections.forEach(element => {
      [...element.__text.matchAll(RegExp("(\^\^\^[^\^]*\^\^\^)", "g"))].forEach(note => {
        footnotes.push(note.toString());
      });
    });

    return footnotes;
  };
};

class FileManager{
  static fileListing = {
    // Get the filelisting
    getList: function(): string[]{
      return JSON.parse(localStorage.getItem("fileListing") ?? "[]").array;
    },
    // Add a new file to the filelisting (or update it if it's already present)
    add: function(file: StoneCutterFile){
      let newListing = new Set(this.getList());
      newListing.add(file.fileData.uniqueName());
      localStorage.setItem("fileListing", newListing.toString())
      localStorage.setItem(file.fileData.uniqueName(), file.fileData.toString()) ;
    },
    // Retrieve a file
    getFile: function(name: string){
      return <StoneCutterFile["fileData"]>JSON.parse(localStorage.getItem(name)!);
    },
    getFiles: function() {
      let files: StoneCutterFile["fileData"][] = [];
      this.getList().forEach(fileName => {
        // verbose for extensibility reasons
        let file = this.getFile(fileName);
        files.push(file);
      });
      return files;
    }
  };

}

export class AppComponent {
  title = 'StoneCutter';



};
