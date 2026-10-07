// offline-store/ 를 pnpm-lock.yaml 기준으로 처음부터 다시 만든다. (온라인 PC 에서만 실행)
// 락파일이 바뀔 때마다 실행하고 offline-store/ 변경분을 함께 커밋한다.
// 임시 폴더에 먼저 받고, 성공했을 때만 기존 offline-store/ 와 교체한다.
// (인터넷이 없는 PC 에서 실수로 실행해도 기존 offline-store/ 는 지워지지 않는다.)
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, renameSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const store = join(root, 'offline-store');
const tmp = join(root, 'offline-store.tmp');
const modules = join(root, 'node_modules');

const count = (dir) =>
  readdirSync(dir, { withFileTypes: true }).reduce(
    (n, e) => n + (e.isDirectory() ? count(join(dir, e.name)) : 1),
    0,
  );

// supportedArchitectures 를 바꾼 직후에는 기존 node_modules 가 있으면 pnpm 이 중단되므로 같이 지운다.
rmSync(tmp, { recursive: true, force: true });
rmSync(modules, { recursive: true, force: true });

const r = spawnSync(
  'pnpm',
  ['fetch', '--frozen-lockfile', '--store-dir', tmp],
  { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' },
);
rmSync(modules, { recursive: true, force: true });

if (r.status !== 0 || !existsSync(tmp) || count(tmp) === 0) {
  rmSync(tmp, { recursive: true, force: true });
  console.error(
    '\n[offline:fetch] 패키지를 받지 못했습니다. 인터넷이 되는 PC 인지 확인하세요.\n' +
      '  기존 offline-store/ 는 그대로 남겨 두었습니다.',
  );
  process.exit(r.status || 1);
}

rmSync(store, { recursive: true, force: true });
renameSync(tmp, store);
console.log(`offline-store 갱신 완료: 파일 ${count(store)}개`);
