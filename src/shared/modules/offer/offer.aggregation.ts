import { Types } from 'mongoose';

export const POPULATE_USER = [
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

export const populateFavorites = (userId?: string, offerId?: string) => {
  if (!userId) {
    return [{ $addFields: { isFavorite: false } }];
  }
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
};
