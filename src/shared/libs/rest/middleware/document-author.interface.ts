export interface DocumentAuthor {
  isOfferAuthor(offerId: string, userId: string): Promise<boolean>;
}
