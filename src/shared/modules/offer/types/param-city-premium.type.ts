import { ParamsDictionary } from 'express-serve-static-core';
import { CityName } from '../../../types/city-name.enum.js';

export type ParamCityPremium = { city: CityName } | ParamsDictionary;
