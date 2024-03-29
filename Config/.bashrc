alias push="git push --recurse-submodules=on-demand"
alias test="php -dpcov.enabled=1 vendor/bin/phpunit --configuration tests/phpunit_default.xml"
alias fulltest="./Build/Helper/testreport.sh"
alias phpcs="./vendor/bin/phpcs --severity=1 ./ --standard=\"Build/Config/phpcs.xml\""
alias phpstan="./vendor/bin/phpstan analyse -l 9 -c Build/Config/phpstan.neon ./"