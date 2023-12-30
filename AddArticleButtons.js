/**
 * 문서 메뉴에 버튼을 추가하는 기능을 추가합니다.
 *
 * @class AddArticleButtons
 * @typedef {AddArticleButtons}
 */
class AddArticleButtons {

    /**
     * @constructor
     * @param {string} selector
     */
    constructor(selector) {
        this.menuitem = document.querySelector(selector);
    }

    /**
     * Add Button
     *
     * @param {string} buttontitle
     * @param {string} buttonname
     * @param {string|function} callbackOrUrl
     */
    AddItem (buttontitle, buttonname, callbackOrUrl) {
        let newItem = this.menuitem.cloneNode(true);
        this.menuitem.after(newItem);

        if (newItem.nodeName != "A") {
            newItem.innerHTML = "";
            let linkItem = document.createElement('a');
            newItem.append(linkItem);
            newItem = linkItem;
        }

        newItem.innerHTML = buttonname;
        newItem.accessKey = '';
        newItem.style.cursor = 'pointer';
        newItem.title = buttontitle;

        
        try {
            newItem.href = new URL(callbackOrUrl);
        } catch (e) {
            newItem.href = 'javascript:;'; // 'Invalid URL'
            newItem.onclick = callbackOrUrl;
            return;
        }
    };
}


/**
 * ArticleButton Selector
 */
var skinContentTool = {
    ['liberty']: ".content-tools .dropdown-item:last-child",
    ['timeless']: ".mw-portlet-body #ca-move.mw-list-item"
};

window.extendedArticleButtons = new AddArticleButtons(skinContentTool[mw.config.get('skin')]);
