const textsData = {
    hinglish: [
        "\n\n🌈 HAPPY HOLI 🌈\n\n" +
        "Is rangon ke tyohaar par\n" +
        "Bhagwan kare aapke ghar mein\n" +
        "Khushiyon ke rang kabhi kam na ho,\n" +
        "Pyaar, hasi aur sukoon hamesha bana rahe ❤️\n\n" +
        "Aap aur aapke poore parivaar ko\n" +
        "Dil se Holi ki dher saari shubhkamnayein!\n\n" +
        "Warm wishes from "

    ],
    hindi: [
        "\n\n🌈 होली की हार्दिक शुभकामनाएं 🌈\n\n" +
        "रंगों के इस पावन पर्व पर\n" +
        "आपके जीवन में खुशियों की बहार आए,\n" +
        "घर में प्रेम, शांति और समृद्धि सदा बनी रहे ❤️\n\n" +
        "आप एवं आपके पूरे परिवार को\n" +
        "होली की ढेरों मंगलकामनाएं।\n\n" +
        "स्नेह सहित — "
    ]
};

function generateLink() {
    const group = document.getElementById("groupName").value;
    const your = document.getElementById("yourName").value;
    const lang = document.getElementById("language").value;

    if (!group || !your) {
        alert("Sab bharo 😅");
        return;
    }

    const url = window.location.origin + window.location.pathname +
        "?group=" + encodeURIComponent(group) +
        "&from=" + encodeURIComponent(your) +
        "&lang=" + lang;

    // WhatsApp
    document.getElementById("whatsappBtn").onclick = function () {
        window.open(
            "https://wa.me/?text=" + encodeURIComponent(url),
            "_blank"
        );
    };

    // Facebook
    document.getElementById("facebookBtn").onclick = function () {
        window.open(
            "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url),
            "_blank"
        );
    };

    // Instagram
    document.getElementById("instagramBtn").onclick = function () {
        alert("Instagram direct link share allow nahi karta 😅\nLink copy karke bio ya story me paste karein.");
        navigator.clipboard.writeText(url);
    };
    // 🔥 Yahin trailer start hoga
    startTrailer(group, your, lang);

    // 🔥 WhatsApp button set hoga
    setTimeout(() => {
        document.getElementById("shareBox").style.display = "block";

        document.getElementById("whatsappBtn").onclick = function () {
            window.open(
                "https://wa.me/?text=" + encodeURIComponent(url),
                "_blank"
            );
        };
    }, textsData[lang].length * 2000 + 4000);
}

function typeEffect(text, element, callback) {
    let i = 0;
    element.innerHTML = "";
    let interval = setInterval(() => {
        element.innerHTML += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(interval);
            if (callback) setTimeout(callback, 1000);
        }
    }, 60);
}

function startTrailer(group, your, lang) {

    document.getElementById("formBox").style.display = "none";
    const screen = document.getElementById("screen");
    screen.style.display = "block";

    document.getElementById("bgMusic").play();

    let texts = textsData[lang] || textsData["hinglish"];

    let i = 0;

    function showNext() {
        if (i < texts.length) {
            typeEffect(texts[i], screen, () => {
                i++;
                showNext();
            });
        } else {

            document.body.style.background =
                "linear-gradient(45deg,#ff0080,#ff8c00,#40e0d0)";

            let finalMessage;

            if (lang === "hindi") {
                finalMessage =
                    group.toUpperCase() +
                    "\n\n🌈 होली की हार्दिक शुभकामनाएं 🌈" + your + "\n\nकी ओर से ";
            } else {
                finalMessage =
                    group.toUpperCase() +
                    "\n\n🌈 HAPPY HOLI 🌈\n\nFrom " + your;
            }

            typeEffect(finalMessage, screen, () => {

                // 🔥 YAHAN SHOW HOGA SHARE BUTTON
                document.getElementById("shareBox").style.display = "block";

                const url = window.location.origin + window.location.pathname +
                    "?group=" + encodeURIComponent(group) +
                    "&from=" + encodeURIComponent(your) +
                    "&lang=" + lang;

                document.getElementById("whatsappBtn").onclick = function () {
                    window.open(
                        "https://wa.me/?text=" + encodeURIComponent(url),
                        "_blank"
                    );
                };

            });

            startConfetti();
        }
    }

    showNext();
}


function restart() {
    window.location.href = window.location.pathname;
}

const params = new URLSearchParams(window.location.search);
if (params.get("group") && params.get("from")) {
    startTrailer(
        params.get("group"),
        params.get("from"),
        params.get("lang") || "hinglish"
    );
}

function startConfetti() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let pieces = [];
    for (let i = 0; i < 150; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * 150
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.beginPath();
        for (let i = 0; i < pieces.length; i++) {
            let p = pieces[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        update();
    }

    function update() {
        for (let i = 0; i < pieces.length; i++) {
            let p = pieces[i];
            p.y += Math.cos(p.d) + 2;
            if (p.y > canvas.height) {
                p.y = 0;
            }
        }
    }

    setInterval(draw, 20);
}