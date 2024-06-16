# Gulp5 update

- 시작: `npx gulp`
- HTML 생성 및 관리: `Nunjucks`
- 이미지 압축: `npx gulp minimage`
- SiteMap 생성: `npx gulp generatemap`

# TODO

- [x] gulp 5 업데이트
- [x] minimage 적용
- [x] notify 적용
- [x] htmlhint 적용
- [x] html include 방식을 Nunjucks로 변경
- [x] stylelint 충돌 해결
- [x] tailwind 적용
- [x] sitemap 생성 적용
- [ ] csscomb 충돌 해결: tailwind 적용시 comb와 충돌
- [ ] markuplint 적용: 테스트중
- [ ] yarn offline 패키지 설정

# git config

## git config setting

- `.git` 폴더안의 `config` 파일 수정
- `alias`, `commit` 속성 추가

## git config alias

```
[alias]
  # glog = log --pretty='format:%C(yellow)%h %C(green)%cd %C(reset)%s %C(red)%d %C(cyan)[%an]' --date=format:'%c' --all --graph
	# logline = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
	glog = log --pretty='format:%C(yellow)%h%x09%C(green)%cs %C(reset)%s %C(red)%d %C(cyan)[%an]' --date=format:'%c' --all --graph
	llog = log --pretty='format:%C(yellow)%h %C(reset)%Cgreen(%cr) %C(reset) %s %C(red)%d %C(cyan)[%an]%Creset' --abbrev-commit
	lg = log --graph --abbrev-commit --decorate --date=relative --format=format:'%C(bold red)%h%C(reset) : %C(bold green)(%ar)%C(reset) - %C(cyan)<%an>%C(reset)%C(bold yellow)%d%C(reset)%n%n%w(90,1,2)%C(white)%B%C(reset)%n'
	plog = log --pretty='format:%C(yellow)%h %C(green)%cd %C(reset)%s %C(red)%d %C(cyan)[%an]' --date=iso
[commit]
	template = .gitmessage.txt
```
