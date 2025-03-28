export interface DocumentAuthor {
  isAuthorOffer(offerId: string, userId: string): Promise<boolean>;
}
