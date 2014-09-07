(function (window) {

	'use strict';

	// UMD
	if(typeof define !== 'function') {
		window.define = function( deps, definition ) {
			window.pintxos = window.pintxos || {};
			window.pintxos.Component = definition(jQuery, window.pintxos.Destroyable, window.pintxos.inherit);
			define = null;
		};
	}

	define(
	[
		'jquery',
		'pintxos-destroyable',
		'pintxos-inherit'
	], function (
		$,
		Destroyable,
		inherit
	) {

		var Component, _defaults;

		_defaults = {

		};


		/* Constructor
		----------------------------------------------- */
		Component = function (el, options) {

			this._settings = $({}, _defaults, options);
			this._$el = $(el);

		};

		inherit(Component, Destroyable);


		/* Methods
		----------------------------------------------- */

		Component.prototype.getEl = function () {
			return this._$el;
		};

		Component.prototype.getSettings = function () {
			return this._settings;
		};


		/* Event handlers
		----------------------------------------------- */


		/* Export
		----------------------------------------------- */
		return Component;

	});

})(this);
