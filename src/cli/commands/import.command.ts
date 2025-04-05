import { Command, CommandName } from '../types/index.js';
import { Offer } from '../../shared/types/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { getMongoURI } from '../../shared/helpers/index.js';
import { DatabaseClient } from '../../shared/libs/database-client/database-client.interface.js';
import { MongoDatabaseClient } from '../../shared/libs/database-client/mongo.database-client.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { ConsoleLogger } from '../../shared/libs/logger/index.js';
import { DefaultOfferService, OfferService } from '../../shared/modules/offer/index.js';
import { DefaultUserService, UserService } from '../../shared/modules/user/index.js';
import { EventName } from '../types/event-name.enum.js';
import { CommentModel, OfferModel, UserModel } from '../../shared/modules/index.js';
import { CommentService, DefaultCommentService } from '../../shared/modules/comment/index.js';

export class ImportCommand implements Command {
  private readonly userService: UserService;
  private readonly offerService: OfferService;
  private readonly commentService: CommentService;
  private readonly databaseClient: DatabaseClient;
  private readonly logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedOffer = this.onImportedOffer.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.commentService = new DefaultCommentService(this.logger, CommentModel);
    this.offerService = new DefaultOfferService(this.logger, OfferModel, this.commentService);
    this.userService = new DefaultUserService(this.logger, UserModel, this.offerService);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedOffer(offer: Offer, resolve: () => void) {
    await this.saveOffer(offer);
    resolve();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate(
      Object.assign(offer.author, { password: offer.author.password }),
      this.salt
    );

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      city: offer.city,
      previewImage: offer.previewImage,
      images: offer.images,
      isPremium: offer.isPremium,
      type: offer.type,
      bedrooms: offer.bedrooms,
      maxAdults: offer.maxAdults,
      price: offer.price,
      goods: offer.goods,
      userId: user.id,
      location: offer.location
    });
  }

  private onCompleteImport(count: number) {
    this.logger.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  public getName(): string {
    return CommandName.Import;
  }

  public async execute(
    filename: string,
    login: string,
    password: string,
    host: string,
    port: string,
    name: string,
    salt: string
  ): Promise<void> {
    const uri = getMongoURI(login, password, host, port, name);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on(EventName.Line, this.onImportedOffer);
    fileReader.on(EventName.End, this.onCompleteImport);

    try {
      fileReader.read();
    } catch (error) {
      this.logger.error(`Can't import data from file: ${filename}`, error as Error);
    }
  }
}
