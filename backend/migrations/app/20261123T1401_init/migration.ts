#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/3cbdec9e821e0e0fe9721ea9488565a5d08b15670ea00151a2eb2a22ef6d58bb/contract';
import endContract from '../../snapshots/3cbdec9e821e0e0fe9721ea9488565a5d08b15670ea00151a2eb2a22ef6d58bb/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  col,
  fn,
  lit,
  primaryKey,
  sql,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'ChatMessage',
        columns: [
          col('content', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('contractId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('role', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Contract',
        columns: [
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('fileName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('filePath', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('fileSize', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('processing'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'DocumentChunk',
        columns: [
          col('content', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('contractId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('pageNumber', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('sectionName', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Review',
        columns: [
          col('contractId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'ReviewFinding',
        columns: [
          col('checklistItem', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('pageNumber', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('quote', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('reviewId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('sectionName', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('summary', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'User',
        columns: [
          col('clerkUserId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'User',
        constraint: 'User_clerkUserId_key',
        columns: ['clerkUserId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'User',
        constraint: 'User_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ChatMessage',
        index: 'ChatMessage_contractId_idx_102708cf',
        columns: ['contractId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Contract',
        index: 'Contract_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'DocumentChunk',
        index: 'DocumentChunk_contractId_idx_102708cf',
        columns: ['contractId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Review',
        index: 'Review_contractId_idx_102708cf',
        columns: ['contractId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ReviewFinding',
        index: 'ReviewFinding_reviewId_idx_2f51da17',
        columns: ['reviewId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ChatMessage',
        foreignKey: {
          name: 'ChatMessage_contractId_fkey',
          columns: ['contractId'],
          references: { schema: 'public', table: 'Contract', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Contract',
        foreignKey: {
          name: 'Contract_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'DocumentChunk',
        foreignKey: {
          name: 'DocumentChunk_contractId_fkey',
          columns: ['contractId'],
          references: { schema: 'public', table: 'Contract', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Review',
        foreignKey: {
          name: 'Review_contractId_fkey',
          columns: ['contractId'],
          references: { schema: 'public', table: 'Contract', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ReviewFinding',
        foreignKey: {
          name: 'ReviewFinding_reviewId_fkey',
          columns: ['reviewId'],
          references: { schema: 'public', table: 'Review', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
