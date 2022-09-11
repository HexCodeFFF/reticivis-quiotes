const letters = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.!?".split("")
const displaysize = 80;
const qs = document.querySelector.bind(document)
const displaydiv = qs("#splitflap")


function nextletter(letter) {
    return letters[(letters.indexOf(letter) + 1) % letters.length]
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

function prevletter(letter) {
    return letters[mod(letters.indexOf(letter) - 1, letters.length)]
}

function letterdiv(letter, animate) {
    const pletter = prevletter(letter)
    return `<div class="letterpart letter1top ${animate ? 'animate' : ''}">${pletter}</div>
            <div class="letterpart letter1bottom">${pletter}</div>
            <div class="letterpart letter2top">${letter}</div>
            <div class="letterpart letter2bottom ${animate ? 'animate' : ''}">${letter}</div>`
}


let display = "";


for (let i = 0; i < displaysize; i++) {
    display += " "
    displaydiv.insertAdjacentHTML("beforeend", `<div class="letter"></div>`)
}
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

async function changetext(target) {
    if (target.length < displaysize) {
        const l = target.length
        for (let i = 0; i < displaysize - l; i++) {
            target += " "
        }
    } else if (target.length > displaysize) {
        target = target.slice(0, displaysize);
    }
    target = target.toUpperCase()
    while (target !== display) {
        for (let i = 0; i < displaysize; i++) {
            if (target[i] !== display[i]) {
                display = display.replaceAt(i, nextletter(display[i]));
                displaydiv.children[i].innerHTML = letterdiv(display[i], true)
                if (display[i] === target[i]) {
                    displaydiv.children[i].classList.add("ready_to_become_static")
                }
            }
        }
        await sleep(100)
        for (let i = 0; i < displaysize; i++) {
            if (displaydiv.children[i].classList.contains("ready_to_become_static")) {
                displaydiv.children[i].innerHTML = target[i];
                displaydiv.children[i].classList.remove("ready_to_become_static")
            }
        }
    }
}