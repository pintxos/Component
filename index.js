(function (window) {

	'use strict';

	// UMD
	if(typeof define !== 'function') {
		window.define = function( deps, definition ) {
			window.pintxos = window.pintxos || {};
			window.pintxos.Component = definition();
			define = null;
		};
	}

	define([], function () {

		'use strict';

		/* Constructor
		----------------------------------------------- */
		var Component = function () {

		};


		/* Methods
		----------------------------------------------- */

		/**
		 * All bootstrap logic should go here
		 * @return {void}
		 */
		Component.prototype.init = function () {

		};

		/**
		 * All teardown logic should go here
		 * @return {void}
		 */
		Component.prototype.destroy = function () {

		};


		/* Event handlers
		----------------------------------------------- */


		/* Export
		----------------------------------------------- */
		return Component;

	});

})(this);
