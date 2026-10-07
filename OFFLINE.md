# 오프라인 설치 가이드

이 문서는 `offline` 브랜치 전용입니다. `pnpm-lock.yaml`에 고정된 패키지를 `offline-store/`에 미리 받아 두어서, **인터넷이 없는 PC에서도 현재 패키지 버전 그대로 설치하고 빌드**할 수 있게 합니다.

**오프라인 PC에는 Node만 있으면 됩니다.** pnpm은 저장소 안(`offline-tools/pnpm`, 버전 10.28.0)에 들어 있고, 모든 스크립트가 그것만 사용합니다. PC에 설치된 pnpm은 사용하지 않습니다.

## 용어 (먼저 읽어 주세요)

| 용어 | 뜻 |
|---|---|
| 온라인 PC | 인터넷이 되는 PC. 패키지를 새로 받거나 업데이트할 때만 사용합니다. |
| 오프라인 PC | 인터넷이 없는 PC. 설치와 빌드만 합니다. |
| 락파일 (`pnpm-lock.yaml`) | 설치할 패키지의 정확한 버전과 해시를 적어 둔 목록입니다. |
| `offline-store/` | 락파일에 적힌 패키지 파일을 실제로 담아 둔 폴더입니다. 오프라인 설치는 여기서만 패키지를 가져옵니다. |
| `offline-tools/pnpm` | `offline-store/`를 만든 pnpm 10.28.0입니다. 설치와 저장소 생성에 이것만 씁니다. |

## 사용 방법

> **명령은 `npm run ...`으로 실행합니다.** `npm`은 Node와 함께 설치되므로 따로 준비할 것이 없습니다.
> `pnpm install`, `pnpm run`, `pnpm update` 같은 PC의 pnpm 명령은 이 저장소에서 쓰지 마세요. (주의점 4)

### A. 오프라인 PC에서 처음 설치하기

**1단계. Node를 확인합니다.** 터미널(Windows는 PowerShell)에서 실행합니다.

```shell
node -v    # v20.19 이상이면 됩니다. (검증은 v22.22)
```

- 버전이 나오지 않거나 낮으면 Node를 먼저 설치해야 합니다. 이 저장소에는 Node가 들어 있지 않으므로 인터넷이 되는 PC에서 설치 파일을 받아 옮겨 와야 합니다.
- pnpm은 확인하거나 설치할 필요가 없습니다.

**2단계. 프로젝트를 받습니다.** 둘 중 하나를 선택합니다.

```shell
# 방법 1: git을 쓸 수 있을 때
git clone -b offline https://github.com/sapjil/gulp.git C:\gulp

# 방법 2: git이 없을 때는 프로젝트 폴더 전체를 USB 등으로 복사합니다.
#         (offline-store, offline-tools 폴더를 빠뜨리지 마세요. 줄바꿈을 바꾸는 도구는 쓰지 마세요.)
```

- 폴더 위치는 `C:\gulp`처럼 **짧은 경로**로 합니다. (주의점 5)

**3단계. 프로젝트 폴더로 이동합니다.**

```shell
cd C:\gulp
```

**4단계. 설치합니다.** 네트워크를 쓰지 않습니다.

```shell
npm run offline:install
```

- 마지막에 `Done in ...` 이 나오면 성공입니다. 몇 초 안에 끝납니다.
- 오류가 나면 아래 "문제 해결"을 확인하세요.

**5단계. 빌드합니다.**

```shell
npx gulp
```

- 빌드가 끝나면 개발 서버가 켜지고 `http://localhost:3000`에서 결과를 볼 수 있습니다.
- 서버를 끄려면 터미널에서 `Ctrl + C`를 누릅니다.

### B. 패키지 업데이트가 필요한 경우

