import {MigrationInterface, QueryRunner,Table,TableForeignKey} from "typeorm";

export default class CreateTransactions1587319287297 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.createTable(
            new Table ({ 
                name: 'transactions',
                columns: [
                    {
                        name:'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'category_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                    },
                    {
                        name:'type',
                        type:'varchar'
                    },
                    {
                        name: 'value',
                        type: 'decimal',
                        precision: 10,
                        scale:2,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                     name: 'updated_at',
                     type: 'timestamp',
                     default: 'now()',
                    }
                ]
            }),
          );
          
          await queryRunner.createForeignKey(
              'transactions',
              new TableForeignKey({
                  columnNames: ['category_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'categories',
                  name: 'cat_transaction',
                  onUpdate: 'CASCADE',
                  onDelete: 'SET NULL',
              }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('transactions');
    }

}
