import { CreateCommentDTO } from '../../dto/comment/create-comment.dto';
import CreateOfferDTO from '../../dto/offer/create-offer.dto';
import UpdateOfferDTO from '../../dto/offer/update-offer.dto';
import { CreateUserDTO } from '../../dto/user/create-user.dto';
import { NewComment, NewOffer, Offer, UserRegister } from '../../types/types';

export const adaptSignUpToServer = (user: UserRegister): CreateUserDTO => ({
  name: user.name,
  email: user.email,
  password: user.password,
  type: user.type,
});

export const adaptAvatarToServer = (file: string) => {
  const formData = new FormData();
  formData.set('avatarPath', file);

  return formData;
};

export const adaptCreateOfferToServer = (offer: NewOffer): CreateOfferDTO => ({
  title: offer.title,
  description: offer.description,
  city: offer.city.name,
  previewImage: offer.previewImage,
  images: offer.images,
  isPremium: offer.isPremium,
  type: offer.type,
  bedrooms: offer.bedrooms,
  maxAdults: offer.maxAdults,
  price: offer.price,
  goods: offer.goods,
  location: offer.city.location,
});

export const adaptEditOfferToServer = (offer: Offer): UpdateOfferDTO => ({
  title: offer.title,
  description: offer.description,
  city: offer.city.name,
  previewImage: offer.previewImage,
  images: offer.images,
  isPremium: offer.isPremium,
  type: offer.type,
  bedrooms: offer.bedrooms,
  maxAdults: offer.maxAdults,
  price: offer.price,
  goods: offer.goods,
  location: offer.city.location,
});

export const adaptCreateCommentToServer = (id: string, comment: NewComment): CreateCommentDTO => ({
  offerId: id,
  comment: comment.comment,
  rating: comment.rating,
});
