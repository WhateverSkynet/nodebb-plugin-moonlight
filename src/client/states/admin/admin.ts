import {BlizzardSettingsState} from './blizzard-settings';
import { BlogPostEntity } from '../../../models/blog';
import { BlogSettingsState } from './blog-settings';


export interface AdminState {
  blizzard: BlizzardSettingsState;
  blog: BlogSettingsState;

}
