import { Session } from 'inspector';
import { Logger } from '../../../../../../../usecases/ports/infrastructure';
import AbstractController from '../../../../abstractController';
import { UseCaseResponse } from '../../../../../models';

class CreateUserController extends AbstractController {
  constructor(private service: any) {
    super();
  }

  public async execute(event: any, context: any, session: Session, logger?: Logger): Promise<UseCaseResponse> {

		console.debug(`>>>>>>>> CALLED CreateUserController.execute <<<<<<<<<<<`);

		return {
      generic_code: 200,
      generic_field: "200",
    } as UseCaseResponse;
  }
}

export { CreateUserController };
