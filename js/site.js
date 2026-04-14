// Portfolio filter: toggle card visibility by data-status.
(function () {
	var buttons = document.querySelectorAll(".portfolio-filter-btn");
	var cards = document.querySelectorAll(".portfolioLogos .card-6");
	if (!buttons.length || !cards.length) return;

	function applyFilter(filter) {
		cards.forEach(function (card) {
			var status = card.getAttribute("data-status");
			var visible = filter === "all" || filter === status;
			card.classList.toggle("is-hidden", !visible);
		});
		buttons.forEach(function (btn) {
			var isActive = btn.getAttribute("data-filter") === filter;
			btn.classList.toggle("is-active", isActive);
			btn.setAttribute("aria-pressed", isActive ? "true" : "false");
		});
	}

	buttons.forEach(function (btn) {
		btn.addEventListener("click", function () {
			applyFilter(btn.getAttribute("data-filter"));
		});
	});
})();

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
