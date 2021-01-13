import { UseCase } from '../infrastructure';
import { Logger } from '../ports/infrastructure';

interface UploadAlbumUseCaseInput {
  albumName: string;
  tracks: string[];
}

export default class UploadAlbumUseCase extends UseCase {
  constructor(private logger: Logger) {
    super();
  }

  async execute(input: UploadAlbumUseCaseInput): Promise<any> {
    this.logger.info(input);
    return {};
  }
}
