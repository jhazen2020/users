import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

/**
 * This module is used for authorization. It uses the jwtStrategy
 * definition and passport library.
 * @todo create a custom private repo for this module when
 * there is more than one service.
 * @date 7/31/2023 - 10:48:18 AM
 *
 * @export
 * @class AuthorizationModule
 * @typedef {AuthorizationModule}
 */
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtStrategy],
  exports: [PassportModule],
})
export class AuthorizationModule {}
