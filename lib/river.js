const {Town} = require('./town')

const DEFAULT_WATER_LEVEL = 10
const MAX_INITIAL_SAFE_WATER_LEVEL = 20

const MAX_WIDTH = 200
const MIN_WIDTH = 3

const NUMBER_OF_SECTIONS = 10

class River {
    constructor(sections) {
        this.sections = sections
    }
    rain(rainFallInMl) {
        // TODO implement and add tests
    }
}

class RiverSection {
    constructor(width, safeWaterLevel) {
        this._width = width
        this.waterLevel = DEFAULT_WATER_LEVEL
        this._safeWaterLevel = safeWaterLevel
    }
    hasTown() {
        return false
    }
    width() {
        return this._width
    }
    flow() {
        return this.waterLevel * this._width
    }
    safeWaterLevel() {
        return this._safeWaterLevel
    }
}

class TownSection extends RiverSection {
    constructor(width, safeWaterLevel) {
        super(width, safeWaterLevel)
        this.town = new Town()
    }
    hasTown() {
        return true
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class RiverFactory {
    create() {
        const sections = this._createSections()
        return new River(sections)
    }
    _createSections() {
        const sections = []
        for(let i=0; i<NUMBER_OF_SECTIONS; i++) {
            const previousSectionWidth = sections[i-1] ? sections[i-1].width() : 0
            const riverHasTown = sections.some(s => s.hasTown())
            sections.push(this._createSection(riverHasTown, previousSectionWidth))
        }
        return sections
    }
    _createSection(riverHasTown, previousSectionWidth) {
        const width = previousSectionWidth ? previousSectionWidth + 1 : this._getInitialWidth()
        const safeWaterLevel = DEFAULT_WATER_LEVEL + getRandomInt(1, MAX_INITIAL_SAFE_WATER_LEVEL - DEFAULT_WATER_LEVEL)
        return riverHasTown ? new RiverSection(width, safeWaterLevel) : new TownSection(width, safeWaterLevel)
    }
    _getInitialWidth() {
        return getRandomInt(MIN_WIDTH, MAX_WIDTH - (NUMBER_OF_SECTIONS * MAX_INITIAL_SAFE_WATER_LEVEL - DEFAULT_WATER_LEVEL))
    }
}

module.exports = {
    RiverFactory,
    DEFAULT_WATER_LEVEL
}