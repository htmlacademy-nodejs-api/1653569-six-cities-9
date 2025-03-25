import { Types } from 'mongoose';
import { OFFER } from './offer.constant.js';

export const populateUser = [
  {
    $lookup: {
      from: 'users',
      localField: 'userId',
      foreignField: '_id',
      as: 'user',
    },
  },
  { $unwind: '$user' },
];

export const populateComments = [
  {
    $lookup: {
      from: 'comments',
      let: { offerId: '$_id' },
      pipeline: [
        { $match: { $expr: { $eq: ['$offerId', '$$offerId'] } } },
        { $project: { _id: 1, rating: 1 } },
      ],
      as: 'comments',
    }
  },
  { $addFields: { commentCount: { $size: '$comments'} } },
  { $addFields: { commentRatingSum: {
    $reduce: {
      input: '$comments',
      initialValue: { sum: 0 },
      in: {
        sum: { $add: ['$$value.sum', '$$this.rating'] }
      }
    }
  } } },
  { $addFields: { rating: {
    $cond: {
      if: {
        $ne: ['$commentCount', 0]
      },
      then: { $round: [{
        $divide: [
          '$commentRatingSum.sum',
          '$commentCount'
        ]
      }, OFFER.RATING.DECIMAL_PRECISION] },
      else: null,
    }
  } } },
  { $unset: 'commentRatingSum' },
  { $unset: 'comments' },
];

export const populateFavorites = (userId: string, offerId?: string) => {
  if (userId) {
    return [
      {
        $lookup: {
          from: 'users',
          pipeline: [
            { $match: { '_id': new Types.ObjectId(userId) } },
            { $project: { favorites: 1 } }
          ],
          as: 'userFavorite'
        },
      },
      { $unwind: '$userFavorite' },
      { $addFields: { isFavorite: {
        $in: [offerId ? new Types.ObjectId(offerId) : '$_id' , '$userFavorite.favorites']
      } }},
      { $unset: 'userFavorite' }
    ];
  }

  return [
    { $addFields: { isFavorite: false } },
  ];
};
