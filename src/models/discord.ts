
export interface DiscordWebhook {
  id: string;
  token: string;
  events: {
    applicationSubmitted: boolean;
    newReplyFromApplicant: boolean;
  };
}
