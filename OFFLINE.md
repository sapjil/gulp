# 오프라인 설치 가이드

이 문서는 `offline` 브랜치 전용입니다. `pnpm-lock.yaml`에 고정된 패키지를 `offline-store/`에 미리 받아 두어서, **인터넷이 없는 PC에서도 현재 패키지 버전 그대로 설치하고 빌드**할 수 있게 합니다.

## 용어 (먼저 읽어 주세요)

| 용어 | 뜻 |
|---|---|
| 온라인 PC | 인터넷이 되는 PC. 패키지를 새로 받거나 업데이트할 때만 사용합니다. |
| 오프라인 PC | 인터넷이 없는 PC. 설치와 빌드만 합니다. |
| 락파일 (`pnpm-lock.yaml`) | 설치할 패키지의 정확한 버전과 해시를 적어 둔 목록입니다. |
| `offline-store/` | 락파일에 적힌 패키지 파일을 실제로 담아 둔 폴더입니다. 오프라인 설치는 여기서만 패키지를 가져옵니다. |

## 사용 방법

### A. 오프라인 PC에서 처음 설치하기

**1단계. 준비물을 확인합니다.** 터미널(Windows는 PowerShell)에서 아래 두 명령을 실행합니다.

```shell
node -v    # v20.19 이상이면 됩니다. (검증은 v22.22)
pnpm -v    # 10.x 이면 됩니다. (검증은 10.28.0)
```

- 버전이 나오지 않거나 낮으면 Node 또는 pnpm을 먼저 설치해야 합니다. 이 저장소에는 Node와 pnpm이 들어 있지 않으므로, 인터넷이 되는 PC에서 설치 파일을 받아 옮겨 와야 합니다.

**2단계. 프로젝트를 받습니다.** 둘 중 하나를 선택합니다.

```shell
# 방법 1: git을 쓸 수 있을 때
git clone -b offline https://github.com/sapjil/gulp.git C:\gulp

# 방법 2: git이 없을 때는 프로젝트 폴더 전체를 USB 등으로 복사합니다.
#         (offline-store 폴더를 빠뜨리지 마세요. 줄바꿈을 바꾸는 도구는 쓰지 마세요.)
```

- 폴더 위치는 `C:\gulp`처럼 **짧은 경로**로 합니다. (주의점 5)

**3단계. 프로젝트 폴더로 이동합니다.**

```shell
cd C:\gulp
```

**4단계. 설치합니다.** 네트워크를 쓰지 않습니다.

```shell
pnpm run offline:install
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
pnpm install --frozen-lockfile
```

**3단계. 패키지를 업데이트합니다.** 상황에 맞는 한 가지를 고릅니다.

```shell
pnpm update                 # 허용된 버전 범위 안에서 전체 패키지를 최신으로 올립니다.
pnpm add -D 패키지이름       # 패키지를 새로 추가합니다. (예: pnpm add -D is-number)
pnpm audit                  # 보안 취약점이 있는지 확인만 합니다. (파일은 바뀌지 않습니다.)
```

- 이 단계에서 `package.json`과 `pnpm-lock.yaml`이 바뀝니다. 바뀐 파일은 `git status`로 확인할 수 있습니다.

**4단계. `offline-store/`를 다시 만듭니다.**

```shell
pnpm run offline:fetch
```

- 마지막에 `offline-store 갱신 완료: 파일 ...개`가 나오면 성공입니다. 약 10초 걸립니다.
- 이 명령은 `node_modules/`를 지웁니다. 4단계 뒤에 빌드하려면 5단계로 다시 설치합니다.

**5단계. 인터넷 없이 설치되는지 확인합니다.** 저장소가 빠짐없이 만들어졌는지 검증하는 단계입니다.

```shell
pnpm run offline:install
npx gulp
```

- 설치가 오류 없이 끝나고 `npx gulp`가 동작하면 성공입니다. 서버는 `Ctrl + C`로 끕니다.

**6단계. 커밋하고 올립니다.** 락파일과 `offline-store/`를 반드시 함께 커밋합니다.

