(function() {
    var slides = document.getElementById("slideshow").getElementsByTagName("div");
    if (slides.length < 2) {
        return;
    }

    var preload = function(i) {
        if (slides.item(i).style["background-image"] == "" && "background" in slides.item(i).dataset) {
            slides.item(i).style["background-image"] = "url(\"" + slides.item(i).dataset["background"] + "\")";
        }
    }

    var current = slides.length - 1;
    var previous = current - 1;
    var next = 0;
    var last = Date.now();

    preload(current);
    preload(next);

    setInterval(function() {
        var now = Date.now();
        if (now - last < 5000) {
            return;
        }
        last = now;

        slides.item(previous).style["z-index"] = "0";
        slides.item(previous).style["opacity"] = "1";
        slides.item(current).style["z-index"] = "2";
        slides.item(next).style["z-index"] = "1";
        slides.item(current).style["opacity"] = "0";

        previous = current;
        current = next;
        next = (next + 1) % slides.length;

        preload(next);
    }, 10000);
})();
