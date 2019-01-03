import { ReflectMetadata, Type } from '@nestjs/common';
import { NestDataLoader } from './dataloader.interface';

/**
 * it's just a decorator for reflecting metaData
 * @param loader class that implemet nestDataLoader
 */
export const Loader = (loader: Type<NestDataLoader>) =>
  ReflectMetadata('dataloader', loader);