> **락파일을 바꾸는 경우는, 패키지 업데이트가 필요할 때에 한합니다.**
> 오프라인 PC에서 설치만 할 때는 락파일이 바뀌지 않습니다. (`offline:install`은 락파일을 읽기만 합니다.)
> 패키지 업데이트는 인터넷이 필요하므로 **온라인 PC에서만** 합니다.

락파일이 바뀌면 `offline-store/`도 반드시 다시 만들어서 **같은 커밋에** 넣어야 합니다. 그렇지 않으면 오프라인 PC에서 설치가 실패합니다.

**1단계. 온라인 PC에서 최신 상태를 받습니다.**

```shell
git checkout offline
git pull origin offline
```

**2단계. 현재 패키지를 설치합니다.**

```shell
npm run pnpm -- install --frozen-lockfile
```

**3단계. 패키지를 업데이트합니다.** 상황에 맞는 한 가지를 고릅니다.

```shell
npm run pnpm -- update                 # 허용된 버전 범위 안에서 전체 패키지를 최신으로 올립니다.
npm run pnpm -- add -D 패키지이름       # 패키지를 새로 추가합니다. (예: npm run pnpm -- add -D is-number)
npm run pnpm -- audit                  # 보안 취약점이 있는지 확인만 합니다. (파일은 바뀌지 않습니다.)
```

- `npm run pnpm -- ...`은 저장소에 들어 있는 pnpm 10.28.0을 실행하는 명령입니다. `--` 뒤에 pnpm 명령을 그대로 적습니다.
- 이 단계에서 `package.json`과 `pnpm-lock.yaml`이 바뀝니다. 바뀐 파일은 `git status`로 확인할 수 있습니다.

**4단계. `offline-store/`를 다시 만듭니다.**

```shell
npm run offline:fetch
```

- 마지막에 `offline-store 갱신 완료: 파일 ...개`가 나오면 성공입니다. 약 10초 걸립니다.
- 이 명령은 `node_modules/`를 지웁니다. 4단계 뒤에 빌드하려면 5단계로 다시 설치합니다.

**5단계. 인터넷 없이 설치되는지 확인합니다.** 저장소가 빠짐없이 만들어졌는지 검증하는 단계입니다.

```shell
npm run offline:install
npx gulp
```

- 설치가 오류 없이 끝나고 `npx gulp`가 동작하면 성공입니다. 서버는 `Ctrl + C`로 끕니다.

**6단계. 커밋하고 올립니다.** 락파일과 `offline-store/`를 반드시 함께 커밋합니다.

```shell
git add -A
git commit -m "Feat 패키지 업데이트"
git push origin offline
```

- `git status`에 `offline-store/v10/index/...` 파일이 600개 넘게 "수정됨"으로 나오는 것은 **정상**입니다. 저장소를 다시 만들 때마다 인덱스 파일의 시간 기록만 바뀝니다. 파일 권한(755/644)만 바뀐 파일 몇 개가 같이 보일 수도 있고, 역시 정상입니다. (주의점 9)

**7단계. 오프라인 PC에 반영합니다.**

```shell
git pull origin offline       # git이 없으면 프로젝트 폴더 전체를 다시 복사합니다.
npm run offline:install
```

### 문제 해결

