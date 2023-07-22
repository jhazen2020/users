import { OnModuleInit, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Cache } from 'cache-manager';

export class FakeUserService implements OnModuleInit {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async onModuleInit() {
    const fakeUsers = JSON.parse(
      readFileSync(join(process.cwd(), '/database/fake-users.json'), 'utf8'),
    );
  

    for(const fakeUser of fakeUsers){
      try{
        const userData = {...fakeUser};
        await this.cacheManager.set('fake_user_id-' + fakeUser['id'], JSON.stringify(userData), 0);
      }catch(e){
        console.log(e);
      }
     
    }
  }
}
