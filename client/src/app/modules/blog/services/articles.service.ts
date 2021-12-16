import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { Blog, Responses } from '../definitions';
import { GenericAPIResponse } from '../../../../../../shared/interfaces/responses.interface';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private updateEvent = new Subject<void>();
  public onUpdate = this.updateEvent.asObservable();

  constructor(private api: ApiService) {}

  public addArticle(article: Blog.ArticleStub) {
    const url = `articles/add`;
    return this.api.post<Responses.ActionState>(url, article).pipe(
      tap((res) => {
        if (res.error) return;
        this.updateEvent.next();
      })
    );
  }

  public editArticle(articleId: number, article: Blog.ArticleStub) {
    const url = `articles/${articleId}/edit`;
    return this.api.post<Responses.ActionState>(url, article).pipe(
      tap((res) => {
        if (res.error) return;
        this.updateEvent.next();
      })
    );
  }

  public recoverArticle(articleId: number) {
    const url = `articles/${articleId}/recover`;
    return this.api.post<Responses.ActionState>(url, {}).pipe(
      tap((res) => {
        if (res.error) return;
        this.updateEvent.next();
      })
    );
  }

  public deleteArticle(articleId: number) {
    const url = `articles/${articleId}/delete`;
    return this.api.delete<Responses.ActionState>(url).pipe(
      tap((res) => {
        //if (res.error) return;
        this.updateEvent.next();
      })
    );
  }

  public duplicateArticle(articleId: number) {
    const url = `articles/${articleId}/duplicate`;
    return this.api.post<Responses.ActionState>(url, {}).pipe(
      tap((res) => {
        if (res.error) return;
        this.updateEvent.next();
      })
    );
  }

  public getAllArticles() {
    return of(articles);
  }

  public getArticleById(id: number) {
    return of(articles.filter((article) => article.id === id));
  }

  public getArticleBySlug(slug: string) {
    const matches = articles.filter((a) => a.slug === slug);
    const response: GenericAPIResponse<Blog.Article> = {
      error: false,
      success: true,
      data: matches[0],
    };

    return of(response);
  }
}

const article: Blog.Article = {
  id: 1,
  slug: 'example-article-1',
  title: 'Example Article 1',
  description: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mattis, ligula in elementum 
    eleifend, enim eros pellentesque turpis, a facilisis ex lectus at lectus. 
  `,
  thumbnail:
    'https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/auth.png',
  caption: '',
  created_at: new Date(),
  updated_at: new Date(),
  author: {
    fname: 'Philip',
    lname: 'Bardy',
    email: 'philip@example.com',
    slug: 'philip-bardy',
  },
  markdown: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mattis, ligula in elementum 
    eleifend, enim eros pellentesque turpis, a facilisis ex lectus at lectus. Cras turpis nibh, egestas 
    tincidunt nisl congue, rutrum tristique nisl. Aliquam leo odio, finibus iaculis luctus id, fermentum 
    non est. Maecenas sagittis, erat eget ultrices congue, leo felis scelerisque purus, vel eleifend massa 
    nulla sed lacus. Mauris et purus rutrum, accumsan diam id, luctus libero. Vestibulum ac quam mauris. 
    Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla convallis 
    urna at libero pellentesque, sed imperdiet mauris malesuada. Aenean dapibus nunc lacus. In dignissim 
    venenatis neque vel posuere. Maecenas vel interdum lacus, in laoreet nunc. Nam nisi odio, efficitur ac 
    dui non, tempor rutrum ante. Nulla vestibulum tortor dui, blandit ultricies lectus tristique cursus. 
    Proin sed aliquam sem.

    Pellentesque ac lorem vitae lorem euismod tincidunt. Proin at fermentum leo, in suscipit est. Nam in 
    fermentum arcu, at finibus dui. Ut a sapien id neque finibus sodales non id leo. Pellentesque id 
    suscipit justo. Nulla suscipit rhoncus nibh nec vehicula. Vivamus sit amet gravida lectus, at blandit 
    sapien. Nullam vitae felis eu leo congue congue at at ante. Duis ut vehicula ipsum, ac dictum velit. 
    Mauris volutpat, lorem et pellentesque hendrerit, urna elit volutpat tellus, id tempus enim mauris id 
    lacus. Donec ultrices risus libero, ornare porta nibh pretium at. Sed sodales placerat erat eu euismod. 
    Nunc at nibh consectetur, egestas eros eu, feugiat turpis. Ut orci augue, dapibus sit amet auctor id, 
    bibendum aliquam urna. In hac habitasse platea dictumst. Maecenas dolor sapien, molestie eleifend 
    feugiat eget, malesuada vel nunc.
  `,
  sanitizedHtml: `
    <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mattis, ligula in elementum 
    eleifend, enim eros pellentesque turpis, a facilisis ex lectus at lectus. Cras turpis nibh, egestas 
    tincidunt nisl congue, rutrum tristique nisl. Aliquam leo odio, finibus iaculis luctus id, fermentum 
    non est. Maecenas sagittis, erat eget ultrices congue, leo felis scelerisque purus, vel eleifend massa 
    nulla sed lacus. Mauris et purus rutrum, accumsan diam id, luctus libero. Vestibulum ac quam mauris. 
    Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla convallis 
    urna at libero pellentesque, sed imperdiet mauris malesuada. Aenean dapibus nunc lacus. In dignissim 
    venenatis neque vel posuere. Maecenas vel interdum lacus, in laoreet nunc. Nam nisi odio, efficitur ac 
    dui non, tempor rutrum ante. Nulla vestibulum tortor dui, blandit ultricies lectus tristique cursus. 
    Proin sed aliquam sem.
    </p>

    <p>
    Pellentesque ac lorem vitae lorem euismod tincidunt. Proin at fermentum leo, in suscipit est. Nam in 
    fermentum arcu, at finibus dui. Ut a sapien id neque finibus sodales non id leo. Pellentesque id 
    suscipit justo. Nulla suscipit rhoncus nibh nec vehicula. Vivamus sit amet gravida lectus, at blandit 
    sapien. Nullam vitae felis eu leo congue congue at at ante. Duis ut vehicula ipsum, ac dictum velit. 
    Mauris volutpat, lorem et pellentesque hendrerit, urna elit volutpat tellus, id tempus enim mauris id 
    lacus. Donec ultrices risus libero, ornare porta nibh pretium at. Sed sodales placerat erat eu euismod. 
    Nunc at nibh consectetur, egestas eros eu, feugiat turpis. Ut orci augue, dapibus sit amet auctor id, 
    bibendum aliquam urna. In hac habitasse platea dictumst. Maecenas dolor sapien, molestie eleifend 
    feugiat eget, malesuada vel nunc.
    </p>
  `,
};

const articles: Blog.Article[] = new Array(20).fill(article);
