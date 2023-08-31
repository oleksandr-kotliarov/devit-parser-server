export class ArticleDto {
  title: string;
  description?: string;
  link?: string;
  pubDate?: string;
  creator?: string;
  content?: string;
  guid?: string;

  constructor (input: any) {
    this.title  = input.title;
    this.title  = input.title;
  }
}