#!/bin/bash

. "${BUILD_PATH}/config.sh"

echo "#################################################"
echo "Start html tags inspection"
echo "#################################################"

# Html tag inspection
TAG[0]="<\/html>"
TAG[1]="<\/body>"
TAG[2]="<\/head>"
TAG[3]="<\/thead>"
TAG[4]="<\/tbody>"
TAG[5]="<\/tfoot>"
TAG[6]="<\/tr>"
TAG[7]="<\/th>"
TAG[8]="<\/td>"
TAG[9]="<\/option>"
TAG[10]="<\/li>"
TAG[11]="<br\s*\/>"
TAG[12]="<meta.*\/>"
TAG[13]="<input.*\/>"
TAG[14]="<hr.*\/>"
TAG[15]="<img.*\/>"
TAG[16]="<link.*\/>"
TAG[17]="<source.*\/>"
TAG[18]="<embed.*\/>"

for i in "${TAG[@]}"
do
    grep -rln "$i" --include \*.tpl.php ${INSPECTION_PATH} >> ${OUTPUT_PATH}/html_tags.log
done
