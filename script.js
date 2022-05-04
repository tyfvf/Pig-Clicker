let game = {
    bacons: 0,
    totalBacons: 0,
    totalClicks: 0,
    clickValue: 1,
    version: 0.000,

    addBacons: function(amount) {
        this.bacons += amount
        this.totalBacons += amount
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
            display.updateUpgrades()
        }
    }
}

let upgrade = {
    name: [
        'Stone Clicker',
        'Iron Clicker',
        'Baby Fingers',
    ],
    description: [
        'Cursors are twice as efficient',
        'Cursor are thrice as efficient',
        'Your Clicks worth twice as much'
    ],
    image: [
        'stone-clicker.png',
        'iron-clicker.png',
        'baby-fingers.png'
    ],
    type: [
        'building',
        'building',
        'click'
    ],
    cost: [
        '300',
        '3000',
        '350'
    ],
    buildingIndex: [
        0,
        0,
        -1
    ],
    requirement: [
        10,
        50,
        100
    ],
    bonus: [
        2,
        3,
        2
    ],
    purchased: [
        false,
        false,
        false
    ],

    purchase: function(index) {
        if (!this.purchased[index] && game.bacons >= this.cost[index]) {
            if (this.type[index] == 'building' && building.count[this.buildingIndex[index]] >= this.requirement[index]) {
                game.bacons -= this.cost[index]
                building.income[this.buildingIndex[index]] *= this.bonus[index]
                this.purchased[index] = true

                display.updateUpgrades()
                display.updateBacons()
            } else if (this.type[index] == 'click' && game.totalClicks >= this.requirement[index]) {
                game.bacons -= this.cost[index]
                game.clickValue *= this.bonus[index]
                this.purchased[index] = true

                display.updateUpgrades()
                display.updateBacons()
            }
        }
    }
}

let achievement = {
    name: [
        'A Humble Start',
        'Click',
        'The beginning of something'
    ],
    description: [
        'Buy 1 cursor',
        'Click the pig 1 time',
        'Gather 1 bacon'
    ],
    image: [
        'humble-start.png',
        'click.png',
        'bacon.png'
    ],
    type: [
        'building',
        'click',
        'bacons'
    ],
    requirement: [
        1,
        1,
        1
    ],
    objectIndex: [
        0,
        -1,
        -1
    ],
    awarded: [
        false,
        false,
        false
    ],

    earn: function(index) {
        this.awarded[index] = true
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
    },

    updateUpgrades: function() {
        document.getElementById('upgradeContainer').innerHTML = ""
        for (i = 0; i < upgrade.name.length; i++) {
            if (!upgrade.purchased[i]) {
                if (upgrade.type[i] == 'building' && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]) {
                    document.getElementById('upgradeContainer').innerHTML += '<img src="images/'+upgrade.image[i]+'" title="'+upgrade.name[i]+'&#10;'+upgrade.description[i]+'&#10;('+upgrade.cost[i]+' bacons)" onclick="upgrade.purchase('+i+')">'
                } else if (upgrade.type[i] == 'click' && game.totalClicks >= upgrade.requirement[i]) {
                    document.getElementById('upgradeContainer').innerHTML += '<img src="images/'+upgrade.image[i]+'" title="'+upgrade.name[i]+'&#10;'+upgrade.description[i]+'&#10;('+upgrade.cost[i]+' bacons)" onclick="upgrade.purchase('+i+')">'
                }
            }
        }
    },

    updateAchievements: function() {
        document.getElementById('achievementContainer').innerHTML = ""
        for (i = 0; i < achievement.name.length; i++) {
            if (achievement.awarded[i]) {
                document.getElementById('achievementContainer').innerHTML += '<img src="images/'+achievement.image[i]+'" title="'+achievement.name[i]+'&#10;'+achievement.description[i]+'">'
            }
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
        buildingCost: building.cost,
        upgradePurchased: upgrade.purchased,
        achievementAwarded: achievement.awarded 
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
        if (typeof savedGame.upgradePurchased !== 'undefined') {
            for (i = 0; i < savedGame.upgradePurchased.length; i++) {
                upgrade.purchased[i] = savedGame.upgradePurchased[i]
            }
        }
        if (typeof savedGame.achievementAwarded !== 'undefined') {
            for (i = 0; i < savedGame.achievementAwarded.length; i++) {
                achievement.awarded[i] = savedGame.achievementAwarded[i]
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

document.getElementById('clicker').addEventListener('click', function() {
    game.totalClicks++
    game.addBacons(game.clickValue)
}, false)

window.onload = function() {
    loadGame()
    display.updateBacons()
    display.updateUpgrades()
    display.updateAchievements()
    display.updateShop()
}

setInterval(function() {
    for (i = 0; i < achievement.name.length; i++) {
        if (achievement.type[i] == 'bacons' && game.totalBacons >= achievement.requirement[i]) achievement.earn(i)
        else if (achievement.type[i] == 'click' && game.totalClicks >= achievement.requirement[i]) achievement.earn(i)
        else if (achievement.type[i] == 'building' && building.count[achievement.objectIndex[i]] >= achievement.requirement[i]) achievement.earn(i)
    }
    game.bacons += game.getBaconsPerSecond()
    game.totalBacons += game.getBaconsPerSecond()
    display.updateBacons()
    display.updateAchievements()
}, 1000) // 1 sec

setInterval(function() {
    display.updateBacons()
    display.updateUpgrades()
}, 10000) // 10 sec

setInterval(function () {
    saveGame()
}, 30000) // 30 sec

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key == 's') { // ctrl + s
        event.preventDefault()
        saveGame()
    }
}, false)