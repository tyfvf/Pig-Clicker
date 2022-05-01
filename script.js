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

function saveGame() {
    let gameSave = {
        bacons: bacons,
        clickingPower: clickingPower,
        cursorCost: cursorCost,
        cursors: cursors,
        panCost: panCost,
        pans: pans,
        farmerCost: farmerCost,
        farmers: farmers
    }

    localStorage.setItem('gameSave', JSON.stringify(gameSave))
}

function loadGame() {
    let savedGame = JSON.parse(localStorage.getItem('gameSave'))
    if (typeof savedGame.bacons !== 'undefined') bacons = savedGame.bacons
    if (typeof savedGame.clickingPower !== 'undefined') clickingPower = savedGame.clickingPower
    if (typeof savedGame.cursorCost !== 'undefined') cursorCost = savedGame.cursorCost
    if (typeof savedGame.cursors !== 'undefined') cursors = savedGame.cursors
    if (typeof savedGame.panCost !== 'undefined') panCost = savedGame.panCost
    if (typeof savedGame.pans !== 'undefined') pans = savedGame.pans
    if (typeof savedGame.farmerCost !== 'undefined') farmerCost = savedGame.farmerCost
    if (typeof savedGame.farmers !== 'undefined') farmers = savedGame.farmers
}

function resetGame() {
    if (confirm('Are you sure you want to reset your game? ')){
        let gameSave = {}
        localStorage.setItem('gameSave', JSON.stringify(gameSave))
        location.reload()
    }
}

window.onload = function () {
    loadGame()
    updateBaconsPerSecond()
    document.getElementById("bacons").textContent = bacons
    document.getElementById("cursorcost").textContent = cursorCost
    document.getElementById("cursors").textContent = cursors
    document.getElementById("pancost").textContent = panCost
    document.getElementById("pans").textContent = pans
    document.getElementById("farmercost").textContent = farmerCost
    document.getElementById("farmers").textContent = farmers
}

setInterval(function () {
    bacons += cursors
    bacons += pans * 5
    bacons += farmers * 50
    document.getElementById("bacons").textContent = bacons

    document.title = bacons + ' bacons - Pig Clicker'
}, 1000) // 1 sec

setInterval(function () {
    saveGame()
}, 30000) // 30 sec

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key == 's') { //ctrl + s
        event.preventDefault()
        saveGame()
    }
}, false)