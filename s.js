window.onload = function() {
    TimerHandler();

    setBackground();

    if (!document.getElementById("slideshowToggle").checked) {
        document.getElementById("searchbar").reset(); //reset the form, so that any previously typed text disappears


        var rand = Math.floor(Math.random() * 10);
        document.body.style.backgroundImage = 'url(resources/wallpapers/wallpaper_' + rand + '.jpg)'; //set a background, that will be replaced when the online one is loaded
        //document.getElementById("footerURL").setAttribute("href", 'resources/wallpapers/wallpaper_' + rand + '.jpg');
    }
};

function setBackground() {
    var img = new Image();

    var width = screen.width;
    var height = screen.height;

    img.src = generateBackgroundURL_natgeo_POTD();

    //img.src = generateBackgroundURL_picsum(width, height);
    //load image explaination website: https://stackoverflow.com/questions/14373683/how-to-show-image-only-when-it-is-completely-loaded

    img.onload = function() {
        document.body.style.backgroundImage = 'url(' + img.src + ')';
        //document.getElementById("footerURL").setAttribute("href", img.src);
    };

    // var body = document.getElementsByTagName('body')[0];
    // body.style.backgroundImage = urlPhoto;

}

var collection_global = -1; // if collection_global == -1, there is no collection number stored in the variable
function generateBackgroundURL_unsplash(width, height, collection) {
    if (height == undefined) {
        height = 1080;
    }
    if (width == undefined) {
        width = 1920;
    }

    if (collection == undefined) {
        collection = "random";
        collection_global = "unsplash";
    } else {
        collection_global = collection;
        collection = "collection/" + collection;
    }

    if (height == 0 || width == 0) {
        //if width or height don't matter create a link without them
        return "https://source.unsplash.com/" + collection;
    }

    return "https://source.unsplash.com/" + collection + "/" + width + "x" + height;

    // manual for building the link: https://source.unsplash.com/
    //nice collections: "1065396", "2281806" and "1065396"
}

function generateBackgroundURL_picsum(width, height) {
    if (height == undefined) {
        height = 1080;
    }
    if (width == undefined) {
        width = 1920;
    }

    collection_global = "picsum";

    return " https://picsum.photos/" + "/" + width + "/" + height + "/?random";

    // manual for building the link: https://picsum.photos/
}

function generateBackgroundURL_natgeo() {
    //somehow this function appears not to work anymore. Possibly this is caused by a change in the URLs on the natgeo website
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var year = today.getFullYear();
    var month;


    switch (mm) {
        case 3:
            month = 'december';
            year = year - 1;
            break;
        case 4:
            month = 'january';
            break;
        case 5:
            month = 'february';
            break;
        case 6:
            month = 'march';
            break;
        case 7:
            month = 'april';
            break;
        case 8:
            month = 'may';
            break;
        case 9:
            month = 'june';
            break;
        case 10:
            month = 'july';
            break;
        case 11:
            month = 'august';
            break;
        case 12:
            month = 'september';
            break;
        case 1:
            month = 'october';
            year = year - 1;
            break;
        case 2:
            month = 'november';
            year = year - 1;
            break;

    }

    var numPhoto = dd % 9 + 1;
    var urlPhoto = 'https://www.nationalgeographic.com/content/dam/photography/rights-exempt/best-of-photo-of-the-day/' + year + '/' + month + '/0' + numPhoto + '_best-pod-' + month + '-' + (year - 2000) + '.adapt.1900.1.jpg';

    // https://www.nationalgeographic.com/content/dam/photography/rights-exempt/best-of-photo-of-the-day/2018/march/04_best-pod-march-18.adapt.1900.1.jpg
    //document.getElementById('output').innerHTML = 'https://www.nationalgeographic.com/content/dam/photography/rights-exempt/best-of-photo-of-the-day/'+year + '/'+month +'/0'+ numPhoto + '_best-pod-'+ month+ '-'+ (year-2000)+'.adapt.1900.1.jpg';
    return urlPhoto;
}

function generateBackgroundURL_natgeo_POTD() {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://www.nationalgeographic.com/photography/photo-of-the-day/_jcr_content/.syndication-gallery.json');

    xhr.responseType = 'json';

    xhr.send();

    var json_obj = null;
    xhr.onload = function() {
        var numImage = 0;
        //numImage = Math.floor(Math.random() * 20);

        var img = new Image();

        json_obj = xhr.response;

        img.src = json_obj.items[numImage].renditions[2].uri;
        //load image explaination website: https://stackoverflow.com/questions/14373683/how-to-show-image-only-when-it-is-completely-loaded

        img.onload = function() {
            document.body.style.backgroundImage = 'url(' + img.src + ')';
            //document.getElementById("footerURL").setAttribute("href", img.src);
        };

        document.getElementById("image_info").setAttribute("style", "    background: rgb(0, 162, 255, 1);");

        var infoText = json_obj.items[numImage].title + ': ' + json_obj.items[numImage].caption;

        document.getElementById("image_info").innerHTML = infoText;

        return;
    };

    // var yourUrl = 'https://www.nationalgeographic.com/photography/photo-of-the-day/_jcr_content/.syndication-gallery.json';
    // var json_obj = JSON.parse(GetJSON(yourUrl));

    //var numImage = 0;
    //numImage = Math.floor(Math.random() * 20);

    //document.getElementById("image_info").innerHTML = json_obj.items[numImage].altText;

    return;
}

