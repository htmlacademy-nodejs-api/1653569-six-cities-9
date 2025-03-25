import { Query } from 'express-serve-static-core';
import { CityName } from '../../../types/city-name.enum.js';

export type QueryCity = { city: CityName } | Query;