```shell
git add -A
git commit -m "Feat 패키지 업데이트"
git push origin offline
```

- `git status`에 `offline-store/v10/index/...` 파일이 600개 넘게 "수정됨"으로 나오는 것은 **정상**입니다. 저장소를 다시 만들 때마다 인덱스 파일의 시간 기록만 바뀝니다. (주의점 9)

**7단계. 오프라인 PC에 반영합니다.**

```shell
git pull origin offline       # git이 없으면 프로젝트 폴더 전체를 다시 복사합니다.
pnpm run offline:install
```

### 문제 해결

| 증상 | 원인 | 해결 |
|---|---|---|
| `ERR_PNPM_NO_OFFLINE_TARBALL` | 락파일은 바뀌었는데 `offline-store/`가 그대로입니다. | 온라인 PC에서 B-4단계(`pnpm run offline:fetch`)를 하고 함께 커밋한 뒤 다시 받습니다. |
| `ERR_PNPM_OUTDATED_LOCKFILE` | `package.json`과 `pnpm-lock.yaml`이 서로 맞지 않습니다. | 온라인 PC에서 `pnpm install`로 락파일을 맞춘 뒤 B-4단계부터 진행합니다. |
| `pnpm: command not found` (또는 인식되지 않음) | pnpm이 설치되어 있지 않습니다. | A-1단계의 준비물을 설치합니다. |
| `node -v` 버전이 20.19 미만 | Node가 오래되었습니다. | Node 20.19 이상으로 올립니다. |
| 파일 경로가 너무 길다는 오류 (Windows) | 프로젝트가 깊은 폴더에 있습니다. | `C:\gulp`처럼 짧은 경로로 옮기고 `git config core.longpaths true`를 설정합니다. |
| 위 방법으로 해결되지 않을 때 | `offline-store/`가 손상되었을 수 있습니다. | 직접 수정하지 말고 온라인 PC에서 `pnpm run offline:fetch`로 다시 만들어 받습니다. |

## 사용상 주의점

1. **Node와 pnpm은 따로 설치되어 있어야 합니다.** 저장소에는 패키지만 들어 있고 Node와 pnpm은 없습니다.
   - Node 20.19 이상 (`sass`가 20.19 이상을 요구합니다. 검증은 22.22에서 했습니다.)
   - pnpm 10.x (10.28.0으로 만들고 검증했습니다. 다른 메이저 버전은 저장소 형식이 달라 검증하지 않았습니다.)
