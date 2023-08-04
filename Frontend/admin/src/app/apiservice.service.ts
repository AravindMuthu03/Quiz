import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  apiUrl="http://localhost:3500/quiz";
  createUrl="http://localhost:3500/quiz";
  MarkUrl="http://localhost:3500/mark";
  LogUrl="http://localhost:3500/logins";
  courseUrl="http://localhost:3500/course";
  idUrl="http://localhost:3500/read";
  quizUrl="http://localhost:3500/createquiz";
  readUrl="http://localhost:3500/updatedquiz";
  deleteUrl="http://localhost:3500/deletequiz";
  displayUrl="http://localhost:3500/updated";
  userlogUrl="http://localhost:3500/userlog";
  classUrl="http://localhost:3500/classroom";
  classuserUrl="http://localhost:3500/class";
  connectUrl="http://localhost:3500/con";

  
  

  
  constructor(private http:HttpClient) { }

  // get data


  getAlldata():Observable<any>{
    return this.http.get(`${this.apiUrl}`);
  }

  getAllData():Observable<any>{
    return this.http.get(`${this.MarkUrl}`);
  }
  getAlluser():Observable<any>{
    return this.http.get(`${this.LogUrl}`);
  }
  getallcate():Observable<any>{
    return this.http.get(`${this.courseUrl}`);
  }
  getallclass():Observable<any>{
    return this.http.get(`${this.classUrl}`);
  }

  //create user
  CreateUser(data:any):Observable<any>{
    console.log(data,'data created ');
    return this.http.post(`${this.LogUrl}`,data);
  }



  //create data
  CreateData(data:any):Observable<any>{
    console.log(data,'data created ');
    return this.http.post(`${this.createUrl}`,data);
  }


  CreateQuiz(data:any):Observable<any>{
    console.log(data,'data created ');
    return this.http.post(`${this.quizUrl}`,data);
  }
  Createclass(data:any):Observable<any>{
    console.log(data,'data created ');
    return this.http.post(`${this.classUrl}`,data);
  }

  //create category
  Createcate(data:any):Observable<any>{
    console.log(data,'data created ');
    return this.http.post(`${this.courseUrl}`,data);
  }

  Createcon(data:any):Observable<any>{
    console.log(data,'data created ');
    return this.http.post(`${this.connectUrl}`,data);
  }

  //delete data
deleteData(id:any):Observable<any>{
  let ids=id;
  return this.http.delete(`${this.createUrl}/${ids}`);
}
deletedata(id:any):Observable<any>{
  let ids=id;
  return this.http.delete(`${this.MarkUrl}/${ids}`);
}
deleteclass(id:any):Observable<any>{
  let ids=id;
  return this.http.delete(`${this.classUrl}/${ids}`);
}
deleteuser(id:any):Observable<any>{
  let ids=id;
  return this.http.delete(`${this.LogUrl}/${ids}`);
}
deletecate(id:any):Observable<any>{
  let ids=id;
  return this.http.delete(`${this.courseUrl}/${ids}`);
}
deleteques(data:object):Observable<any>{
  return this.http.delete(`${this.deleteUrl}`,{body:data});
}
deletecon(id:any):Observable<any>{
  let ids=id;
  return this.http.delete(`${this.connectUrl}/${ids}`);
}


//update data
updateData(data:any,id:any):Observable<any>{
  let ids=id;
  return this.http.put(`${this.createUrl}/${ids}`,data,id)
}

updatecat(data:any,id:any):Observable<any>{
  let ids=id;
  return this.http.put(`${this.courseUrl}/${ids}`,data,id)
}


//getsingledata
getSingleData(id:any):Observable<any>{
  let ids=id;
  return this.http.get(`${this.createUrl}/${ids}`);
}

getsdata(id:any):Observable<any>{
  let ids=id;
  return this.http.get(`${this.displayUrl}/${ids}`);
}
getSingledata(id:number):Observable<any>{
  return this.http.get(`${this.idUrl}` + '/' + `${id}`);
}
getSingleclasscate(id:number):Observable<any>{
  return this.http.get(`${this.classUrl}` + '/' + `${id}`);
}
getSingleclassuser(id:number):Observable<any>{
  return this.http.get(`${this.classuserUrl}` + '/' + `${id}`);
}

getSingleuser(id:any):Observable<any>{
  let ids=id;
  return this.http.get(`${this.LogUrl}/${ids}`);
}

getSinglecate(id:any):Observable<any>{
  let ids=id;
  return this.http.get(`${this.courseUrl}/${ids}`);
}

getSingleques(id:any):Observable<any>{
  return this.http.get(`${this.readUrl}` + '/' + `${id}`);
}
getsingleuserlog(id:any):Observable<any>{
  let ids=id;
  return this.http.get(`${this.userlogUrl}/${ids}`);
}

}
