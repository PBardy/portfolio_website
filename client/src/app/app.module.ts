import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogModule } from './modules/blog/blog.module';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { SidenavComponent } from './pages/home/sidenav/sidenav.component';
import { HeroComponent } from './pages/home/hero/hero.component';
import { AboutComponent } from './pages/home/about/about.component';
import { SkillsComponent } from './pages/home/skills/skills.component';
import { PortfolioComponent } from './pages/home/portfolio/portfolio.component';
import { BlogComponent } from './pages/home/blog/blog.component';
import { ContactComponent } from './pages/home/contact/contact.component';
import { FooterComponent } from './pages/home/footer/footer.component';
import { SkillComponent } from './pages/home/skills/skill/skill.component';
import { ProjectComponent } from './pages/home/portfolio/project/project.component';
import { ImagePreviewDialogComponent } from './pages/home/dialogs/image-preview-dialog/image-preview-dialog.component';
import { BlogPostComponent } from './pages/home/blog/blog-post/blog-post.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, HomeComponent, SidenavComponent, HeroComponent, AboutComponent, SkillsComponent, PortfolioComponent, BlogComponent, ContactComponent, FooterComponent, SkillComponent, ProjectComponent, ImagePreviewDialogComponent, BlogPostComponent],
  imports: [
    BlogModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
