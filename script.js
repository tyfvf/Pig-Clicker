let game = {
    bacons: 0,
    totalBacons: 0,
    totalClicks: 0,
    clickValue: 1,
    version: 0.000,

    addBacons: function(amount) {
        this.bacons += amount
        this.totalBacons += amount
        this.totalClicks ++
        display.updateBacons()
    },

    getBaconsPerSecond: function() {
        let baconsPerSecond = 0
        for (i = 0; i < building.name.length; i++) {
            baconsPerSecond += building.income[i] * building.count[i]
        }
        return baconsPerSecond
    }
}

let building = {
    name: [
        'Cursor',
        'Pan',
        'Farmer',
        'Factory'
    ],
    image: [
        'cursor.png',
        'pan.png',
        'farmer.png',
        'factory.png'
    ],
    count: [
        0,
        0,
        0,
        0
    ],
    income: [
        1,
        5,
        50,
        125
    ],
    cost: [
        15,
        100,
        1000,
        9999
    ],

    purchase: function(index) {
        if (game.bacons >= this.cost[index]) {
            game.bacons -= this.cost[index]
            this.count[index]++
            this.cost[index] = Math.round(this.cost[index] * 1.15)
            display.updateBacons()
            display.updateShop()
        }
    }
}

let display = {
    updateBacons: function() {
        document.getElementById('bacons').textContent = game.bacons
        document.getElementById('baconspersecond').textContent = game.getBaconsPerSecond()
        document.title = game.bacons + ' bacons - Pig Clicker'
    },

    updateShop: function() {
        document.getElementById('shopContainer').innerHTML = ""
        for (i = 0; i < building.name.length; i++) {
            document.getElementById('shopContainer').innerHTML += '<table class="shopButton" onclick="building.purchase('+i+')"><tr><td id="image"><img src="images/'+building.image[i]+'" alt="a photo of a cursor, click to buy"></td><td id="nameAndCost"><p>'+building.name[i]+'</p><p><span>'+building.cost[i]+'</span> bacons</p></td><td id="amount"><span>'+building.count[i]+'</span></td></tr></table>'
        }
    }
}

function saveGame() {
    let gameSave = {
        bacons: game.bacons,
        totalBacons: game.totalBacons,
        totalClicks: game.totalClicks,
        clickValue: game.clickValue,
        version: game.version,
        buildingCount: building.count,
        buildingIncome: building.income,
        buildingCost: building.cost
    }
    localStorage.setItem('gameSave', JSON.stringify(gameSave))
}

function loadGame() {
    let savedGame = JSON.parse(localStorage.getItem('gameSave'))
    if (localStorage.getItem('gameSave') !== null) {
        if (typeof savedGame.bacons !== 'undefined') game.bacons = savedGame.bacons
        if (typeof savedGame.totalBacons !== 'undefined') game.totalBacons = savedGame.totalBacons
        if (typeof savedGame.totalClicks !== 'undefined') game.totalClicks = savedGame.totalClicks
        if (typeof savedGame.clickValue !== 'undefined') game.clickValue = savedGame.clickValue
        if (typeof savedGame.buildingCount !== 'undefined') {
            for (i = 0; i < savedGame.buildingCount.length; i++) {
                building.count[i] = savedGame.buildingCount[i]
            }
        }
        if (typeof savedGame.buildingIncome !== 'undefined') {
            for (i = 0; i < savedGame.buildingIncome.length; i++) {
                building.income[i] = savedGame.buildingIncome[i]
            }
        }
        if (typeof savedGame.buildingCost !== 'undefined') {
            for (i = 0; i < savedGame.buildingCost.length; i++) {
                building.cost[i] = savedGame.buildingCost[i]
            }
        }
    }
}

function resetGame() {
    if (confirm('Are you sure you want to reset your game?')) {
        let gameSave = {}
        localStorage.setItem("gameSave", JSON.stringify(gameSave))
        location.reload()
    }
}

window.onload = function() {
    loadGame()
    display.updateBacons()
    display.updateShop()
}

setInterval(function() {
    game.bacons += game.getBaconsPerSecond()
    game.totalBacons += game.getBaconsPerSecond()
    display.updateBacons()
}, 1000) // 1 sec

setInterval(function () {
    saveGame()
}, 30000) // 30 sec

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key == 's') { // ctrl + s
        event.preventDefault()
        saveGame()
    }
}, false)