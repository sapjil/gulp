// offline 브랜치 전용: PC 에 설치된 pnpm 대신 저장소에 들어 있는 pnpm(offline-tools/pnpm)만 사용한다.
// offline-store/ 는 이 pnpm(10.28.0, 저장소 형식 v10)으로 만들었다.
// pnpm 11 이상은 저장소 형식(v11 이상)과 동작(pnpm run 앞에서 자동 install)이 달라 offline-store/ 를 쓰지 못한다.
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = fileURLToPath(new URL('..', import.meta.url));
export const pnpmBin = join(root, 'offline-tools', 'pnpm', 'bin', 'pnpm.cjs');

export function runPnpm(args) {
  if (!existsSync(pnpmBin)) {
    console.error(
      '[offline] offline-tools/pnpm 이 없습니다. offline 브랜치 폴더를 통째로 복사했는지 확인하세요.\n' +
        '  폴더를 지웠다면 `git checkout -- offline-tools` 또는 폴더를 다시 복사하세요.',
    );
    return { status: 1 };
  }
  // node 로 직접 실행하므로 Windows 에서도 셸(.cmd)을 거치지 않는다.
  return spawnSync(process.execPath, [pnpmBin, ...args], { cwd: root, stdio: 'inherit' });
}
