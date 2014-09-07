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


});
