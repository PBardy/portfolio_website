import { Component, Input, OnInit } from '@angular/core';
import { Blog } from 'src/app/modules/blog/definitions';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
})
export class BlogPostComponent implements OnInit {
  @Input() public data: Blog.Article;

  constructor() {}

  ngOnInit(): void {}

  public authorURL(): string {
    return `/authors/author/${this.data.author.slug}`;
  }

  public authorName(): string {
    return `${this.data.author.fname} ${this.data.author.lname}`;
  }
}
