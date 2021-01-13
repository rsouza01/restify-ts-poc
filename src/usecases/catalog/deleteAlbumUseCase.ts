import { UseCase } from '../infrastructure';
import { Logger } from '../ports/infrastructure';

interface DeleteAlbumUseCaseInput {
  albumId: string;
}
export default class DeleteAlbumUseCase extends UseCase {
  constructor(private logger: Logger) {
    super();
  }

  async execute(input: DeleteAlbumUseCaseInput): Promise<any> {
    this.logger.info(input);
    return {};
  }
}
