describe('Component', function () {

	var instance;

	beforeEach(function () {
		$('body').append('<div class="test"><div class="child"/></div>');
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

	describe('event API', function () {

		var $link;

		beforeEach(function () {
			$('body').remove('.testLink');
			$('body').append('<a class="testLink" href="#">Test</a>');
			$link = $('.testLink');
		});

		it('Should execute an event handler bound with _on, should not execute the event handler when it is unbound with _off', function () {

			var clicked = false, id;

			id = instance._on($link, 'click', function () {
				clicked = true;
			});

			$link.trigger('click');

			expect(clicked).toBe(true);

			clicked = false;
			instance._off(id);

			$link.trigger('click');
			expect(clicked).toBe(false);



		});

		it('Should unbind all event handlers when the component is destroyed', function () {

			var clicked = false, id;

			id = instance._on($link, 'click', function () {
				clicked = true;
			});

			instance.destroy();

			$link.trigger('click');

			expect(clicked).toBe(false);

		});

	});

	describe('query cache', function () {

		var $test;

		beforeEach(function () {
			$('#test').remove();
			$('body').append('<div id="test"/>');
			$test = $('#test');
		});

		it('should cache elements', function () {
			var $result = instance._query('.child');
			expect(instance._queryCache['.child']).toEqual($result)
		});

		it('should not create duplicated cache intries', function () {
			instance._query('.child');
			instance._query('.child');
			expect(Object.keys(instance._queryCache).length).toEqual(1)
		});

	});



});
