import { MigrationInterface, QueryRunner } from "typeorm"

export class UsersCategoryXref1688766597875 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users.users ADD users_categories_id uuid NULL;
            ALTER TABLE users.users ADD CONSTRAINT users_fk FOREIGN KEY (users_categories_id) REFERENCES users.users_categories(id) ON UPDATE SET DEFAULT; 
            ALTER TABLE users.users ALTER COLUMN users_categories_id SET DEFAULT 'bc545f48-29bc-4a6a-9b3e-6d9aaa8a201f';
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