| 증상 | 원인 | 해결 |
|---|---|---|
| `GET https://registry.npmjs.org/@types%2Fcors error (ENOTFOUND). Will retry in 1 minute.` 같은 줄이 계속 반복됩니다. 중단하면 `Command failed with exit code 1 ... pnpm.mjs" install` 과 `runDepsStatusCheck`가 보입니다. | **PC에 설치된 pnpm(11 이상)이 `pnpm run` 앞에서 `pnpm install`을 자동으로 실행**하는 것입니다. 이 자동 설치는 이 저장소의 `offline-store/`가 아닌 PC의 기본 저장소를 쓰고 인터넷에서 받으려 해서 재시도가 반복됩니다. `Progress` 줄의 `reused` 숫자는 PC의 기본 저장소에 있던 패키지 수라서 `offline-store/`와 무관합니다. pnpm 12는 저장소 형식도 달라(`v11`) `offline-store/`(`v10`)를 쓰지 못합니다. | `Ctrl + C`로 중단하고, 최신 `offline` 브랜치를 받은 뒤 **`npm run offline:install`** 을 실행합니다. 최신 버전은 번들 pnpm만 쓰고, `pnpm run`으로 실행해도 자동 설치가 일어나지 않게 막아 두었습니다. |
| `ERR_PNPM_MINIMUM_RELEASE_AGE_VIOLATION`, `Lockfile failed supply-chain policy check` | PC의 최신 pnpm(12 등)의 공급망 정책이 최근에 배포된 패키지 버전을 막습니다. | 이 저장소에서는 PC의 pnpm을 쓰지 말고 `npm run pnpm -- ...`, `npm run offline:install`을 사용합니다. |
| `ERR_PNPM_ABORTED_REMOVE_MODULES_DIR_NO_TTY`, 또는 "modules directory will be removed ... Proceed?" 라고 묻습니다. | 다른 저장소로 설치된 `node_modules`가 남아 있어서, pnpm이 저장소 위치가 다르다고 판단합니다. | `npm run offline:install`은 이런 `node_modules`를 자동으로 지우고 다시 설치합니다. |
| `[offline] offline-tools/pnpm 이 없습니다` | 폴더를 복사하다 `offline-tools` 폴더가 빠졌습니다. | `git checkout -- offline-tools` 또는 프로젝트 폴더를 다시 복사합니다. |
| `offline-store` 폴더가 없어졌거나 비어 있습니다. | 예전 버전의 `offline:fetch`를 인터넷이 없는 PC에서 실행하면 받기에 실패하면서 기존 저장소를 먼저 지웠습니다. (현재 버전은 임시 폴더에 받고 성공했을 때만 교체하므로 지워지지 않습니다.) | git을 쓰면 `git checkout -- offline-store`, 아니면 프로젝트 폴더를 다시 복사합니다. |
| `ERR_PNPM_NO_OFFLINE_TARBALL` | 락파일은 바뀌었는데 `offline-store/`가 그대로입니다. 또는 지원 플랫폼 밖이거나, 폴더를 복사하다 파일이 빠졌습니다. | 온라인 PC에서 B-4단계(`npm run offline:fetch`)를 하고 함께 커밋한 뒤 다시 받습니다. |
| `ERR_PNPM_OUTDATED_LOCKFILE` | `package.json`과 `pnpm-lock.yaml`이 서로 맞지 않습니다. | 온라인 PC에서 `npm run pnpm -- install`로 락파일을 맞춘 뒤 B-4단계부터 진행합니다. |
| `node -v` 버전이 20.19 미만 | Node가 오래되었습니다. | Node 20.19 이상으로 올립니다. |
| 파일 경로가 너무 길다는 오류 (Windows) | 프로젝트가 깊은 폴더에 있습니다. | `C:\gulp`처럼 짧은 경로로 옮기고 `git config core.longpaths true`를 설정합니다. |
| 위 방법으로 해결되지 않을 때 | `offline-store/`가 손상되었을 수 있습니다. | 직접 수정하지 말고 온라인 PC에서 `npm run offline:fetch`로 다시 만들어 받습니다. |

## 사용상 주의점

