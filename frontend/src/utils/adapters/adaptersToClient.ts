import CommentDTO from '../../dto/comment/comment.dto';
import FullOfferDTO from '../../dto/offer/offer.dto';
import UserDto from '../../dto/user/user.dto';
import { Comment, Offer, User } from '../../types/types';

export const adaptUserToClient = (user: UserDto): User => ({
  name: user.name,
  email: user.email,
  avatarUrl: user.avatarPath,
  type: user.type,
});

export const adaptOffersToClient = (offers: FullOfferDTO[]): Offer[] =>
  offers
    .map((offer: FullOfferDTO) => ({
      id: offer.id,
      title: offer.title,
      price: offer.price,
      rating: offer.rating,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      city: {
        name: offer.city.name,
        location: offer.city.location,
      },
      location: offer.location,
      previewImage: offer.previewImage,
      type: offer.type,
      bedrooms: offer.bedrooms,
      description: offer.description,
      goods: offer.goods,
      host: adaptUserToClient(offer?.user),
      images: offer.images,
      maxAdults: offer.maxAdults
    }));

export const adaptOfferToClient = (offer: FullOfferDTO): Offer =>
  ({
    id: offer.id,
    title: offer.title,
    price: offer.price,
    rating: offer.rating,
    isPremium: offer.isPremium,
    isFavorite: offer.isFavorite,
    city: {
      name: offer.city.name,
      location: offer.city.location,
    },
    location: offer.location,
    previewImage: offer.previewImage,
    type: offer.type,
    bedrooms: offer.bedrooms,
    description: offer.description,
    goods: offer.goods,
    host: adaptUserToClient(offer?.user),
    images: offer.images,
    maxAdults: offer.maxAdults
  });

export const adaptCommentsToClient = (comments: CommentDTO[]): Comment[] =>
  comments
    .filter((comment: CommentDTO) =>
      comment.user !== null,
    )
    .map((comment: CommentDTO) => ({
      id: comment.id,
      comment: comment.comment,
      date: comment.postDate,
      rating: comment.rating,
      user: adaptUserToClient(comment.user),
    }));

export const adaptCommentToClient = (comment: CommentDTO): Comment => ({
  id: comment.id,
  comment: comment.comment,
  date: comment.postDate,
  rating: comment.rating,
  user: adaptUserToClient(comment.user),
});

