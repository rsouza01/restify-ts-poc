import { UseCase } from '../infrastructure';
import { Logger } from '../ports/infrastructure';

interface CreatePlaylistUseCaseInput {
  trackIds: string[];
}

export default class CreatePlaylistUseCase extends UseCase {
  constructor(private logger: Logger) {
    super();
  }

  async execute(input: CreatePlaylistUseCaseInput): Promise<any> {
    this.logger.info(input);
    return {};
  }
}
