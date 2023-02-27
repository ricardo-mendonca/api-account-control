import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.categoria, table => {
            table.bigIncrements('id').primary().index();
            table.string('descricao').notNullable().checkLength('>=', 3);
            table.string('ativo').notNullable();

            table
                .bigInteger('usuarioId')
                .index()
                .notNullable()
                .references('id')
                .inTable(ETableNames.usuario)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');

            table.comment('Tabela usada para armazenar categoria de contas a pagar.');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.categoria}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.categoria)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.categoria}`);
        });
}
