/**
 * @typedef {Object} ButtonConfigs
 * @property {string} buttonTitle button title
 * @property {string} buttonLabel label
 * @property {string} callbackOrUrl callback or Url for button
 * @property {Array<string>} namespaces namespaces condition
 * @property {string} contentModel contentModel condition
 */

/**
 * 문서 메뉴에 버튼을 추가하는 기능을 추가합니다.
 *
 * @class AddArticleButtons
 */
class AddArticleButtons {
    /**
     * @param {string} cssSelector
     */
    constructor(cssSelector) {
        /** @private */
        this.menuitem = document.querySelector(cssSelector);
    }

    /**
     * 
     * @param {Element} element 
     */
    DuplicateButton(element, newLabel, newTitle) {
        let newItem = element.cloneNode(true);
        element.after(newItem);

        if (newItem.nodeName != "A") {
            newItem.innerHTML = "";
            const linkItem = document.createElement('a');
            newItem.append(linkItem);
            newItem = linkItem;
        }

        newItem.innerHTML = newLabel;
        newItem.title = newTitle;
        newItem.style.cursor = 'pointer';
        newItem.accessKey = '';

        return newItem;
    }

    /**
     * Add Button Item
     * @param {ButtonConfigs} buttonConfigs button configs
     */
    AddItem(buttonConfigs) {
        let newItem = this.DuplicateButton(this.menuitem, buttonConfigs.buttonLabel, buttonConfigs.buttonTitle);

        if (buttonConfigs.namespaces && !buttonConfigs.namespaces.includes(mw.config.get('wgCanonicalNamespace')))
            return;

        if (buttonConfigs.contentModel && buttonConfigs.contentModel != mw.config.get('wgPageContentModel'))
            return;

        try { // 'URL is valid.'
            newItem.href = new URL(buttonConfigs.callbackOrUrl);
        } catch { // 'URL is not valid.'
            newItem.href = 'javascript:;';
            newItem.onclick = buttonConfigs.callbackOrUrl;
            return;
        }
    };

    /**
     * 
     * @param {Array<ButtonConfigs>} objects 
     */
    AddItems(objects) {
        if (objects.length) {
            for (const element of objects) {
                this.AddItem(element)
            }
        }
    }
}

{
    /**
     * ArticleButton Selector
     */
    const skinContentTool = {
        ['liberty']: ".content-tools .dropdown-item:last-child",
        ['timeless']: ".mw-portlet-body #ca-move.mw-list-item"
    };

    window.extendedArticleButtons = new AddArticleButtons(skinContentTool[mw.config.get('skin')]);

}