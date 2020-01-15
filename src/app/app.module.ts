import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ChangeDetectorRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FilterPipe } from './pipes/filter.pipe';
import { UsuariosPipe } from './pipes/usuarios.pipe';
import { NgbModule, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgFallimgModule } from 'ng-fallimg';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    UsuariosPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgFallimgModule.forRoot({
      default:'/assets/picture1.png',
      profile: '/assets/default-profile-image.png',
      post: '/assets/default-post-image.png'
    })


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
