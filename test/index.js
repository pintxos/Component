describe('Component', function () {

	var instance;

	beforeEach(function () {
		$('body').append('<div class="test"/>');
		instance = new pintxos.Component($('.test')[0], {});
	});

	afterEach(function () {
		$('.test').remove();
	});


	it('should have an init and destroy method', function () {
		expect(instance.init).toBeDefined();
		expect(instance.destroy).toBeDefined();
	});

	it('should have a getEl method', function () {
		expect(instance.getEl).toBeDefined();
	});

	describe('getEl()', function () {
		it('should return a jQuery object', function () {
			expect(instance.getEl() instanceof jQuery).toBe(true);
		});
	});

	describe('lifecycle API', function () {

		it('shoud trigger init and destroy events on the component\'s main element', function () {

			var initTriggered, destroyTriggered;

			instance.getEl().on(instance.getSettings().events.init, function () {
				initTriggered = true;
			});

			instance.getEl().on(instance.getSettings().events.destroy, function () {
				destroyTriggered = true;
			});

			instance.init();
			instance.destroy();

			expect(initTriggered).toBe(true);
			expect(destroyTriggered).toBe(true);
		});

	});

});
