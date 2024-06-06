# gulp5 update

- 시작: `npx gulp`
- 이미지 압축: `npx gulp minimage`

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
