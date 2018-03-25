import { Component, OnInit, Input } from '@angular/core';
import { Post } from '@bw/models';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent implements OnInit {
  @Input() post: Post;

  constructor() {}

  ngOnInit() {}
}
