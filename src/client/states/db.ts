import { ApplicationTemplate } from '../../models/application';
import { BlogPostEntity } from '../../models/blog';

export interface ApplicationDbState {
  byId: { [appId: number]: ApplicationTemplate };
  allIds: number[];
}

export interface BlogDbState {
  byId: { [id: number]: BlogPostEntity };
  allIds: number[];
}

export interface DbState {
  applications: ApplicationDbState;
  blogPosts: BlogDbState;
}
