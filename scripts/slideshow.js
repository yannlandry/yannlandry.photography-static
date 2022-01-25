(function() {
    var slides = document.getElementById("slideshow").getElementsByTagName("div");
    if (slides.length < 2) {
        return;
    }

    var preload = function(i) {
        if (slides.item(i).style["background-image"] == "" && "background" in slides.item(i).dataset) {
            slides.item(i).style["background-image"] = "url(\"" + slides.item(i).dataset["background"] + "\")";
            return true;
        }
        return false;
    }

    var current = slides.length - 1;
    var previous = current - 1;
    var next = 0;
    var last = Date.now();

    // should already be loaded via HTML but just in case
    preload(current);

    setInterval(function() {
        if (!document.hasFocus()) {
            // don't run when the tab is inactive
            return;
        }

        var now = Date.now();
        if (now - last > 7000 && preload(next)) {
            // if there's ~5s left or less until the next switch and the next image is not loaded, wait another 4s
            return;
        }
        if (now - last < 11000) {
            // if the next slide is loaded but we've run less than 11s ago, wait another 4s
            return;
        }
        // perform the switch and update the timestamp
        last = now;

        slides.item(previous).style["z-index"] = "0";
        slides.item(previous).style["opacity"] = "1";
        slides.item(current).style["z-index"] = "2";
        slides.item(next).style["z-index"] = "1";
        slides.item(current).style["opacity"] = "0";

        previous = current;
        current = next;
        next = (next + 1) % slides.length;
    }, 4000);
})();
