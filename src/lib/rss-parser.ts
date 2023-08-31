import Parser from 'rss-parser';

type CustomItem = {
  title: string;
  description?: string;
  link?: string;
  pubDate?: string;
  creator?: string;
  content?: string;
  guid?: string;
};

const parser: Parser<{}, CustomItem> = new Parser();

export default parser;
