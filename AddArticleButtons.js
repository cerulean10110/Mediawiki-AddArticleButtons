/**
 * @typedef {Object} ButtonSettings
 * @property {string} buttonTitle - button title
 * @property {string} buttonLabel - label
 * @property {string} callbackOrUrl - callback or Url for button
 */

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
     * @param {string} buttonTitle
     * @param {string} buttonLabel
     * @param {string|function} callbackOrUrl
     */
    AddItem (buttonTitle, buttonLabel, callbackOrUrl) {
        let newItem = this.menuitem.cloneNode(true);
        this.menuitem.after(newItem);

        if (newItem.nodeName != "A") {
            newItem.innerHTML = "";
            const linkItem = document.createElement('a');
            newItem.append(linkItem);
            newItem = linkItem;
        }

        newItem.innerHTML = buttonLabel;
        newItem.title = buttonTitle;
        newItem.style.cursor = 'pointer';
        newItem.accessKey = '';

        try {
            newItem.href = new URL(callbackOrUrl); // 'If URL is valid'
        } catch (e) {
            newItem.href = 'javascript:;'; // 'If URL is inValid'
            newItem.onclick = callbackOrUrl;
            return;
        }
    };

    /**
     * 
     * @param {Array<ButtonSettings>} objects 
     */
    AddItems (objects) {
        if (objects.length) {
            for (const element of objects) {
                AddItem(element.buttonTitle, element.buttonLabel, element.callbackOrUrl)
            }
        }
    }
}

if (mw.config.get('wgIsArticle')) {
    /**
     * ArticleButton Selector
     */
    let skinContentTool = {
        ['liberty']: ".content-tools .dropdown-item:last-child",
        ['timeless']: ".mw-portlet-body #ca-move.mw-list-item"
    };
    
    window.extendedArticleButtons = new AddArticleButtons(skinContentTool[mw.config.get('skin')]);
}

