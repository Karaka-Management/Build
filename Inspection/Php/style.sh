#!/bin/bash

. config.sh

echo "#################################################"
echo "Start php style inspection"
echo "#################################################"

php ${ROOT_PATH}/vendor/bin/phpcs ${ROOT_PATH}/phpOMS --standard="${BUILD_PATH}/Config/phpcs.xml" -s --report-full=${INSPECTION_PATH}/Framework/phpcs.log --report-junit=${INSPECTION_PATH}/Framework/phpcs.xml
php ${ROOT_PATH}/vendor/bin/phpcs ${ROOT_PATH}/Web --standard="${BUILD_PATH}/Config/phpcs.xml" -s --report-full=${INSPECTION_PATH}/Web/phpcs.log --report-junit=${INSPECTION_PATH}/Web/phpcs.xml
php ${ROOT_PATH}/vendor/bin/phpcs ${ROOT_PATH}/Modules --standard="${BUILD_PATH}/Config/phpcs.xml" -s --report-full=${INSPECTION_PATH}/Modules/phpcs.log --report-junit=${INSPECTION_PATH}/Modules/phpcs.xml
php ${ROOT_PATH}/vendor/bin/phpcs ${ROOT_PATH}/Model --standard="${BUILD_PATH}/Config/phpcs.xml" -s --report-full=${INSPECTION_PATH}/Model/phpcs.log --report-junit=${INSPECTION_PATH}/Model/phpcs.xml

php ${ROOT_PATH}/vendor/bin/rector --dry-run --config ${BUILD_PATH}/Config/rector.php process ${ROOT_PATH}/phpOMS > ${INSPECTION_PATH}/Framework/rector.log
php ${ROOT_PATH}/vendor/bin/rector --dry-run --config ${BUILD_PATH}/Config/rector.php process ${ROOT_PATH}/Web > ${INSPECTION_PATH}/Modules/rector.log
php ${ROOT_PATH}/vendor/bin/rector --dry-run --config ${BUILD_PATH}/Config/rector.php process ${ROOT_PATH}/Modules > ${INSPECTION_PATH}/Modules/rector.log
php ${ROOT_PATH}/vendor/bin/rector --dry-run --config ${BUILD_PATH}/Config/rector.php process ${ROOT_PATH}/Web > ${INSPECTION_PATH}/Web/rector.log