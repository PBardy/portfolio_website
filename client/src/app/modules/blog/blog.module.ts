import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { SearchDialogComponent } from './components/dialogs/search-dialog/search-dialog.component';
import { EditArticleDialogComponent } from './components/dialogs/edit-article-dialog/edit-article-dialog.component';
import { CardOptionsMenuComponent } from './components/menus/card-options-menu/card-options-menu.component';
import { ArticleCardComponent } from './components/cards/article-card/article-card.component';
import { DeleteArticleDialogComponent } from './components/dialogs/delete-article-dialog/delete-article-dialog.component';
import { ArticlesTableComponent } from './components/tables/articles-table/articles-table.component';
import { SignInDialogComponent } from './components/dialogs/sign-in-dialog/sign-in-dialog.component';
import { SignUpDialogComponent } from './components/dialogs/sign-up-dialog/sign-up-dialog.component';
import { ArticleComponent } from './pages/article/article.component';
import { AuthorComponent } from './pages/author/author.component';
import { AuthorsComponent } from './pages/authors/authors.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { SettingsDialogComponent } from './components/dialogs/settings-dialog/settings-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SearchDialogComponent,
    EditArticleDialogComponent,
    CardOptionsMenuComponent,
    ArticleCardComponent,
    DeleteArticleDialogComponent,
    ArticlesTableComponent,
    SignInDialogComponent,
    SignUpDialogComponent,
    ArticleComponent,
    AuthorComponent,
    AuthorsComponent,
    AnalyticsComponent,
    SettingsDialogComponent,
  ],
  imports: [CommonModule, BlogRoutingModule, SharedModule, HttpClientModule],
  bootstrap: [DashboardComponent],
})
export class BlogModule {}
