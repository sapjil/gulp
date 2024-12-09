# Gulp5 update

- 시작: `npx gulp`
- HTML 생성 및 관리: `Nunjucks`
- 이미지 압축: `npx gulp minimage`
- SiteMap 생성: `npx gulp sitemap`

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
- [ ] yarn offline 패키지 설정

## tailwind 사용여부 설정

```shell
# gulpfile.js
# postcss 플러그인 tailwindcss() 옵션 추가 또는 제거
const compileSass = (done) => {
  gulp
    .pipe(
      postcss([stylelint(), tailwindcss(), autoprefixer({ csscade: false })]),
    )
  done();
};
```

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
