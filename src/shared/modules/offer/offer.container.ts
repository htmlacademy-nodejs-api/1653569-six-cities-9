import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { OfferService } from './offer-service.interface.js';
import { COMPONENT } from '../../constant/index.js';
import { DefaultOfferService } from './default-offer.service.js';
import { OfferEntity } from './offer.entity.js';
import { Controller } from '../../libs/rest/index.js';
import { OfferController } from './offer.controller.js';
import { OfferModel } from '../index.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<OfferService>(COMPONENT.OFFER_SERVICE).to(DefaultOfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(COMPONENT.OFFER_MODEL).toConstantValue(OfferModel);
  offerContainer.bind<Controller>(COMPONENT.OFFER_CONTROLLER).to(OfferController).inSingletonScope();

  return offerContainer;
}
