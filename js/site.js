// Unload fade: add a class on navigation away so CSS can transition out.
// Mailto clicks don't actually unload the page, so we skip them.
(function () {
	var leavingViaMailto = false;

	document.addEventListener("click", function (event) {
		var link = event.target.closest && event.target.closest('a[href^="mailto:"]');
		if (link) {
			leavingViaMailto = true;
		}
	});

	window.addEventListener("beforeunload", function () {
		if (!leavingViaMailto) {
			document.body.classList.add("unloading", "unloading--start");
		}
		leavingViaMailto = false;
	});

	window.addEventListener("pageshow", function () {
		document.body.classList.remove("unloading", "unloading--start");
	});
})();
