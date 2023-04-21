import { DEFAULT_PROTO_PATH } from '@fiu-fit/common';
import { ClientOptions, Transport } from '@nestjs/microservices';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options:   {
    package:   ['workout'],
    protoPath: [`${DEFAULT_PROTO_PATH}/workout.proto`],
  },
};
