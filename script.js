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

    startTrailer(group, your, lang);
}

function typeEffect(text, element, callback) {
    let i = 0;
    element.innerHTML = "";
    let interval = setInterval(() => {
        element.innerHTML += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(interval);
            if (callback) setTimeout(callback, 800);
        }
    }, 50);
}

function startTrailer(group, your, lang) {

    document.getElementById("formBox").style.display = "none";
    const screen = document.getElementById("screen");
    screen.style.display = "block";

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
                    textsData.hindi[0] +
                    your;
            } else {
                finalMessage =
                    group.toUpperCase() +
                    textsData.hinglish[0] +
                    your;
            }

            typeEffect(finalMessage, screen, () => {

                const url = window.location.origin + window.location.pathname +
                    "?group=" + encodeURIComponent(group) +
                    "&from=" + encodeURIComponent(your) +
                    "&lang=" + lang;

                document.getElementById("shareBox").style.display = "block";

                document.getElementById("whatsappBtn").onclick = function () {
                    window.open(
                        "https://wa.me/?text=" + encodeURIComponent(url),
                        "_blank"
                    );
                };

                document.getElementById("facebookBtn").onclick = function () {
                    window.open(
                        "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url),
                        "_blank"
                    );
                };

                document.getElementById("instagramBtn").onclick = function () {
                    navigator.clipboard.writeText(url);
                    alert("Link copied! Instagram bio ya story me paste karein 😎");
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
    for (let i = 0; i < 120; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 6 + 3,
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