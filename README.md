# Mediawiki-AddArticleButtons

This script add some functions to article tools.

* Add This Line to common.js or gadget of your wiki.
```javascript
mw.loader.getScript('https://cdn.jsdelivr.net/gh/cerulean10110/Mediawiki-AddArticleButtons/AddArticleButtons.js');
```
* And, You can add some function or url you want. Each user should add the code like below to their common.js.

example (common)
```javascript
mw.loader.load('/index.php?title=User:(Your wikiuser Name)/addArticleMenuItem-func.js&action=raw&ctype=text/javascript');
```

example (functions or urls you want)
```javascript
/// url
if (mw.config.get('wgPageContentModel') == 'wikitext') {

    let veLink = new URL(location);
    veLink.search = new URLSearchParams({ 'title': mw.config.get('wgPageName'), 'veaction': 'edit' });

    window.extendedArticleButtons.AddItem('Visual Editor', 'Visual Editor', veLink.toString());
}
/// function
window.extendedArticleButtons.AddItem('hello world', 'hello world', function() {
	alert("hello world");
});
```
