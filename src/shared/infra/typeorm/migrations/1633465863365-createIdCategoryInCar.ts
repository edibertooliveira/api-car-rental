import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class createIdCategoryInCar1633465863365 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'cars',
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedTableName: 'categories',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cars', 'category_id');
  }
}
