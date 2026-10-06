# 오프라인 설치 가이드

이 문서는 `offline` 브랜치 전용입니다. `pnpm-lock.yaml`에 고정된 패키지를 `offline-store/`에 미리 받아 두어서, **인터넷이 없는 PC에서도 현재 패키지 버전 그대로 설치하고 빌드**할 수 있게 합니다.

## 사용 방법

### 오프라인 PC에서 설치

```shell
# 1) 저장소를 받는다 (git clone 또는 압축 파일 해제). 경로는 짧게 둔다. (주의점 5 참고)
# 2) 설치한다. 네트워크를 사용하지 않는다.
pnpm run offline:install

# 3) 빌드한다.
npx gulp
```

`pnpm run offline:install`은 `pnpm install --offline --frozen-lockfile --store-dir offline-store`를 실행합니다.

### 락파일을 바꾼 뒤 저장소 갱신 (온라인 PC에서)

```shell
pnpm install            # 패키지를 추가하거나 갱신해서 pnpm-lock.yaml 변경
pnpm run offline:fetch  # offline-store/ 를 처음부터 다시 생성
git add -A && git commit
```

`offline:fetch`는 `offline-store/`와 `node_modules/`를 지우고 `pnpm fetch`로 새로 받습니다.

## 사용상 주의점

1. **Node와 pnpm은 따로 설치되어 있어야 합니다.** 저장소에는 패키지만 들어 있고 Node와 pnpm은 없습니다.
   - Node 20.19 이상 (`sass`가 20.19 이상을 요구합니다. 검증은 22.22에서 했습니다.)
   - pnpm 10.x (10.28.0으로 만들고 검증했습니다. 다른 메이저 버전은 저장소 형식이 달라 검증하지 않았습니다.)
2. **지원 플랫폼 밖에서는 설치가 실패합니다.** `sharp`와 `@parcel/watcher`는 OS와 CPU별로 다른 네이티브 패키지를 씁니다. `pnpm-workspace.yaml`의 `supportedArchitectures`에 있는 범위(linux/macOS/Windows × x64/arm64 × glibc/musl)만 들어 있습니다. 범위를 바꾸면 `pnpm run offline:fetch`를 다시 실행하세요.
3. **락파일과 `offline-store/`가 어긋나면 설치가 실패합니다.** `pnpm-lock.yaml`을 바꾸고 `offline:fetch`를 실행하지 않으면 `ERR_PNPM_NO_OFFLINE_TARBALL`이 납니다. 락파일을 바꾸는 커밋에는 `offline-store/` 변경을 반드시 함께 넣으세요.
4. **`pnpm install`, `pnpm add`, `pnpm update`를 그대로 쓰지 마세요.** 네트워크를 쓰려고 시도하고, 오프라인에서는 실패하거나 락파일을 바꿀 수 있습니다. 오프라인 PC에서는 `pnpm run offline:install`만 사용합니다. 패키지 추가와 갱신은 온라인 PC에서 하고 저장소를 다시 만듭니다.
5. **Windows에서는 저장소를 짧은 경로에 두세요.** 저장소 안 파일의 상대 경로가 최대 158자입니다. Windows의 경로 길이 제한은 260자라서 `C:\gulp`처럼 짧은 위치에 풀고, git을 쓴다면 `git config core.longpaths true`를 설정하세요.
6. **줄바꿈 변환이 일어나면 설치가 실패합니다.** pnpm은 저장소 파일의 해시로 무결성을 검사합니다. Windows의 `core.autocrlf`가 파일을 바꾸면 깨지므로 `.gitattributes`의 `offline-store/** -text -diff` 설정을 지우지 마세요. 압축 파일로 옮길 때도 줄바꿈을 변환하는 도구는 쓰지 마세요.
7. **`offline-store/` 파일을 직접 수정하거나 삭제하지 마세요.** 해시 이름으로 저장된 파일이라 일부만 바뀌어도 설치가 실패합니다. 문제가 있으면 `pnpm run offline:fetch`로 다시 만듭니다.
8. **`node_modules/`를 복사해서 옮기지 마세요.** 네이티브 패키지가 플랫폼에 종속되어 다른 OS에서는 동작하지 않습니다. 항상 대상 PC에서 `offline:install`을 실행합니다.
9. **용량이 큽니다.** 작업 폴더에서 약 289MB(파일 12,808개)이고, git에서는 약 93MB입니다. 락파일이 바뀌면 새로 필요한 파일만 이력에 추가되므로 갱신할 때마다 전체 크기만큼 늘지는 않습니다. 가장 큰 파일이 19MB라서 GitHub의 파일당 100MB 제한에는 걸리지 않습니다.
10. **알려진 취약점도 락파일 그대로 들어 있습니다.** 이 저장소는 락파일을 고정해서 받아 둔 것이라 보안 갱신이 자동으로 반영되지 않습니다. `pnpm audit`는 온라인이 필요하므로 온라인 PC에서 확인하고, 갱신했다면 `offline:fetch`를 다시 실행하세요.
11. **이 저장소 범위는 gulp 빌드에 필요한 패키지입니다.** Node, pnpm, 브라우저는 포함하지 않습니다. `browser-sync`가 여는 브라우저는 오프라인 PC에 따로 있어야 합니다.

## 브랜치 운영 규칙

- `offline` 브랜치는 `dev`에서 분기했습니다. `main`과 `dev`에는 `offline-store/`를 넣지 않습니다.
- `dev`의 변경을 가져올 때는 `dev`를 `offline`에 머지한 뒤, 락파일이 바뀌었다면 `pnpm run offline:fetch`를 실행하고 함께 커밋합니다.
- 오프라인 환경 설정 자체(`offline-store/`, `scripts/offline-fetch.mjs`, `.gitattributes`, `supportedArchitectures`, `OFFLINE.md`)를 `dev`로 되돌려 머지하지 않습니다.

## 검증한 내용

- 네트워크를 차단한 상태(존재하지 않는 프록시 지정 + `--offline`)에서 새 폴더에 `offline:install` 후 `lintSass`, `compileSass`, `minifyScripts`, `html`, `sitemap`, 기본 태스크, `minimage`(sharp)가 통과했습니다.
- 검증 환경은 linux-x64, Node 22.22, pnpm 10.28.0입니다. macOS와 Windows에서는 실제 설치를 시험하지 못했습니다. 해당 플랫폼용 패키지가 저장소에 들어 있다는 것까지만 확인했습니다.
