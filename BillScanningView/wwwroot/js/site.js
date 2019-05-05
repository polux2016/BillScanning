// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.

function onFileChange(el)
{
    if(el.value && el.files[0]) {
        var image = el.files[0];
        el.form.submit();
        toDataURL(image, getPostRenderHendler(el));
    }
}

function getPostRenderHendler(el) {
    return function postRender (base64url, img) {
        var imgEl = el.parentElement.getElementsByClassName('background-img')[0];
        imgEl.src = base64url;
        var rectEl = el.parentElement.getElementsByClassName('rect-container')[0];
        renderTheGrid({
            rectEl: rectEl, 
            imgEl: imgEl, 
            img: img
        });
    }
}

function toDataURL(img, callback) {
    var fileReader = new FileReader();
    fileReader.onload = getFileReaderHandler(callback);
    fileReader.readAsDataURL(img);
}

function getFileReaderHandler(callback) {
    return function fileReaderHandler (fileLoadedEvent) {
        var img = new Image;
        img.onload = getImageHandler(img, callback)
        img.src = fileLoadedEvent.target.result; // is the data URL because called with readAsDataURL
    }
}

function getImageHandler(img, callback) {
    return function imageHandler() {
        callback(img.src, img);// image is loaded; sizes are available
    };
}

function renderTheGrid({imgEl, rectEl, img}) {
    var res = getResponse();
    var scale = getImageScale(imgEl, img);
    functionRemoveAllRects(rectEl);
    (res.items.regions || []).forEach(region => {
        renderRegions(region, scale, rectEl, res.selected);
    });
}

function renderRegions(region, scale, rectEl, selected) {
    if(!region) return;
    (region.lines || []).forEach(line => {
        (line.words || []).forEach(word => {
            if(word && IsNumber(word.text)) {
                var boundingBox = word.boundingBox.split(',');
                drowRectangle({
                    x: boundingBox[0] * scale.x - scale.xOffset,
                    y: boundingBox[1] * scale.y - scale.yOffset,
                    w: boundingBox[2] * scale.width,
                    h: boundingBox[3] * scale.height,
                    isSelected: word.boundingBox === selected,
                    rectEl: rectEl
                }); 
            }
        });
    });
}

function IsNumber(text) {
    return !isNaN(text.split(',').join('.'));
}

