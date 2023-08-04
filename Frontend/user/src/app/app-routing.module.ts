import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuestionComponent } from './question/question.component';
import { ResultComponent } from './result/result.component';
import { CatComponent } from './cat/cat.component';
import { StartComponent } from './start/start.component';
import { SsComponent } from './ss/ss.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'',redirectTo:'start',pathMatch:"full"},
  {path:"start",component:StartComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  // {path:"cat",component:CatComponent},
  {path:"cat/:id",component:CatComponent},
  // {path: "question/:id/:did", component:QuestionComponent},
  // {path: "question/:id", component:SsComponent},
  {path: "updatedquiz/:id/:did", component:QuestionComponent},
  {path: "ss/:id", component:SsComponent},

  // {path: "question/:id", component:QuestionComponent},
  {path:"result",component:ResultComponent},
  {path:"ss",component:SsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
