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
			events: {
				init: 'init.Component',
				destroy: 'destroy.Component'
			}
		};


		/* Constructor
		----------------------------------------------- */
		Component = function (el, options) {

			this._settings = $.extend(true, {}, _defaults, options);

			this._$el = $(el);

		};

		inherit(Component, Destroyable);


		/* Methods
		----------------------------------------------- */

		/**
		 * Initialise component.
		 * All bootstrap logic should go here.
		 * @return {void}
		 */
		Component.prototype.init = function () {
			this._superClass.init.call(this);
			this.getEl().trigger(this.getSettings().events.init);
		};

		/**
		 * Destroys the component.
		 * All teardown logic like removing event handlers and
		 * removing references to DOM elements should happen here.
		 * @return {void}
		 */
		Component.prototype.destroy = function () {
			this._superClass.destroy.call(this);
			this.getEl().trigger(this.getSettings().events.destroy);
		};

		/**
		 * Getter for _$el
		 * @return {jQuery}
		 */
		Component.prototype.getEl = function () {
			return this._$el;
		};

		/**
		 * Getter for _settings
		 * @return {Object}
		 */
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
