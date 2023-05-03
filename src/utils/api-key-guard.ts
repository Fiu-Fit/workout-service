import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  validateApiKey(apiKey: string): boolean {
    return apiKey === process.env.WORKOUT_API_KEY;
  }

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const key = req.headers['X-API-KEY'] ?? req.query.api_key; // checks the header, moves to query if null
    return this.validateApiKey(key);
  }
}
