@echo off

echo Start time %time%
call yarn clean
call electron-packager . PatManPlus --platform=win32 --icon=logo.ico --ignore="\/fixtures\/|\/spec\/|\/test\/|\.mdb|\/faker\/|build\/PatMan" --out=build --overwrite
echo End time %time%