$(function () {
	function isOffscreen() {
		var rect = this.getBoundingClientRect();
		var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
		return rect.bottom < 0 || rect.top > viewportHeight;
	}

	$.Velocity.RegisterEffect("transition.MovingIn", {
		defaultDuration: 600,
		calls: [[{
			opacity: [1, 0],
			rotateX: [0, -14],
			translateZ: [0, 100],
			translateY: [0, 10],
			scale: [1, 0.98]
		}]],
		reset: {
			opacity: 1,
			rotateX: 0,
			translateZ: 0,
			translateY: 0,
			scale: 1
		}
	});

	$(window).on("load", function () {
		$(".stagger").filter(isOffscreen).removeClass("stagger");
		$(".stagger").velocity("transition.MovingIn", {
			stagger: 40,
			duration: 1000,
			delay: 0,
			drag: true
		});
	});

	var leavingViaMailto = false;
	$("a[href^=mailto]").on("click", function () {
		leavingViaMailto = true;
	});
	window.onbeforeunload = function () {
		if (!leavingViaMailto) {
			$("body").addClass("unloading unloading--start");
		}
		leavingViaMailto = false;
	};
	document.body.onpageshow = function () {
		$("body").removeClass("unloading unloading--start");
	};
});
