import { DEFAULT_PROTO_PATH } from '@fiu-fit/common';
import { ClientOptions, Transport } from '@nestjs/microservices';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options:   {
    package:   ['workout', 'exercise'],
    protoPath: [
      `${DEFAULT_PROTO_PATH}/workout.proto`,
      `${DEFAULT_PROTO_PATH}/exercise.proto`,
    ],
  },
};
