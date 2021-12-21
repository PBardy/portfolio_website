import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/modules/blog/definitions';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  public articles = articles;

  constructor() {}

  ngOnInit(): void {}
}

const article: Blog.Article = {
  id: 1,
  slug: '',
  tags: ['Test'],
  title: 'Example article title - 1',
  updated_at: new Date(),
  created_at: new Date(),
  description: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mattis, ligula in elementum nisl vel.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mattis, ligula in elementum nisl vel.
  `,
  markdown: ``,
  sanitizedHtml: ``,
  author: {
    email: 'philipbardydev@outlook.com',
    slug: 'philip-bardy-1',
    fname: 'Philip',
    lname: 'Bardy',
  },
};

const articles: Blog.Article[] = new Array(5).fill(article);
