# CookieBar 

An angularjs directive to manage cookie consent with a bar


Live demo and documentation on http://sergioska.github.io/CookieBar/

## Quick start

# Install via Bower
``` sh
bower install cookie-bar --save
```

# Clone repository
``` sh
git clone https://github.com/sergioska/CookieBar.git
cd CookieBar
bower install
npm install
grunt client
```

# Test
``` sh
grunt test
```

# Using

Include the required bower component:
``` html
	<script type="text/javascript" src="bower_components/js/cookie-bar/cookie-bar.js"></script>
```

Inject the `Gui2DComponents` module into your app:
``` JavaScript
angular.module('myApp', ['CookieComponent']);
```

to use cookie bar component:

```html
		<cookie more-text="More information" close-text="Close" body-text="this site use cookies to ensure you get the best experience on our website." ng-model="cookie"></cookie>
```

Now you can manage dom node load throw model scope variable (in this case 'cookie'); for example:



```html
		<div ng-if="cookie">
			<p>If you see me, you have accepted cookie!</p>
		</div>
```

