(function (window) {

	'use strict';

	// UMD
	if(typeof define !== 'function') {
		window.define = function( deps, definition ) {
			window.pintxos = window.pintxos || {};
			window.pintxos.Component = definition(jQuery);
			define = null;
		};
	}

	define(
	[
		'jquery'
	], function (
		$
	) {

		var Component, _uid;

		/* Vars
		----------------------------------------------- */
		_uid = 0;


		/* Constructor
		----------------------------------------------- */
		Component = function (el, options) {
			this._settings = $.extend(true, {}, Component.DEFAULTS, options);
			this._$el = $(el);

			this._eventData = {};
			this._queryCache = {};
			this._isDestroyed = true;

		};


		/* Constants
		----------------------------------------------- */
		Component.DEFAULTS = {
			events: {
				init: 'init.Component',
				destroy: 'destroy.Component'
			}
		};


		/* Methods
		----------------------------------------------- */

		/**
		 * Initialise component.
		 * All bootstrap logic should go here.
		 *
		 * @return {void}
		 */
		Component.prototype.init = function () {

			if(!this.isDestroyed()) {
				this.destroy();
			}

			this._isDestroyed = false;

			this.getEl().trigger(this.getSettings().events.init);
		};

		/**
		 * Destroys the component.
		 * All teardown logic like removing event handlers and
		 * removing references to DOM elements should happen here.
		 *
		 * @return {void}
		 */
		Component.prototype.destroy = function () {

			// unbind all event handlers
			this._off();

			// removing references to DOM element by clearing out the query cache
			this._clearQueryCache();

			this._isDestroyed = true;

			this.getEl().trigger(this.getSettings().events.destroy);
		};

		/**
		 * Getter for _isDestroyed
		 *
		 * @return {Boolean}
		 */
		Component.prototype.isDestroyed = function () {
			return this._isDestroyed;
		};

		/**
		 * Getter for _$el
		 *
		 * @return {jQuery}
		 */
		Component.prototype.getEl = function () {
			return this._$el;
		};

		/**
		 * Getter for _settings
		 *
		 * @return {Object}
		 */
		Component.prototype.getSettings = function () {
			return this._settings;
		};

		/**
		 * Bind handlers to DOM events using jQuery's on() method while
		 * making sure the event handler's context is pointing to the class instance
		 * instead of the event target. Will return a unique event handler id.
		 *
		 * @param  {jQuery}
		 * @param  {string}
		 * @param  {string} (optional)
		 * @param  {function}
		 *
		 * @return {string}
		 */
		Component.prototype._on = function ($el, event, selector, handler) {

			var eventData, uid, handlerWrapper, _self;

			_self = this;

			// shuffle arguments
			if(typeof selector === 'function') {
				handler = selector;
				selector = null;
			}

			// making sure that the event handler's this keyword is pointing to the
			// class instance instead of the event target. We're also creating
			// a unique event handler to unbind with later on.
			handlerWrapper = function () {
				handler.apply(_self, arguments);
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
		 * Unbind event handlers bound with the _on() method.
		 * If the uid parameter is omitted, all event handlers will be unbind.
		 *
		 * @param  {string} (optional)
		 *
		 * @return {void}
		 */
		Component.prototype._off = function (uid) {

			var eventData, key;

			if(typeof uid === 'undefined') {

				for(key in this._eventData) {
					this._off(key);
				}

			}else if(this._eventData.hasOwnProperty(uid)) {

				eventData = this._eventData[uid];
				eventData.$el.off(eventData.event, eventData.selector, eventData.handler);

				delete this._eventData[uid];
			}

		};

		/**
		 * Query for DOM elements using jQuery's query function
		 * while maintaining a cache to avoid unnecessary DOM queries.
		 *
		 * @param  {string}
		 * @param  {string|jQuery} (optional) defaults to the component's main element
		 * @param  {boolean} (optional) defaults to false
		 *
		 * @return {jQuery}
		 */
		Component.prototype._query = function (selector, context, forceQuery) {

			var $context, $result;

			// shuffle arguments
			if(typeof context === 'undefined' || typeof context === 'boolean') {
				forceQuery = context;
				context = this.getEl();
			}

			forceQuery = (typeof forceQuery === 'undefined') ? false : forceQuery;

			if(!this._queryCache.hasOwnProperty(selector) || forceQuery) {
				$context = (context instanceof jQuery) ? context : $(context);
				$result = $context.find(selector);
				this._queryCache[selector] = $result;
			}else{
				$result = this._queryCache[selector];
			}

			return $result;
		};

		/**
		 * Given a string, jQuery object, HTML Element or undefined, this method will
		 * always make sure to return a jQuery object. Very useful when trying to convert
		 * a settings property to a jQuery object.
		 *
		 * @param  {string|jQuery|string|undefined}
		 * @param {Boolean}
		 *
		 * @return {jQuery}
		 */
		Component.prototype._resolveElement = function (element, forceQuery) {

			var $result;

			$result = undefined;
			forceQuery = (typeof forceQuery !== 'undefined') ? forceQuery : false;

			if(element instanceof jQuery) {
				$result = element;
			}else if(typeof element === 'undefined') {
				$result = this.getEl();
			}else if(typeof element === 'string') {
				$result = this._query(element, forceQuery);
			}else if(element instanceof HTMLElement) {
				$result = $(element);
			}

			return $result;
		};

		/**
		 * Empty query cache
		 *
		 * @return {void}
		 */
		Component.prototype._clearQueryCache = function () {
			this._queryCache = {};
		};


		/* Export
		----------------------------------------------- */
		return Component;

	});

})(this);
