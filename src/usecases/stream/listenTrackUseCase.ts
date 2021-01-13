import { UseCase } from '../infrastructure';
import { Logger } from '../ports/infrastructure';

interface ListenTrackUseCaseInput {
  trackId: string;
}

export default class ListenTrackUseCase extends UseCase {
  constructor(private logger: Logger) {
    super();
  }

  async execute(input: ListenTrackUseCaseInput): Promise<any> {
    this.logger.info(input);
    return {};
  }
}
