const {
    assertTrue,
    assertBetween,
    assertGreaterThan,
    assertEqual
} = require("./assertions")

const {RiverFactory, DEFAULT_WATER_LEVEL} = require('../lib/river')

describe("River", () => {
    let river
    before(() => {
        river = new RiverFactory().create()
    })
    describe("Towns", () => {
        let towns
        before(() => {
            towns = river.sections.filter(section => section.hasTown()).map(s => s.town)
        })
        it("has 1 on a river", () => {
            assertEqual(towns.length, 1)
        })
        it("has a town name", () => {
            assertEqual(towns[0].name, "Hebden Bridge")
        })
    })

    describe("River Section", () => {
        it("has a default water level", () => {
            assertEqual(river.sections[0].waterLevel, DEFAULT_WATER_LEVEL)
        })
        it("has a width between 3 and 200 meters", () => {
            river.sections.forEach(section => assertBetween(section.width(), 3, 200))
        })
        it("has a safe water level that's higher than the default", () => {
            river.sections.forEach(section => assertGreaterThan(section.safeWaterLevel(), DEFAULT_WATER_LEVEL))
        })
    })

    it("is made up of 12 sections", () => {
        assertEqual(river.sections.length, 10)
    })
    it("gets wider down the river", () => {
        let previousWidth
        for(let section of river.sections) {
            if(previousWidth) {
                assertGreaterThan(section.width(), previousWidth)
            }
            previousWidth = section.width()
        }
    })
    it("has a flow based on the waterlevel and width", () => {
        for(let section of river.sections) {
            assertEqual(section.flow(), section.waterLevel * section.width())
        }
    })
})