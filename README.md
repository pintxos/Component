# Component

[![Build Status](https://travis-ci.org/pintxos/Component.svg?branch=master)](https://travis-ci.org/pintxos/Component)

Base layer to help you write reusable Javascript components using jQuery.

## Dependencies

The only hard dependecy is jQuery but you'll probably also want to include an inheritance helper to be able to subclass the pintxos component.

## Installation

Installation is currently only possible through bower or via download. I'm planning to add the package to NPM in the near future. For now only AMD and globals are supported.

```
bower install pintxos-component --save
```

### AMD
Assuming you've installed the package through bower and have set the bower_components directory as the base directory of your project. Please note that you should also create a path for jQuery, like describe [here](http://requirejs.org/docs/jquery.html) ...

``` javascript
define(
	[
		'pintxos-component/index', 
		'pintxos-inherit/index'
	],
	function (
		Component,
		inherit
	) {
		// do stuff ...
	}
);
```

### Globals

When using the pintxos component by including script tags, you'll notice that a pintxos object is added to the window object. 

``` html
	
	<script src="bower_components/jquery/dist/jquery.js"></script>
	<script src="bower_components/pintxos-component/index.js"></script>
	<script src="bower_components/pintxos-inherit/index.js"></script>

	<script>
		(function ($, Component, inherit) {

			// do stuff ...

		})(jQuery, pintxos.Component, pintxos.inherit);
	</script>
```


## Usage

Like mentioned before the pintxos Component is a base layer, it's not meant to be used on its own. I recommend to use an inheritance helper like [pintxos-inherit](https://github.com/pintxos/inherit) or [Heir](https://github.com/Wolfy87/Heir) to simplify subclassing the base component.

```javascript
	var MyComponent = function (el, options) {
		Component.call(this, el, options);
	};

	inherit(MyComponent, Component);

	MyComponent.prototype.init = function () {

		this._on(this._query('.btn-show'), 'click', this._onBtnClick);

		MyComponent._super.init.call(this);
	};

	MyComponent.prototype.show = function () {
		this._query('.content').show();
	};

	MyComponent.prototype._onBtnClick = function (e) {
		e.preventDefault();
		this.show();
	};

	return MyComponent;
```
### init / destroy

All pintxos components should have an init() and destroy() method. By default the base component already defines these methods. 

### Methods

#### init()
Triggers an init event on the main element 

#### destroy()
Cleans up selector references and ubinds event handlers. Also triggers a destroy event on the main element.

#### isDestroy()
Is this component destroy or what?

#### getEl()
Getter for the main element

#### getSettings()
Get all the settings ...

#### _on($el, event, selector (optional), handler)
Bind handlers to DOM events using jQuery's on() method while making sure the event handler's context is pointing to the class instance instead of the event target. Will return a unique event handler id.

#### _off(id (optional) )
Unbind event handlers bound with the _on() method. If the uid parameter is omitted, all event handlers will be unbind.

#### _query(selector, context (optional), forceQuery (optional))
Query for DOM elements using jQuery's query function while maintaining a cache to avoid unnecessary DOM queries.

#### _resolveElement
Given a string, jQuery object, HTML Element or undefined, this method will always make sure to return a jQuery object. Very useful when trying to convert a settings property to a jQuery object.

#### _clearQueryCache()
Clear the query cache which is used by the _query() method

All methods prefixed with an underscore (_on, _off, ...) are so called protected methods, only meant to be called from within the subclass and thus not directly on an instace.

