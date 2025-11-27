import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';
import { InterestsComponent } from './components/interests/interests.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ParticlesComponent } from './components/particles/particles.component';

@NgModule({
  declarations: [
    AppComponent, 
    NavigationComponent, 
    HeroComponent, 
    AboutComponent, 
    SkillsComponent, 
    ExperienceComponent, 
    EducationComponent, 
    InterestsComponent, 
    ContactComponent, 
    FooterComponent,
    ParticlesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr'
    })
  ],
  providers: [
    ...provideTranslateHttpLoader({
      prefix: '/assets/i18n/',
      suffix: '.json'
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
