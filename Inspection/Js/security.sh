#!/bin/bash

. config.sh

echo "#################################################"
echo "Start js security inspection"
echo "#################################################"

# JS code inspection
grep -rlni "onafterprint=\|onbeforeprint=\|onbeforeunload=\|onerror=\|onhaschange=\|onload=\|onmessage=\|onoffline=\|ononline=\|onpagehide=\|onpageshow=\|onpopstate=\|onredo=\|onresize=\|onstorage=\|onund=o\|onunload=\|onblur=\|onchage=\|oncontextmenu=\|onfocus=\|onformchange=\|onforminput=\|oninput=\|oninvalid=\|onreset=\|onselect=\|onsubmit=\|onkeydown=\|onkeypress=\|onkeyup=\|onclick=\|ondblclic=k\|ondrag=\|ondragend=\|ondragenter=\|ondragleave=\|ondragover=\|ondragstart=\|ondrop=\|onmousedown=\|onmousemove=\|onmouseout=\|onmouseover=\|onmouseup=\|onmousewheel=\|onscroll=\|onabor=t\|oncanplay=\|oncanplaythrough=\|ondurationchange=\|onemptied=\|onended=\|onerror=\|onloadeddata=\|onloadedmetadata=\|onloadstart=\|onpause=\|onplay=\|onplaying=\|onprogress=\|onratechange=\|onreadystatechange=\|onseeked=\|onseeking=\|onstalled=\|onsuspend=\|ontimeupdate=\|onvolumechange=" --include=*.js ${ROOT_PATH}/jsOMS >> ${INSPECTION_PATH}/Framework/critical_js.log
grep -rlni "onafterprint=\|onbeforeprint=\|onbeforeunload=\|onerror=\|onhaschange=\|onload=\|onmessage=\|onoffline=\|ononline=\|onpagehide=\|onpageshow=\|onpopstate=\|onredo=\|onresize=\|onstorage=\|onund=o\|onunload=\|onblur=\|onchage=\|oncontextmenu=\|onfocus=\|onformchange=\|onforminput=\|oninput=\|oninvalid=\|onreset=\|onselect=\|onsubmit=\|onkeydown=\|onkeypress=\|onkeyup=\|onclick=\|ondblclic=k\|ondrag=\|ondragend=\|ondragenter=\|ondragleave=\|ondragover=\|ondragstart=\|ondrop=\|onmousedown=\|onmousemove=\|onmouseout=\|onmouseover=\|onmouseup=\|onmousewheel=\|onscroll=\|onabor=t\|oncanplay=\|oncanplaythrough=\|ondurationchange=\|onemptied=\|onended=\|onerror=\|onloadeddata=\|onloadedmetadata=\|onloadstart=\|onpause=\|onplay=\|onplaying=\|onprogress=\|onratechange=\|onreadystatechange=\|onseeked=\|onseeking=\|onstalled=\|onsuspend=\|ontimeupdate=\|onvolumechange=" --include=*.js ${ROOT_PATH}/Modules >> ${INSPECTION_PATH}/Modules/critical_js.log
grep -rlni "onafterprint=\|onbeforeprint=\|onbeforeunload=\|onerror=\|onhaschange=\|onload=\|onmessage=\|onoffline=\|ononline=\|onpagehide=\|onpageshow=\|onpopstate=\|onredo=\|onresize=\|onstorage=\|onund=o\|onunload=\|onblur=\|onchage=\|oncontextmenu=\|onfocus=\|onformchange=\|onforminput=\|oninput=\|oninvalid=\|onreset=\|onselect=\|onsubmit=\|onkeydown=\|onkeypress=\|onkeyup=\|onclick=\|ondblclic=k\|ondrag=\|ondragend=\|ondragenter=\|ondragleave=\|ondragover=\|ondragstart=\|ondrop=\|onmousedown=\|onmousemove=\|onmouseout=\|onmouseover=\|onmouseup=\|onmousewheel=\|onscroll=\|onabor=t\|oncanplay=\|oncanplaythrough=\|ondurationchange=\|onemptied=\|onended=\|onerror=\|onloadeddata=\|onloadedmetadata=\|onloadstart=\|onpause=\|onplay=\|onplaying=\|onprogress=\|onratechange=\|onreadystatechange=\|onseeked=\|onseeking=\|onstalled=\|onsuspend=\|ontimeupdate=\|onvolumechange=" --include=*.js ${ROOT_PATH}/Web >> ${INSPECTION_PATH}/Web/critical_js.log

# JS strict type
grep -r -L "\"use strict\";" --include=*.js ${ROOT_PATH}/jsOMS > ${INSPECTION_PATH}/Framework/strict_missing_js.log
grep -r -L "\"use strict\";" --include=*.js ${ROOT_PATH}/Modules > ${INSPECTION_PATH}/Modules/strict_missing_js.log
grep -r -L "\"use strict\";" --include=*.js ${ROOT_PATH}/Web > ${INSPECTION_PATH}/Web/strict_missing_js.log
grep -r -L "\"use strict\";" --include=*.js ${ROOT_PATH}/Model > ${INSPECTION_PATH}/Model/strict_missing_js.log