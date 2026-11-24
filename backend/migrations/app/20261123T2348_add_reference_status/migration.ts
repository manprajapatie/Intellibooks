#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/175f9d12b6aae274538f8031556313eaf9933d571c494e730adafc2b5dedf088/contract';
import startContract from '../../snapshots/175f9d12b6aae274538f8031556313eaf9933d571c494e730adafc2b5dedf088/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/d977f36f54b4d2b426c4452743d774bb0d31e213074448c4716e26a6feab49ec/contract';
import endContract from '../../snapshots/d977f36f54b4d2b426c4452743d774bb0d31e213074448c4716e26a6feab49ec/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumnWithTemporaryDefault({
        schema: 'public',
        table: 'ReviewFinding',
        column: 'referenceStatus',
        type: 'text',
        temporaryDefault: sql`''`,
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
