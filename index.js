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

		var Component, _defaults, _uid;

		_uid = 0;

		/* Default settings
		----------------------------------------------- */
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

			this._eventData = {};
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

		/**
		 * Bind event handlers to DOM event using jQuery's on method while
		 * making sure the event handler's context is set to the class instance
		 * instead of the event target. Will return a unique id which can be used
		 * to unbind the event handler.
		 * @param  {jQuery}
		 * @param  {string}
		 * @param  {string} (optional)
		 * @param  {function}
		 * @return {string}
		 */
		Component.prototype._on = function ($el, event, selector, handler) {

			var eventData, uid, handlerWrapper;

			// shuffle arguments
			if(typeof selector === 'function') {
				handler = selector;
				selector = null;
			}

			// making sure that the event handler's this keyword is pointing to the
			// class instance instead of the event target. This way we're also creating
			// a unique event handler to unbind with later on.
			handlerWrapper = function () {
				handler.apply(this, arguments);
			};

			// using jQuery's on method to actually bind the event handler
			$el.on(event, selector, handlerWrapper);

			// create a map with all data needed to unbind the event
			eventData = {
				handler: handlerWrapper,
				$el: $el,
				event: event,
				selector: selector
			};

			uid = '_event' + (_uid ++);
			this._eventData[uid] = eventData;

			return uid;

		};

		/**
		 * Unbind event handlers bound with the _on method.
		 * @param  {string}
		 * @return {boolean}
		 */
		Component.prototype._off = function (uid) {

			var eventData, result;

			result = false;

			if(this._eventData.hasOwnProperty(uid)) {
				eventData = this._eventData[uid];
				eventData.$el.off(eventData.event, eventData.selector, eventData.handler);
				result = true;
			}

			return result;
		};


		/* Event handlers
		----------------------------------------------- */


		/* Export
		----------------------------------------------- */
		return Component;

	});

})(this);