2. **지원 플랫폼 밖에서는 설치가 실패합니다.** `sharp`와 `@parcel/watcher`는 OS와 CPU별로 다른 네이티브 패키지를 씁니다. `pnpm-workspace.yaml`의 `supportedArchitectures`에 있는 범위(linux/macOS/Windows × x64/arm64 × glibc/musl)만 들어 있습니다. 범위를 바꾸면 `pnpm run offline:fetch`를 다시 실행하세요.
3. **락파일과 `offline-store/`가 어긋나면 설치가 실패합니다.** 락파일을 바꾸는 경우는 패키지 업데이트가 필요할 때에 한하며, 이때는 반드시 `pnpm run offline:fetch`를 실행해서 `offline-store/`를 함께 갱신하세요. 그렇지 않으면 `ERR_PNPM_NO_OFFLINE_TARBALL`이 납니다. 락파일을 바꾸는 커밋에는 `offline-store/` 변경을 반드시 함께 넣으세요.
4. **`pnpm install`, `pnpm add`, `pnpm update`를 그대로 쓰지 마세요.** 네트워크를 쓰려고 시도하고, 오프라인에서는 실패하거나 락파일을 바꿀 수 있습니다. 오프라인 PC에서는 `pnpm run offline:install`만 사용합니다. 패키지 추가와 갱신은 온라인 PC에서 하고 저장소를 다시 만듭니다.
5. **Windows에서는 저장소를 짧은 경로에 두세요.** 저장소 안 파일의 상대 경로가 최대 158자입니다. Windows의 경로 길이 제한은 260자라서 `C:\gulp`처럼 짧은 위치에 풀고, git을 쓴다면 `git config core.longpaths true`를 설정하세요.
6. **줄바꿈 변환이 일어나면 설치가 실패합니다.** pnpm은 저장소 파일의 해시로 무결성을 검사합니다. Windows의 `core.autocrlf`가 파일을 바꾸면 깨지므로 `.gitattributes`의 `offline-store/** -text -diff` 설정을 지우지 마세요. 압축 파일로 옮길 때도 줄바꿈을 변환하는 도구는 쓰지 마세요.
7. **`offline-store/` 파일을 직접 수정하거나 삭제하지 마세요.** 해시 이름으로 저장된 파일이라 일부만 바뀌어도 설치가 실패합니다. 문제가 있으면 `pnpm run offline:fetch`로 다시 만듭니다.
8. **`node_modules/`를 복사해서 옮기지 마세요.** 네이티브 패키지가 플랫폼에 종속되어 다른 OS에서는 동작하지 않습니다. 항상 대상 PC에서 `offline:install`을 실행합니다.
9. **용량이 큽니다.** 작업 폴더에서 약 289MB(파일 12,808개)이고, git에서는 약 93MB입니다. 가장 큰 파일이 19MB라서 GitHub의 파일당 100MB 제한에는 걸리지 않습니다. `offline:fetch`는 저장소를 처음부터 다시 만들기 때문에, 패키지가 그대로여도 `offline-store/v10/index/`의 인덱스 파일 651개가 시간 기록(`checkedAt`)만 바뀐 채로 "수정됨"으로 나옵니다(합계 약 2.4MB). 큰 패키지 파일은 같은 내용이면 이력에 다시 쌓이지 않고, 새로 필요한 패키지 파일만 추가됩니다.
10. **알려진 취약점도 락파일 그대로 들어 있습니다.** 이 저장소는 락파일을 고정해서 받아 둔 것이라 보안 갱신이 자동으로 반영되지 않습니다. `pnpm audit`는 온라인이 필요하므로 온라인 PC에서 확인하고, 갱신했다면 `offline:fetch`를 다시 실행하세요.
11. **이 저장소 범위는 gulp 빌드에 필요한 패키지입니다.** Node, pnpm, 브라우저는 포함하지 않습니다. `browser-sync`가 여는 브라우저는 오프라인 PC에 따로 있어야 합니다.

## 브랜치 운영 규칙

- `offline` 브랜치는 `dev`에서 분기했습니다. `main`과 `dev`에는 `offline-store/`를 넣지 않습니다.
- `dev`의 변경을 가져올 때는 `dev`를 `offline`에 머지한 뒤, 락파일이 바뀌었다면 `pnpm run offline:fetch`를 실행하고 함께 커밋합니다.
- 오프라인 환경 설정 자체(`offline-store/`, `scripts/offline-fetch.mjs`, `.gitattributes`, `supportedArchitectures`, `OFFLINE.md`)를 `dev`로 되돌려 머지하지 않습니다.

## 검증한 내용

- 패키지 하나를 추가한 뒤 `offline:fetch`로 저장소를 다시 만들고, 네트워크를 차단한 상태에서 `offline:install`이 되는 것까지 B 절차를 실제로 따라 해서 확인했습니다. 이때 바뀐 파일은 `package.json`, `pnpm-lock.yaml`, 인덱스 파일 651개였습니다.
- 네트워크를 차단한 상태(존재하지 않는 프록시 지정 + `--offline`)에서 새 폴더에 `offline:install` 후 `lintSass`, `compileSass`, `minifyScripts`, `html`, `sitemap`, 기본 태스크, `minimage`(sharp)가 통과했습니다.
- 검증 환경은 linux-x64, Node 22.22, pnpm 10.28.0입니다. macOS와 Windows에서는 실제 설치를 시험하지 못했습니다. 해당 플랫폼용 패키지가 저장소에 들어 있다는 것까지만 확인했습니다.
