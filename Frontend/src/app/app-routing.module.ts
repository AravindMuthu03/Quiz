import { Component, createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { MarkComponent } from './mark/mark.component';
import { AddComponent } from './add/add.component';
import { LogComponent } from './log/log.component';
import { QuestionComponent } from './question/question.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { ClasscateComponent } from './classcate/classcate.component';
import { AllocateComponent } from './allocate/allocate.component';
import { CreateclassComponent } from './createclass/createclass.component';



const routes: Routes = [
  {path:'mark',component:MarkComponent},
  {path:'question',component:QuestionComponent},
  {path:'create',component:CreateComponent},
  {path:'create/:id',component:CreateComponent},
  { path: 'read/:id', component: ReadComponent },
  {path:'dashboard',component:DashboardComponent},
  {path:'classroom',component:ClassroomComponent},
  {path:'classroom/:id',component:ClasscateComponent},
  {path:'allocate/:id',component:AllocateComponent},
  {path:'read',component:ReadComponent},
  {path:'add',component:AddComponent},
  {path:'log',component:LogComponent},
  {path:'createclass',component:CreateclassComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
