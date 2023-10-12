@echo off
git checkout production && git merge development && git push origin production

echo "... All done! Press spacebar to go back to branch development"
pause

git checkout development

pause