function getImageScale(imgEl, img) {
    var rect = imgEl.getBoundingClientRect();
    var scale = {
        xOffset: 0,
        yOffset: 0,
        x: 0,
        y: 0,
        height: rect.height / img.height,
        width: rect.width / img.width
    }
    if (scale.height < scale.width) {
        scale.x = scale.height;
        scale.y = scale.height;
        scale.xOffset = (img.width * rect.height / img.height - rect.width) / 2;
        scale.yOffset = 0;
    } else {
        scale.x = scale.width;
        scale.y = scale.width;
        scale.yOffset = (img.height * rect.width / img.width - rect.height) / 2;
        scale.xOffset = 0;
    }

    return scale; 
}
function getResponse() {
    var textResult = '{"language":"sr-Cyrl","textAngle":0.041887902047864509,"orientation":"Up","regions":[{"boundingBox":"715,370,924,242","lines":[{"boundingBox":"715,370,924,96","words":[{"boundingBox":"715,403,66,63","text":"ТОВ"},{"boundingBox":"812,404,309,62","text":"ТККО-РIШйП”,"},{"boundingBox":"1152,400,70,54","text":"ДЗС"},{"boundingBox":"1248,407,21,41","text":"з"},{"boundingBox":"1296,382,214,64","text":"магазином"},{"boundingBox":"1539,370,100,59","text":"КВ39"}]},{"boundingBox":"817,454,688,91","words":[{"boundingBox":"817,499,40,38","text":"м."},{"boundingBox":"887,487,45,50","text":"ки"},{"boundingBox":"941,489,56,56","text":"[в,"},{"boundingBox":"1027,493,69,43","text":"п-т"},{"boundingBox":"1121,478,93,53","text":"Песя"},{"boundingBox":"1241,467,186,65","text":"Курбаса,"},{"boundingBox":"1464,454,41,61","text":"1А"}]},{"boundingBox":"997,547,357,65","words":[{"boundingBox":"997,559,46,53","text":"пн"},{"boundingBox":"1068,547,286,63","text":"308410817164"}]}]},{"boundingBox":"488,704,765,1918","lines":[{"boundingBox":"629,704,272,62","words":[{"boundingBox":"629,704,162,62","text":"дяченко"},{"boundingBox":"816,708,85,54","text":"[1.М."}]},{"boundingBox":"622,782,591,72","words":[{"boundingBox":"622,782,70,56","text":"прк"},{"boundingBox":"716,785,159,61","text":"{3,крзн"},{"boundingBox":"900,783,64,63","text":"М,"},{"boundingBox":"996,784,217,70","text":"Резервуар"}]},{"boundingBox":"637,861,352,68","words":[{"boundingBox":"637,861,110,59","text":"33,61"},{"boundingBox":"776,873,21,43","text":"л"},{"boundingBox":"823,874,21,44","text":"х"},{"boundingBox":"871,862,118,67","text":"29,99"}]},{"boundingBox":"608,935,548,81","words":[{"boundingBox":"608,935,209,65","text":"Дизпаливо"},{"boundingBox":"846,943,310,73","text":"ДП-3-евро5-В0"}]},{"boundingBox":"608,1015,209,69","words":[{"boundingBox":"608,1015,88,69","text":"код:"},{"boundingBox":"726,1021,91,60","text":"9018"}]},{"boundingBox":"749,1186,89,113","words":[{"boundingBox":"749,1186,89,113","text":"ГРНЕ"}]},{"boundingBox":"673,1270,70,98","words":[{"boundingBox":"673,1270,70,98","text":"пђв"}]},{"boundingBox":"586,1445,222,70","words":[{"boundingBox":"586,1445,222,70","text":"ЕКВАйРИНГ"}]},{"boundingBox":"578,1603,71,61","words":[{"boundingBox":"578,1603,71,61","text":"ТРН"}]},{"boundingBox":"568,1685,172,65","words":[{"boundingBox":"568,1685,172,65","text":"FiShka:"}]},{"boundingBox":"562,1763,621,90","words":[{"boundingBox":"562,1763,198,67","text":"Учасник:"},{"boundingBox":"792,1778,147,68","text":"Андрјй"},{"boundingBox":"967,1788,216,65","text":"Полюхович"}]},{"boundingBox":"554,1839,699,103","words":[{"boundingBox":"554,1839,255,72","text":"НАРАХОВАНО"},{"boundingBox":"839,1858,167,66","text":"балами:"},{"boundingBox":"1187,1891,66,51","text":"грн"}]},{"boundingBox":"601,1920,477,88","words":[{"boundingBox":"601,1920,281,74","text":"Персональна"},{"boundingBox":"912,1957,166,51","text":"знижка:"}]},{"boundingBox":"702,2008,475,91","words":[{"boundingBox":"702,2008,127,64","text":"67:22"},{"boundingBox":"861,2031,69,53","text":"грн"},{"boundingBox":"966,2025,39,65","text":"(2"},{"boundingBox":"1037,2032,140,67","text":"грн/л)"}]},{"boundingBox":"531,2082,598,90","words":[{"boundingBox":"531,2082,215,71","text":"ДОСТУПНО"},{"boundingBox":"775,2094,175,71","text":"балами:"},{"boundingBox":"986,2109,143,63","text":"119,72"}]},{"boundingBox":"524,2169,655,97","words":[{"boundingBox":"524,2169,162,69","text":"БАЛАНС"},{"boundingBox":"716,2177,178,71","text":"балави:"},{"boundingBox":"932,2191,144,64","text":"186.94"},{"boundingBox":"1110,2212,69,54","text":"грн"}]},{"boundingBox":"507,2351,243,76","words":[{"boundingBox":"507,2351,79,76","text":"Код"},{"boundingBox":"619,2371,131,52","text":"квит."}]},{"boundingBox":"497,2446,497,80","words":[{"boundingBox":"497,2446,81,77","text":"код"},{"boundingBox":"613,2465,159,61","text":"автор,"},{"boundingBox":"836,2454,158,68","text":"846277"}]},{"boundingBox":"488,2542,279,80","words":[{"boundingBox":"488,2542,81,79","text":"Код"},{"boundingBox":"608,2561,159,61","text":"транс,"}]},{"boundingBox":"832,2549,312,69","words":[{"boundingBox":"832,2549,312,69","text":"905206099006"}]}]},{"boundingBox":"1464,965,218,594","lines":[{"boundingBox":"1464,965,218,71","words":[{"boundingBox":"1464,965,166,71","text":"1007,96"},{"boundingBox":"1659,970,23,61","text":"Б"}]},{"boundingBox":"1518,1341,138,64","words":[{"boundingBox":"1518,1341,138,64","text":"167,99"}]},{"boundingBox":"1489,1493,159,66","words":[{"boundingBox":"1489,1493,159,66","text":"1007,96"}]}]},{"boundingBox":"450,2742,1172,376","lines":[{"boundingBox":"646,2742,845,80","words":[{"boundingBox":"646,2742,197,80","text":"дякуено"},{"boundingBox":"876,2759,51,51","text":"за"},{"boundingBox":"958,2758,202,62","text":"покупи,"},{"boundingBox":"1193,2757,199,58","text":"заходьте"},{"boundingBox":"1424,2745,67,73","text":"це!"}]},{"boundingBox":"896,2836,575,85","words":[{"boundingBox":"896,2841,108,80","text":"дата"},{"boundingBox":"1034,2839,44,70","text":"21"},{"boundingBox":"1318,2836,74,67","text":"час"},{"boundingBox":"1423,2838,48,66","text":"06"}]},{"boundingBox":"462,2843,87,72","words":[{"boundingBox":"462,2843,87,72","text":"ЦЕК"}]},{"boundingBox":"1318,2919,304,82","words":[{"boundingBox":"1318,2933,48,68","text":"он"},{"boundingBox":"1397,2919,225,82","text":"3000250857"}]},{"boundingBox":"450,2941,494,81","words":[{"boundingBox":"450,2947,89,75","text":"док"},{"boundingBox":"551,2944,280,73","text":".±00625872"},{"boundingBox":"891,2941,53,70","text":"ЗН"}]},{"boundingBox":"567,3008,1040,110","words":[{"boundingBox":"567,3040,291,78","text":"ИСКАЉНИй"},{"boundingBox":"886,3042,84,73","text":"ЧЕК"},{"boundingBox":"1079,3008,528,96","text":"Д,еоСАё"}]}]}]}';
    return {
        items: JSON.parse(textResult),
        selected: "1464,965,166,71"
    };
}
function drowRectangle({rectEl, x, y, w, h, isSelected}) {
    var div = document.createElement('div');
    div.classList.add("rect");
    if(isSelected) {
       div.classList.add("selected")
    }
    div.classList.add("rect");
    div.style.width = Math.round(w) + 'px';
    div.style.height = Math.round(h) + 'px';
    div.style.top = Math.round(y) +'px';
    div.style.left = Math.round(x) + 'px';
    div.onclick = makeChoise;
    rectEl.appendChild(div);
}

function makeChoise(mouseEventArgs) {
//send answer to the server
//mouseEventArgs.target.classList.contains("rect")
//mouseEventArgs.target.classList.contains("selected")
}

function functionRemoveAllRects(parentEl) {
    if (parentEl.childElementCount) {
        parentEl.childNodes.forEach(element => {
           parentEl.removeChild(element); 
        });
    }
}


