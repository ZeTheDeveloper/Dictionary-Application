import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Words } from '../words';
import {  NgForm  } from '@angular/forms';
import { DictionaryService } from '../dictionary.service';

// 

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchForm!: FormGroup;
  input! : string;
  word = new Words(this.input);
  wordRegex!: any;
  definition!: any;
  searched = false;
  found = false;

  constructor(private fb: FormBuilder, private dictionaryService: DictionaryService) { }

  ngOnInit(): void {
    this.myForm()
    this.wordRegex = "^[A-Za-z]+$";
  }

  myForm(){
    this.searchForm = this.fb.group({
      wordInput: ['', Validators.required]
    })
  }

  onSubmit(){
    let wordObj = { "input": this.word.input.toLowerCase() }
    let wordJSON = JSON.parse(JSON.stringify(wordObj));
    
    this.dictionaryService.searchWord(wordJSON).then(data => {
      console.log(data);
      this.definition = data;
      console.log(this.definition)

      this.searched = true;
      // console.log(this.definition.output.length);

      if(this.definition.output){
        this.found = true;
      }else{
        this.found = false;
      }
    });
  }

}


