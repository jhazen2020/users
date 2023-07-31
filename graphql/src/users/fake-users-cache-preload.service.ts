import { OnModuleInit, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Cache } from 'cache-manager';

/**
 * Reads the JSON file with fake user data and writes it to the cache.
 * This is only done on NestJs startup.
 * @date 7/31/2023 - 10:53:49 AM
 *
 * @export
 * @class FakeUsersCacheService
 * @typedef {FakeUsersCacheService}
 * @implements {OnModuleInit}
 */
export class FakeUsersCacheService implements OnModuleInit {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async onModuleInit() {
    const fakeUsers = JSON.parse(
      readFileSync(join(process.cwd(), '/database/fake-users.json'), 'utf8'),
    );

    for (const fakeUser of fakeUsers) {
      try {
        const userData = { ...fakeUser };
        await this.cacheManager.set(
          'fake_user_id-' + fakeUser['id'],
          JSON.stringify(userData),
          0,
        );
      } catch (e) {
        console.log(e);
      }
    }
  }
}
