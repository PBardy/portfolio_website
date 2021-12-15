import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../definitions';
import { LoadingState } from '../../models/loading-state';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  private articleState = new LoadingState<Blog.Article>();

  constructor(
    private route: ActivatedRoute,
    private articles: ArticlesService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.params.slug;
    this.articles.getArticleBySlug(slug).subscribe(
      (res) => {
        if (res.success) {
          this.articleState.error = false;
          this.articleState.data = res.data;
        }
      },
      (err) => {
        this.articleState.error = true;
      }
    );
  }

  public get article(): Blog.Article {
    return this.articleState.data;
  }
}
