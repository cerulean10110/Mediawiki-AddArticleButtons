# Mediawiki-AddArticleButtons

This script add some functions to article tools.

# Usage
## For Site Admin
* Add This Line to common.js or gadget of your wiki.
```javascript
// common.js or gadget js
mw.loader.getScript('https://cdn.jsdelivr.net/gh/cerulean10110/Mediawiki-AddArticleButtons@main/AddArticleButtons.js');
```

## For Wiki User
* User should add code below to user's [common.js](https://examplewiki.com/w/index.php?title=User:Your_wikiuser_Name/common.js&action=edit)

```javascript
jQuery( document ).ready( function() {
    mw.loader.load('https://examplewiki.com/w/index.php?title=User:Your_wikiuser_Name/addArticleButtons-func.js&action=raw&ctype=text/javascript');
});
```

* And, You can add some function or url you want. Each user should add the code like below to user's [addArticleButtons-func.js](https://examplewiki.com/w/index.php?title=User:Your_wikiuser_Name/addArticleButtons-func.js&action=edit).

example
```javascript
// url
// AddItem(buttonLabel, buttonTitle, urlstring)
if (mw.config.get('wgPageContentModel') == 'wikitext') {

    let veLink = new URL(location);
    veLink.search = new URLSearchParams({ 'title': mw.config.get('wgPageName'), 'veaction': 'edit' });

    window.extendedArticleButtons.AddItem('Visual Editor', 'Visual Editor', veLink.toString());
}
// function
// AddItem(buttonLabel, buttonTitle, function)
window.extendedArticleButtons.AddItem('hello world', 'hello world', function() {
	alert("hello world");
});
```
