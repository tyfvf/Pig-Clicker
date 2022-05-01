let bacons = 0
let clickingPower = 1

let cursorCost = 15
let cursors = 0
let panCost = 100
let pans = 0
let farmerCost = 1000
let farmers = 0

function buyCursor() {
    if (bacons >= cursorCost) {
        bacons -= cursorCost
        cursors ++
        cursorCost = Math.round(cursorCost * 1.15)

        document.getElementById("bacons").textContent = bacons
        document.getElementById("cursorcost").textContent = cursorCost
        document.getElementById("cursors").textContent = cursors
        updateBaconsPerSecond()
    }
}

function buyPan() {
    if (bacons >= panCost) {
        bacons -= panCost
        pans ++
        panCost = Math.round(panCost * 1.15)

        document.getElementById("bacons").textContent = bacons
        document.getElementById("pancost").textContent = panCost
        document.getElementById("pans").textContent = pans
        updateBaconsPerSecond()
    }
}

function buyFarmer() {
    if (bacons >= farmerCost) {
        bacons -= farmerCost
        farmers ++
        farmerCost = Math.round(farmerCost * 1.15)

        document.getElementById("bacons").textContent = bacons
        document.getElementById("farmercost").textContent = farmerCost
        document.getElementById("farmers").textContent = farmers
        updateBaconsPerSecond()
    }
}

function addBacons(amount) {
    bacons += amount
    document.getElementById("bacons").textContent = bacons
}

function updateBaconsPerSecond() {
    baconsPerSecond = cursors + pans * 5 + farmers * 50
    document.getElementById('baconspersecond').textContent = baconsPerSecond
}

setInterval(function () {
    bacons += cursors
    bacons += pans * 5
    bacons += farmers * 50
    document.getElementById("bacons").textContent = bacons

    document.title = bacons + ' bacons - Pig Clicker'
}, 1000) // 1sec