import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PostList, Post } from '@bw/models';
import { Meta } from '@angular/platform-browser';

@Injectable()
export class BlogService {
  constructor(private http: HttpClient) { }

  getPosts(page?: number): Observable<PostList> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page.toString());
    }

    return this.http.get<PostList>(`${environment.apiUrl}/blog`, { params });
  }

  getPost(categoryCode, postUrl): Observable<Post> {
    return this.http.get<Post>(`${environment.apiUrl}/blog/${categoryCode}/${postUrl}`);
  }

  addMetaFromPost(meta: Meta, post: Post) {
    meta.addTag({ name: 'description', content: post.description });
    this.addOgMeta(meta, post);
    this.addTwitterMeta(meta, post);
    this.addImageMeta(meta, post);
    this.addArticleMeta(meta, post);
  }

  private addOgMeta(meta: Meta, post: Post) {
    meta.addTag({ name: 'og:type', content: 'article' });
    meta.addTag({ name: 'og:locale', content: 'en_FR' });
    meta.addTag({ name: 'og:description', content: post.description });
    meta.addTag({ name: 'og:title', content: post.title });
    meta.addTag({ name: 'og:title', content: post.title });
    meta.addTag({
      name: 'og:url',
      content: `https://blog.williamklein.info/posts/${post.category.code.toLowerCase()}/${post.url.toLowerCase()}`
    });
    meta.addTag({ name: 'og:site_name', content: 'Blog de William Klein' });
  }

  private addTwitterMeta(meta: Meta, post: Post) {
    meta.addTag({ name: 'twitter:card', content: 'summary' });
    meta.addTag({ name: 'twitter:description', content: post.description });
    meta.addTag({ name: 'twitter:title', content: post.title });
    meta.addTag({ name: 'twitter:site', content: '@wi_klein' });
    meta.addTag({ name: 'twitter:creator', content: '@wi_klein' });
  }

  private addArticleMeta(meta: Meta, post: Post) {
    meta.addTag({ name: 'article:publisher', content: 'https://www.facebook.com/wilovent' });
    post.tags.forEach(tag => meta.addTag({ name: 'article:tag', content: tag }));
    meta.addTag({ name: 'article:section', content: post.category.name });
    meta.addTag({ name: 'article:published_time', content: new Date(post.publicationDate).toISOString() });
  }

  private addImageMeta(meta: Meta, post: Post) {
    const url = this.getPostImage(post);
    meta.addTag({ name: 'og:image', content: url });
    meta.addTag({ name: 'og:image:secure_url', content: url });
    meta.addTag({ name: 'twitter:image', content: url });
  }

  private getPostImage(post: Post) {
    const result = /<img.*?src="(.*?)"/.exec(post.content);
    return result ? result[1] : post.category.imageUrl;
  }
}
