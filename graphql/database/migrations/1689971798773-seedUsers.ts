import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsers1689971798773 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        insert into users.users (first_name, last_name, phone_number, email) values
        ('jesse', 'hazen', '+15555559559', 'jhazen2020@gmail.com'),
        ('jesse', 'hazen', '+15555559559', 'oggy@gmail.com'),
        ('sally', 'smith', '+15555559559', 'sally@gmail.com'),
        ('george', 'hernadez', '+15555559559', 'george@gmail.com'),
        ('tod', 'lemon', '+15555559559', 'tod@gmail.com'),
        ('dan', 'lime', '+15555559559', 'dan@gmail.com'),
        ('mark', 'salt', '+15555559559', 'mark@gmail.com'),
        ('frank', 'smith', '+15555559559', 'frank@gmail.com'),
        ('james', 'bees', '+15555559559', 'james@gmail.com'),
        ('pascal', 'zebra', '+15555559559', 'pascal@gmail.com'),
        ('marge', 'cummin', '+15555559559', 'marge@gmail.com'),
        ('tom', 'wonton', '+15555559559', 'tom@gmail.com');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
