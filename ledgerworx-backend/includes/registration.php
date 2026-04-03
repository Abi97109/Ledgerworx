<?php

add_action(
	'wp_footer',
	function() {
		?>
<script>
document.addEventListener("DOMContentLoaded", function () {
    const observer = new MutationObserver(function () {
        const msg = document.querySelector(".user-registration-message");

        if (msg && msg.innerText.toLowerCase().includes("success")) {
            setTimeout(function () {
                window.location.href = "/login";
            }, 3000);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
</script>
		<?php
	}
);
