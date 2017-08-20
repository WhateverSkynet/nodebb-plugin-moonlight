
import {BlizzardSettingsState} from './blizzard-settings';
import { BlogSettingsState } from './blog-settings';
import { DiscordSettingsState } from './discord-settings';


export interface AdminState {
  blizzard: BlizzardSettingsState;
  blog: BlogSettingsState;
  discord: DiscordSettingsState;
}
