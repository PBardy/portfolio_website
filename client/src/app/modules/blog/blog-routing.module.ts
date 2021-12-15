import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { ArticleComponent } from './pages/article/article.component';
import { AuthorComponent } from './pages/author/author.component';
import { AuthorsComponent } from './pages/authors/authors.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'blog',
    children: [
      { path: '', component: DashboardComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'authors/all', component: AuthorsComponent },
      { path: 'authors/author/:slug', component: AuthorComponent },
      { path: 'articles/article/:slug', component: ArticleComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