var myVar;

function TimerHandler() {
    if (document.getElementById("slideshowToggle").checked) {
        myVar = setInterval(refresh, 10000);
    } else {
        clearInterval(myVar);
        document.getElementById("shortcutContainer").style.visibility = "visible";
    }
};

function refresh() {
    window.location.reload();
};

var commandlist = ["/open directory", "/od", "/open dir",
    "/show collection number", "/show col number", "/show collection num", "/show col num", "/show collection", "/open collection", "/show col", "/open col",
    "/open manual", "/show manual",
    "/about"
];
var commandlist_alternative = [];

function isCommand(str) {
    for (var i = 0; i < commandlist.length; i++) {
        if (str.trim() == commandlist[i].trim()) {
            return commandlist[i]; //==true
        }
    }

    for (var i = 0; i < commandlist.length; i++) //also check the commands if the words 'open' or 'show' are not entered
    {
        //remove 'open' and/or 'show' from the entered string
        commandlist_alternative[i] = removeFromString(commandlist[i], "open").trim();
        commandlist_alternative[i] = removeFromString(commandlist_alternative[i], "show").trim();

        //remove a possible space directly after the '/' as the space should not be there
        commandlist_alternative[i] = commandlist_alternative[i].substr(1, commandlist_alternative[i].length - 1);
        commandlist_alternative[i] = commandlist_alternative[i].trim();
        commandlist_alternative[i] = "/" + commandlist_alternative[i];

        if (str.trim() == commandlist_alternative[i].trim()) {
            return commandlist[i]; //== true
        }
    }
    return -1; //== false
}

function executeCommand(str) {
    switch (str.trim()) {
        case "/open directory":
        case "/open dir":
        case "/od":
            //create string to copy to clipboard
            var path = location.href;
            var whatToRemove = "MyStartpage.html";
            var begin = path.search(whatToRemove);
            path = removeFromString(path, begin, path.length);
            path = removeFromString(path, "file:///");
            path = path.replace("%20", " ");

            //copy path to clipboard
            copyToClipboard(path);
            alert("this page's path has been copied to the clipboard succesfully!")

            //open the directory in the browser
            //document.getElementById("jslink").setAttribute("href", ".");
            //document.getElementById("jslink").click();
            break;
        case "/show collection number":
        case "/show col number":
        case "/show collection num":
        case "/show col num":
            if (collection_global == -1) {
                alert("The background image is not chosen from a collection on 'Unsplash.com'.");
            } else {
                var msg = "The number of the collection is " + collection_global;
                alert(msg);
            }
            break;
        case "/show collection":
        case "/open collection":
        case "/show col":
        case "/open col":
            if (collection_global == "picsum") {
                var url = "https://picsum.photos/images";
                openInNewTab(url);
            }
            if (collection_global == -1) {
                alert("The background image is not chosen from a collection on 'Unsplash.com'.");
            } else {
                var url = "https://unsplash.com/collections/" + collection_global;
                openInNewTab(url);
            }
            break;
        case "/open manual":
        case "/show manual":
            var url = "./documentation/manual.txt";
            openInNewTab(url);
            break;
        case "/about":
            var url = "./documentation/about.txt";
            openInNewTab(url);
            break;
    }
    return;
}

function copyToClipboard(text) {
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute('value', text);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

function removeFromString(str, begin, end) //str is the string of which a part has to be removed; if both begin and end are defined, it will remove the part of the string between begin and end; if only the begin param is entered && it is a string, the string wil be removed from str
{
    if (isString(begin) && end == undefined) {
        //remove the word that is entered in 'begin' from 'str'
        start = str.search(begin);
        var finish = start + begin.length;

        if (start == -1) {
            //there is nothing to remove, so just return the original string
            return str;
        } else {
            //remove the part of the string
            return removeFromString(str, start, finish);
        }
    } else //remove the part of str between 'begin' and 'end' if they have a compatible integer value
    {
        if (begin > end) //swap the values of begin and and so that begin will always be smaller than end
        {
            var tmp = begin;
            begin = end;
            end = tmp;
        }

        if (begin >= 0 && end <= str.length && begin != end && begin < end) // check whether the values of begin and end are compatible
        {
            str = str.substr(0, begin) + str.substr(end, str.length - 1);

            return str;
        } else {
            return str; // just return the original string if the values are incompatible
        }

    }
}

var isdropdownhovered = false;

function BtnStyleOnDropdownHover(id) {
    if (isdropdownhovered == false) {
        document.getElementById(id).setAttribute("style", "    width: 120px;    height: 120px;    border: 5px solid rgb(0, 162, 255);    opacity: 1; border-radius: 56px 56px 0px 0px;");
        isdropdownhovered = true;
    } else {
        document.getElementById(id).setAttribute("style", "        width: 120px;        height: 120px;        border-radius: 56px;        background-color: white;        opacity: 0.25;");
        isdropdownhovered = false;
    }
}

function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function isString(x) {
    return Object.prototype.toString.call(x) === "[object String]"
}
