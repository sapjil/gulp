// offline-store/ 만 사용해서 네트워크 없이 설치한다. (pnpm run offline:install)
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const store = join(root, 'offline-store');
const modules = join(root, 'node_modules');
const norm = (p) => {
  const r = resolve(p);
  return process.platform === 'win32' ? r.toLowerCase() : r;
};

if (!existsSync(store) || readdirSync(store).length === 0) {
  console.error(
    '[offline:install] offline-store/ 가 없거나 비어 있습니다.\n' +
      '  - offline 브랜치가 맞는지, 프로젝트 폴더를 통째로 복사했는지 확인하세요.\n' +
      '  - 폴더를 지웠다면 `git checkout -- offline-store` 또는 폴더를 다시 복사하세요.',
  );
  process.exit(1);
}

// 일반 pnpm install 로 만든 node_modules 가 남아 있으면 pnpm 이 저장소 위치가 다르다며 중단한다.
// 설치 결과물일 뿐이므로 저장소 위치가 다르면 지우고 다시 설치한다.
const meta = join(modules, '.modules.yaml');
if (existsSync(meta)) {
  const m = readFileSync(meta, 'utf8').match(/^storeDir:\s*['"]?(.+?)['"]?\s*$/m);
  if (!m || !norm(m[1]).startsWith(norm(store))) {
    console.log('[offline:install] 다른 저장소로 설치된 node_modules 를 지우고 다시 설치합니다.');
    rmSync(modules, { recursive: true, force: true });
  }
}

const r = spawnSync(
  'pnpm',
  ['install', '--offline', '--frozen-lockfile', '--store-dir', store],
  { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' },
);
if (r.status !== 0) {
  console.error(
    '\n[offline:install] 설치에 실패했습니다. OFFLINE.md 의 "문제 해결"을 확인하세요.\n' +
      '  - ERR_PNPM_NO_OFFLINE_TARBALL: 락파일과 offline-store/ 가 어긋났거나, 지원 플랫폼 밖이거나,\n' +
      '    폴더를 복사하다 파일이 빠졌습니다. (온라인 PC 에서 offline:fetch 후 다시 받으세요)',
  );
}
process.exit(r.status ?? 1);