1. **오프라인 PC에는 Node 20.19 이상만 있으면 됩니다.** (`sass`가 20.19 이상을 요구합니다. 검증은 22.22에서 했습니다.) pnpm은 저장소의 `offline-tools/pnpm`(10.28.0)을 쓰므로 설치할 필요가 없습니다. Node는 저장소에 들어 있지 않습니다.
2. **지원 플랫폼 밖에서는 설치가 실패합니다.** `sharp`와 `@parcel/watcher`는 OS와 CPU별로 다른 네이티브 패키지를 씁니다. `pnpm-workspace.yaml`의 `supportedArchitectures`에 있는 범위(linux/macOS/Windows × x64/arm64 × glibc/musl)만 들어 있습니다. 범위를 바꾸면 `npm run offline:fetch`를 다시 실행하세요.
3. **락파일과 `offline-store/`가 어긋나면 설치가 실패합니다.** 락파일을 바꾸는 경우는 패키지 업데이트가 필요할 때에 한하며, 이때는 반드시 `npm run offline:fetch`를 실행해서 `offline-store/`를 함께 갱신하세요. 그렇지 않으면 `ERR_PNPM_NO_OFFLINE_TARBALL`이 납니다. 락파일을 바꾸는 커밋에는 `offline-store/` 변경을 반드시 함께 넣으세요.
4. **이 저장소에서는 PC에 설치된 pnpm 명령을 쓰지 마세요.** `pnpm install`, `pnpm run`, `pnpm add`, `pnpm update`, `pnpm fetch`는 사용하지 않습니다. 특히 PC의 pnpm이 11 이상이면 `pnpm run` 앞에서 자동으로 인터넷 설치를 시도하고, 저장소 형식(`v11` 이상)이 `offline-store/`(`v10`)와 달라 `offline-store/`를 쓰지 못하며, 공급망 정책 검사로 설치가 거부될 수도 있습니다. 대신 `npm run offline:install`, `npm run offline:fetch`, `npm run pnpm -- ...`을 쓰세요. `offline:fetch`는 임시 폴더에 받고 성공했을 때만 `offline-store/`를 교체하므로, 실수로 실행해 실패해도 기존 저장소는 남습니다.
5. **Windows에서는 저장소를 짧은 경로에 두세요.** 저장소 안 파일의 상대 경로가 최대 158자입니다. Windows의 경로 길이 제한은 260자라서 `C:\gulp`처럼 짧은 위치에 풀고, git을 쓴다면 `git config core.longpaths true`를 설정하세요.
6. **줄바꿈 변환이 일어나면 설치가 실패합니다.** pnpm은 저장소 파일의 해시로 무결성을 검사합니다. Windows의 `core.autocrlf`가 파일을 바꾸면 깨지므로 `.gitattributes`의 `offline-store/** -text -diff`, `offline-tools/** -text -diff` 설정을 지우지 마세요. 압축 파일로 옮길 때도 줄바꿈을 변환하는 도구는 쓰지 마세요.
7. **`offline-store/`와 `offline-tools/` 파일을 직접 수정하거나 삭제하지 마세요.** 해시 이름으로 저장된 파일이라 일부만 바뀌어도 설치가 실패합니다. 문제가 있으면 `npm run offline:fetch`로 `offline-store/`를 다시 만들거나, `offline-tools`는 `git checkout -- offline-tools`로 되돌립니다.
8. **`node_modules/`를 복사해서 옮기지 마세요.** 네이티브 패키지가 플랫폼에 종속되어 다른 OS에서는 동작하지 않습니다. 항상 대상 PC에서 `npm run offline:install`을 실행합니다.
9. **용량이 큽니다.** `offline-store/`는 작업 폴더에서 약 309MB(파일 15,934개), git에서 약 96MB이고, `offline-tools/pnpm`은 약 21MB(파일 1,068개)입니다. 가장 큰 파일이 19MB라서 GitHub의 파일당 100MB 제한에는 걸리지 않습니다. `offline:fetch`는 저장소를 처음부터 다시 만들기 때문에, 패키지가 그대로여도 `offline-store/v10/index/`의 인덱스 파일 715개가 시간 기록(`checkedAt`)만 바뀐 채 "수정됨"으로 나옵니다(합계 약 3.1MB). 큰 패키지 파일은 같은 내용이면 이력에 다시 쌓이지 않고, 새로 필요한 패키지 파일만 추가됩니다.
10. **알려진 취약점도 락파일 그대로 들어 있습니다.** 이 저장소는 락파일을 고정해서 받아 둔 것이라 보안 갱신이 자동으로 반영되지 않습니다. `npm run pnpm -- audit`는 온라인이 필요하므로 온라인 PC에서 확인하고, 갱신했다면 `npm run offline:fetch`를 다시 실행하세요.
11. **이 저장소 범위는 gulp 빌드에 필요한 패키지와 pnpm입니다.** Node와 브라우저는 포함하지 않습니다. `browser-sync`가 여는 브라우저는 오프라인 PC에 따로 있어야 합니다.
12. **번들 pnpm 버전을 바꾸면 `offline-store/`도 다시 만들어야 합니다.** `offline-store/`의 형식(`v10`)은 번들 pnpm 10.28.0에 맞춰져 있습니다. pnpm 11 이상은 형식이 달라 같은 저장소를 쓰지 못합니다. 번들을 바꿀 때는 `offline-tools/pnpm`을 교체하고 `offline-store/`를 새로 만들어 함께 검증하세요.

