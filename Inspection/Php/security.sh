#!/bin/bash

. "${BUILD_PATH}/config.sh"

echo "#################################################"
echo "Start php security inspection"
echo "#################################################"

# PHP code inspection
CODE[0]="file_get_content"
CODE[1]="fopen"
CODE[2]="include"
CODE[3]="require"
CODE[4]="file_put_content"
CODE[5]="fread"
CODE[6]="fwrite"
CODE[7]="fget"
CODE[8]="fput"
CODE[9]="chmod"
CODE[10]="eval"
CODE[11]="delete"
CODE[12]="mkdir"
CODE[13]="move_uploaded_file"
CODE[14]="mkdir"
CODE[15]="copy"
CODE[16]="chown"
CODE[17]="touch"
CODE[18]="exec"
CODE[19]="_GET"
CODE[20]="_POST"
CODE[21]="_SESSION"
CODE[22]="_REQUEST"
CODE[23]="_SERVER"
CODE[24]="_COOKIE"
CODE[25]="_FILES"
CODE[26]="unlink"
CODE[27]="action=\""
CODE[28]="ReflectionClass"
CODE[29]="TestUtils"

touch ${OUTPUT_PATH}/critical_php.log

for i in "${CODE[@]}"
do
    grep -rlni "$i" --include \*.php ${INSPECTION_PATH} >> ${OUTPUT_PATH}/critical_php.log
done

# PHP strict type
grep -r -L "declare(strict_types=1);" --include=*.php --exclude={*.tpl.php,*Hooks.php,*Routes.php,*SearchCommands.php} ${INSPECTION_PATH} > ${OUTPUT_PATH}/strict_missing_php.log || true
