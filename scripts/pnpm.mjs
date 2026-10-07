// 번들 pnpm 을 그대로 실행한다. 온라인 PC 에서 패키지를 바꿀 때 사용한다.
// 예) npm run pnpm -- update / npm run pnpm -- add -D 패키지이름
import { runPnpm } from './_pnpm.mjs';

process.exit(runPnpm(process.argv.slice(2)).status ?? 1);
