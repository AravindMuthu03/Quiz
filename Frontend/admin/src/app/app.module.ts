import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import{HttpClientModule} from '@angular/common/http';
import { ApiserviceService } from './apiservice.service';
import { MarkComponent } from './mark/mark.component';
import { AddComponent } from './add/add.component';
import { LogComponent } from './log/log.component';
import { QuestionComponent } from './question/question.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { ClasscateComponent } from './classcate/classcate.component';
import { AllocateComponent } from './allocate/allocate.component';
import { CreateclassComponent } from './createclass/createclass.component';
// import {MatSidenavModule} from '@angular/material/sidenav';




@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ReadComponent,
    MarkComponent,
    AddComponent,
    LogComponent,
    QuestionComponent,
    DashboardComponent,
    ClassroomComponent,
    ClasscateComponent,
    AllocateComponent,
    CreateclassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule,
    BrowserAnimationsModule,
    // MatSidenavModule,


  ],
  providers: [ApiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
