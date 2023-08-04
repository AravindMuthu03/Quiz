import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  apiUrl="http://localhost:3500/quiz";
  MarkUrl="http://localhost:3500/mark";
  idUrl="http://localhost:3500/question";
  qUrl="http://localhost:3500/updatedquiz";
  loginUrl="http://localhost:3500/logins";
  courseUrl="http://localhost:3500/course";
  diffUrl="http://localhost:3500/diffs";
  coUrl="http://localhost:3500/co";
  usermarkUrl="http://localhost:3500/usermark/";
  updatemarkUrl="http://localhost:3500/updatemark/";
  corUrl="http://localhost:3500/cor";
  loUrl="http://localhost:3500/lo";
  

  gotpoints:any;
  gotcorrect:any;
  gotincorrect:any;
  
  
  constructor(private http:HttpClient) { }

  //get all data
  getAlldata():Observable<any>{
    return this.http.get(`${this.apiUrl}`);
  }
  getallusermark(body:any):Observable<any>{  
    return this.http.get(`${this.usermarkUrl}`+ `${body}`);
  }

  getallCourse():Observable<any>{
    return this.http.get(`${this.courseUrl}`);
  }
  getalldiff():Observable<any>{
    return this.http.get(`${this.diffUrl}`);
  }


  UpdateMark(body:object):Observable<any>{
    return this.http.put(`${this.updatemarkUrl}`,body);
  }

  CreateData(data:any):Observable<any>{
    console.log(data,'data created ');
    return this.http.post(`${this.MarkUrl}`,data);
  }
  CreateUser(data:any):Observable<any>{
    console.log(data,'data created ');
    return this.http.post(`${this.loginUrl}`,data);
  }
 
 
  
  // getSingleData(id:any):Observable<any>{
  //   let ids=id;
  //   return this.http.get(`${this.MarkUrl}/${ids}`);
  // }

  // getSingleUser(id:any):Observable<any>{
  //   let ids=id;
  //   return this.http.get(`${this.loginUrl}/${ids}`);
  // }
  updatepoints(point:number,correct:number,incorrect:number){
    this.gotpoints = point;
    this.gotcorrect=correct;
    this.gotincorrect=incorrect;
  }
  getAllData():Observable<any>{
    return this.http.get(`${this.MarkUrl}`);
  }
  getallUser():Observable<any>{
    return this.http.get(`${this.loginUrl}`);
  }

  getallCo():Observable<any>{
    return this.http.get(`${this.coUrl}`);
  }   



  getsinglelo(name:string):Observable<any>{
    return this.http.get(`${this.loUrl}` + '/' + `${name}`);
  }


  getSingledata(id:number,did:number):Observable<any>{
    return this.http.get(`${this.idUrl}` + '/' + `${id}`+ '/' + `${did}`);
  }


  getSingleq(id:number,did:number):Observable<any>{
    return this.http.get(`${this.qUrl}` + '/' + `${id}`+ '/' + `${did}`);
  }
  getsinglecat(id:number):Observable<any>{
    return this.http.get(`${this.diffUrl}` + '/' + `${id}`);
  }

  // getSingleid(id:number):Observable<any>{
  //   return this.http.get(`${this.idUrl}` + '/' + `${id}`);
  // }

  getsinglediff(id:number):Observable<any>{
    return this.http.get(`${this.diffUrl}` + '/' + `${id}`);
  }
  getallcor(user_id:any):Observable<any>{
    return this.http.get(`${this.corUrl}` + '/' + `${user_id}`);
  }
  



  
}


