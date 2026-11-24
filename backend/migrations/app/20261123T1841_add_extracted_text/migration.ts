#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/3cbdec9e821e0e0fe9721ea9488565a5d08b15670ea00151a2eb2a22ef6d58bb/contract';
import startContract from '../../snapshots/3cbdec9e821e0e0fe9721ea9488565a5d08b15670ea00151a2eb2a22ef6d58bb/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/981e71f6a7d0b80c32288b35ae2e6d0e0dc732f3580b01feb37ffdd49cc9ec10/contract';
import endContract from '../../snapshots/981e71f6a7d0b80c32288b35ae2e6d0e0dc732f3580b01feb37ffdd49cc9ec10/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'Contract',
        column: col('extractedText', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
