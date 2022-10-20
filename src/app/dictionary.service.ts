import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  definition!: any;

  constructor(private http: HttpClient) { }

  private rootURL = process.env['PORT'] || 'http://localhost:4000';
  

  async searchWord(word: JSON){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })

    return await this.http.post(this.rootURL + "/searchWord", word, {headers: headers}).pipe().toPromise();
  }

  async getWord(){
    return await this.definition;
  }
}
