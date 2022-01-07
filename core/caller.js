class CallerHelper
{
    static action(method, url, funcAction)
    {
        if (window.XDomainRequest) {
            this.callerIE8(method, url, funcAction);
        } else {
            this.callerCommon(method, url, funcAction);
        }
    }

    static callerIE8(method, url, funcAction)
    {
        var xdr = new XDomainRequest();
        xdr.timeout = 10000;
        xdr.onload = function () {
            funcAction(CallerHelper.parse(xdr.responseText));
        };
        xdr.open(method, APPCONFIG.DOMAIN_API + "/" + url + "?t=" + Math.floor(Date.now() / 1000));
        xdr.send();
    }

    static callerCommon (method, url, funcAction)
    {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                funcAction(CallerHelper.parse(this.responseText));
            }
        };
        xhttp.open(method, APPCONFIG.DOMAIN_API + "/" + url + "?t=" + Math.floor(Date.now() / 1000), true);
        xhttp.send();
    }

    static parse (content) 
    {
        try {
            return JSON.parse(content);
        } catch (error) {
            return content;
        }
    }

    static getHtmlContent(url)
    {
        return new Promise((resolve, reject) => {
            CallerHelper.action("GET", url, (data) => {
                resolve(data);
            });
        });
    }
}