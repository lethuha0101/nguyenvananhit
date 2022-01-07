// Core theme layout init
class ThemeLayout {
    listMapLayout = {};
    mainElement = null;
    constructor(listMapLayout, listJavascriptLoad, mainElement)
    {
        this.listMapLayout = listMapLayout;
        this.listJavascriptLoad = listJavascriptLoad;
        this.mainElement = mainElement;
        this.initTheme();
    }

    initTheme()
    {

        this.listMapLayout.forEach(itemMap => {
            CallerHelper.getHtmlContent(APPCONFIG[itemMap.name + "_PATH"]).then((html) => {
                itemMap.content = html;
                itemMap.done = true;
                if(this.checkIsLoadingAll()) 
                {
                    this.actionInit();
                }
            })
        });
    }

    actionInit()
    {
        this.listMapLayout.forEach(itemMap => {
            var frag = document.createRange().createContextualFragment(itemMap.content);
            if(itemMap.position == "header")
            {
                this.mainElement.insertBefore(frag, this.mainElement.childNodes[0]);
            }
            if(itemMap.position == "footer")
            {
                this.mainElement.append(frag);
            }
        });
        setTimeout(() => {
            this.listJavascriptLoad.forEach(itemMap => {
                var scriptElement = document.createElement("script");
                scriptElement.src = itemMap;
                document.body.appendChild(scriptElement);
            });
        }, 1000);
    }

    checkIsLoadingAll()
    {
        var countDone = 0;
        this.listMapLayout.forEach(itemMap => {
            if(itemMap.done === true)
            {
                countDone ++;
            }
        });
        if(countDone == this.listMapLayout.length)
        {
            return true;
        }
        return false;
    }
}