@echo off
set "project=easyDevanagari"


set "backupfolder=..\.____Backups\%project%_backups\"
echo node_modules>__exclusions.txt
echo __exclusions.txt>>__exclusions.txt

for /f %%I in ('wmic os get localdatetime ^|find "20"') do set dd=%%I
echo %dd%
set dd=%dd:~6,2%-%dd:~4,2%-%dd:~0,4%
set dt=%time:~0,-6%
set dt=%dt::=.%

echo Target = %backupfolder%%project% %dd% %dt%\
xcopy /E /Q /I /EXCLUDE:__exclusions.txt "*.*" "%backupfolder%%project% %dd% %dt%\"
del /F /Q __exclusions.txt
