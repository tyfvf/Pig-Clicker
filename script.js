let bacons = 0
let clickingPower = 1

let cursorCost = 15
let cursors = 0
let farmerCost = 100
let farmers = 0

function buyCursor() {
    if (bacons >= cursorCost) {
        bacons -= cursorCost
        cursors ++
        cursorCost = Math.round(cursorCost * 1.15)

        document.getElementById("bacons").innerHTML = bacons
        document.getElementById("cursorcost").innerHTML = cursorCost
        document.getElementById("cursors").innerHTML = cursors
    }
}

function buyFarmer() {
    if (bacons >= farmerCost) {
        bacons -= farmerCost
        farmers ++
        farmerCost = Math.round(farmerCost * 1.15)

        document.getElementById("bacons").innerHTML = bacons
        document.getElementById("farmercost").innerHTML = farmerCost
        document.getElementById("farmers").innerHTML = farmers
    }
}

function addBacons(amount) {
    bacons += amount
    document.getElementById("bacons").innerHTML = bacons
}

setInterval(function () {
    bacons += cursors
    bacons += farmers * 5
    document.getElementById("bacons").innerHTML = bacons
}, 1000) // 1sec