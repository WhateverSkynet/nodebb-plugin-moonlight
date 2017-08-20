
import { DiscordWebhook } from '../../../models/discord';


export interface DiscordSettingsState {
  siteUrl: string;
  webhooks: DiscordWebhook[];

}