## 브랜치 운영 규칙

- `offline` 브랜치는 `dev`에서 분기했습니다. `main`과 `dev`에는 `offline-store/`를 넣지 않습니다.
- `dev`의 변경을 가져올 때는 `dev`를 `offline`에 머지한 뒤, 락파일이 바뀌었다면 `npm run offline:fetch`를 실행하고 함께 커밋합니다.
- 오프라인 환경 설정 자체(`offline-store/`, `offline-tools/`, `scripts/offline-*.mjs`, `scripts/_pnpm.mjs`, `scripts/pnpm.mjs`, `.gitattributes`, `pnpm-workspace.yaml`의 `supportedArchitectures`와 `verifyDepsBeforeRun`, `OFFLINE.md`)를 `dev`로 되돌려 머지하지 않습니다.

## 검증한 내용

- 새로 clone한 폴더에서 **PC에 pnpm이 없는 상태(PATH에 node만)** 로 네트워크를 차단하고 `npm run offline:install`을 실행해, 2.7초에 설치되고 `lintSass`, `compileSass`, `minifyScripts`, `html`, `sitemap` 빌드가 통과했습니다.
- **PC에 pnpm 12.9.1이 설치된 상태**를 재현했습니다. (1) 기존 방식(`pnpm run offline:install`)은 자동 설치가 먼저 실행되어 기본 저장소(`v11`)에서 받으려 하고 공급망 정책 검사가 걸렸습니다. 사용자 로그와 같은 현상입니다. (2) `verifyDepsBeforeRun: false`를 넣은 뒤에는 `pnpm run offline:install`도 곧바로 스크립트로 들어가 번들 pnpm 10.28.0으로 설치가 성공했습니다. (3) pnpm 12가 만든 상태에서도 `npm run offline:install`이 성공했습니다.
- `npm run offline:fetch`로 번들 pnpm이 같은 형식(`v10`)의 저장소를 다시 만들고, 인터넷이 없는 상태에서는 실패하지만 기존 `offline-store/`(15,934개 파일)가 그대로 남는 것을 확인했습니다.
- 패키지 하나를 추가한 뒤 `offline:fetch`로 저장소를 다시 만들고, 네트워크를 차단한 상태에서 `offline:install`이 되는 것까지 B 절차를 실제로 따라 해서 확인했습니다.
- 검증 환경은 linux-x64, Node 22.22입니다. macOS와 Windows에서는 실제 설치를 시험하지 못했습니다. 해당 플랫폼용 패키지가 저장소에 들어 있다는 것까지만 확인했습니다. 사용자가 보고한 Windows PC의 로그는 위 pnpm 12 재현과 같은 형태이며, Windows에서의 실제 성공 여부는 최신 브랜치로 다시 시험해 주셔야 합니다.
