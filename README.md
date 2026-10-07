# Gulp5 update

- 시작: `npx gulp`
- HTML 생성 및 관리: `Nunjucks`
- SCSS 린트: `npx gulp lintSass` (기본 작업에 포함, 오류 시 빌드 중단)
- 이미지 압축: `npx gulp minimage`
- SiteMap 생성: `npx gulp sitemap`

# 프로젝트 기준

- **지원 브라우저**: `package.json`의 `browserslist`는 `defaults, not dead` 입니다. **IE11과 Android 4는 지원하지 않습니다.** 필요한 프로젝트는 `browserslist`에 `ie >= 11`, `Android >= 4`를 다시 추가하고 빌드하세요.
- **린트 오류는 빌드 중단**: SCSS(stylelint)와 JS(jshint) 린트 오류가 있으면 빌드가 중단됩니다. 빈 SCSS 파셜은 허용합니다.
- **JS 병합 순서**: `src/js/*.js`는 파일 경로 순으로 `all.js`에 병합됩니다. 순서가 필요하면 `01_`, `02_` 접두어를 붙이세요. `src/js/lib/`은 병합하지 않고 그대로 복사합니다.
- **외부 라이브러리**: 보안 권고가 없는 버전만 `src/js/lib/`에 둡니다. 현재 jQuery 3.5.1, jQuery UI 1.14.2 입니다. 추가하거나 올릴 때는 `npm audit`로 확인하세요.
- **Nunjucks 이스케이프 꺼짐**: `autoescape: false`입니다. 외부 입력을 템플릿에 넣지 마세요.
- **Tailwind 중단점**: `sm 480 / md 768 / lg 976 / xl 1440` 입니다. 기본값인 `2xl`은 없습니다.
- **프로젝트별 교체 필요**: `src/html/_templates/_json/_sitedata.json`의 `base_url`(`localhost`)과 사용하지 않는 더미 값(`fbAppId`, `gtm` 등)을 프로젝트에 맞게 바꾸세요. `npx gulp sitemap`의 `siteUrl`(`gulpfile.js`)도 `https://sapjil.net`로 고정되어 있습니다.
- **패키지 관리**: pnpm만 사용합니다.

# 오프라인 설치 (`offline` 브랜치)

인터넷이 없는 PC에서도 현재 패키지 버전 그대로 설치할 수 있도록 `offline-store/`를 포함한 브랜치입니다.

- 설치: `npm run offline:install`, 그 다음 `npx gulp` (Node만 있으면 됩니다. pnpm은 저장소에 포함되어 있습니다.)
- 패키지 업데이트가 필요한 경우(락파일을 바꾸는 경우는 이때에 한함): 온라인 PC에서 `npm run offline:fetch`로 저장소를 다시 만들고 함께 커밋
- 처음 쓰는 분을 위한 단계별 안내와 문제 해결도 `OFFLINE.md`에 있습니다.
- **사용상 주의점(Node/pnpm 버전, 지원 플랫폼, Windows 경로와 줄바꿈 등)은 [OFFLINE.md](./OFFLINE.md)를 반드시 읽으세요.**

# TODO

- [x] gulp 5 업데이트
- [x] minimage 적용
- [x] notify 적용
- [x] htmlhint 적용
- [x] html include 방식을 Nunjucks로 변경
- [x] stylelint 충돌 해결
- [x] tailwind 적용
- [x] sitemap 생성 적용
- [x] csscomb 충돌 해결(생성된 css에서 tailwind 영역은 미처리)
- [ ] markuplint 적용: 테스트중

## tailwind 사용여부 설정

```js
// gulpfile.js 의 compileSass
// postcss 플러그인 배열에서 tailwindcss() 를 추가 또는 제거
.pipe(postcss([tailwindcss(), autoprefixer()]))
```

- `src/scss/components/_tailwind.scss`의 `@tailwind` 지시어는 `tailwindcss()` 플러그인이 있어야 변환됩니다. 플러그인만 빼면 지시어가 그대로 CSS에 남으므로, 사용하지 않을 때는 `style.scss`의 `@use './components/tailwind';`도 함께 제거하세요.

# git config

## git config setting

- `.git` 폴더안의 `config` 파일 수정
- `alias`, `commit` 속성 추가

## git config alias

```
[alias]
  lg = log --graph --abbrev-commit --decorate --date=relative --format=format:'%C(bold red)%h%C(reset) : %C(bold green)(%ar)%C(reset) - %C(cyan)<%an>%C(reset)%C(bold yellow)%d%C(reset)%n%n%w(90,1,2)%C(white)%B%C(reset)%n'
	llog = log --pretty='format:%C(yellow)%h %C(green)%cd %C(reset)%s %C(red)%d %C(cyan)[%an]' --date=format-local:'%Y/%m/%d %H:%M:%S'
[commit]
	template = .gitmessage.txt
```
