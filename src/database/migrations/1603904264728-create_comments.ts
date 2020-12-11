import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createComments1603904264728 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(new Table({
      name: 'comments',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'comment',
          type: 'varchar',
        },
        {
          name: 'name',
          type: 'varchar',

        },
        {
          name: 'orphanage_id',
          type: 'integer',

        },
        {
          name: 'colorIcon',
          type: 'varchar',
        },
      ],
      foreignKeys: [
        {
          name: 'orphanagesComments',
          columnNames: ['orphanage_id'],
          referencedTableName: 'orphanages',
          referencedColumnNames: ['id'],

        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('comments');
  }
}
