// offline-store/ 를 pnpm-lock.yaml 기준으로 처음부터 다시 만든다.
// 락파일이 바뀔 때마다 실행하고 offline-store/ 변경분을 함께 커밋한다.
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const store = join(root, 'offline-store');
const run = (args) =>
  execFileSync('pnpm', args, { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' });

// 오래된 패키지가 남지 않도록 저장소를 비우고 새로 받는다.
// supportedArchitectures 를 바꾼 직후에는 기존 node_modules 가 있으면 pnpm 이 중단되므로 같이 지운다.
rmSync(store, { recursive: true, force: true });
rmSync(join(root, 'node_modules'), { recursive: true, force: true });

run(['fetch', '--frozen-lockfile', '--store-dir', store]);
rmSync(join(root, 'node_modules'), { recursive: true, force: true });

const count = (dir) =>
  readdirSync(dir, { withFileTypes: true }).reduce(
    (n, e) => n + (e.isDirectory() ? count(join(dir, e.name)) : 1),
    0,
  );
if (!existsSync(store) || statSync(store).size === 0 || count(store) === 0) {
  console.error('offline-store 가 비어 있습니다. pnpm fetch 결과를 확인하세요.');
  process.exit(1);
}
console.log(`offline-store 갱신 완료: 파일 ${count(store)}개`);
