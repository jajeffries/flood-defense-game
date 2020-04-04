const {RiverFactory} = require('./river')

const SPRING_SEASON = "Spring"
const SUMMER_SEASON = "Summer"
const AUTUMN_SEASON = "Autumn"
const WINTER_SEASON = "Winter"

const START_OF_SPRING = 1
const START_OF_SUMMER = 91
const START_OF_AUTUMN = 181
const START_OF_WINTER = 271

const DAYS_IN_YEAR = 365

class Calendar {
    constructor(startDay) {
        this._currentDay = startDay || START_OF_SPRING
    }
    nextDay() {
        this._currentDay += 1
        if(this._currentDay > DAYS_IN_YEAR) {
            this._currentDay = 1
        }
    }
    season() {
        if(1 <= this._currentDay && this._currentDay <= 90) {
            return SPRING_SEASON
        } else if(START_OF_SUMMER <= this._currentDay && this._currentDay < START_OF_AUTUMN) {
            return SUMMER_SEASON
        } else if(START_OF_AUTUMN <= this._currentDay && this._currentDay < START_OF_WINTER)  {
            return AUTUMN_SEASON
        } else {
            return WINTER_SEASON
        }
    }
    currentDate() {
        return this._currentDay
    }
}

class Weather {
    constructor(calendar) {
        this.calendar = calendar
    }
    likelihoodOfRain() {
        const seasonRainLikelihood = {
            "Spring": 30,
            "Summer": 10,
            "Autumn": 45,
            "Winter": 60
        }
        return seasonRainLikelihood[this.calendar.season()]
    }
    rainFall() {
        return 0 // TODO calculate rainfall based on lieklihood
    }
}

class Game {
    constructor(startDay, riverFactory) {
        this.calendar = new Calendar(startDay)
        this.weather = new Weather(this.calendar)
        this.river = (riverFactory || new RiverFactory()).create()
    }
    nextDay() {
        this.calendar.nextDay()
        const rainFallInMl = this.weather.rainFall()
        console.log(this.river, this.river.rain)
        this.river.rain(rainFallInMl)
    }
}

module.exports = {
    Game,
    DAYS_IN_YEAR,
    SPRING_SEASON,
    SUMMER_SEASON,
    AUTUMN_SEASON,
    WINTER_SEASON,
    START_OF_SPRING,
    START_OF_SUMMER,
    START_OF_AUTUMN,
    START_OF_WINTER
}