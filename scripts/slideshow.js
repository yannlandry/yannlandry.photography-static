(function() {
    var slides = document.getElementById("slideshow").getElementsByTagName("div");
    if (slides.length < 2) {
        return;
    }
    var progress = document.getElementById("progress-bar");

    var preload = function(i) {
        if (slides.item(i).style["background-image"] == "" && "background" in slides.item(i).dataset) {
            slides.item(i).style["background-image"] = "url(\"" + slides.item(i).dataset["background"] + "\")";
        }
    }

    var current = slides.length - 1;
    var previous = current - 1;
    var next = 0;
    var cycle = 0;
    var interval = 9;

    // should already be loaded via HTML but just in case
    preload(current);

    setInterval(function() {
        if (!document.hasFocus()) {
            // don't run when the tab is inactive
            return;
        }

        cycle = (cycle + 1) % interval;

        if (cycle == interval - 3) {
            // preload the next slide 3 cycles before the interval
            preload(next);
        }

        if (cycle == 0) {
            // on cycle 0 (first is cycle 1), rotate to the next slide
            slides.item(previous).style["z-index"] = "0";
            slides.item(previous).style["opacity"] = "1";
            slides.item(current).style["z-index"] = "2";
            slides.item(next).style["z-index"] = "1";
            slides.item(current).style["opacity"] = "0";
            previous = current;
            current = next;
            next = (next + 1) % slides.length;
        }

        // adjust progress bar
        progress.style["width"] = (100 / (interval - 1) * cycle) + "%";
    }, 1000);
})();
