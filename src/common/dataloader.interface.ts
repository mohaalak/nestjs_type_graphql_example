import DataLoader from 'dataloader';
export interface NestDataLoader {
  /**
   * Should return a new instance of dataloader each time
   */
  generateDataLoader(): DataLoader<any, any>;
}
