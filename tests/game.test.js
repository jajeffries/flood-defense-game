const {
    assertTrue,
    assertBetween,
    assertGreaterThan,
    assertEqual
} = require("./assertions")

const {
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
} = require("../lib/game")

describe("Game", () => {
    describe("Time passing", () => {
        it("starts on day 1", () => {
            const game = new Game()
            assertEqual(game.calendar.currentDate(), 1)
        })

        it("increases each day", () => {
            const game = new Game()
            game.nextDay()
            assertEqual(game.calendar.currentDate(), 2)
        })

        it("goes back to day 1 after 365 days", () => {
            const game = new Game()
            for (let index = 1; index < DAYS_IN_YEAR + 1; index++) {
                game.nextDay()
            }
            assertEqual(game.calendar.currentDate(), 1)
        })
    })

    describe("Seasons", () => {
        it("is spring between day 1 and 90 inclusive", () => {
            const game = new Game()
            for (let day = 1; day <= 90; day++) {
                assertEqual(game.calendar.season(), SPRING_SEASON, `Expected ${SPRING_SEASON} for day ${game.calendar.currentDate()}`)
                game.nextDay()
            }
        })

        it("is summer between day 91 and 180 inclusive", () => {
            const game = new Game(START_OF_SUMMER)
            for (let day = 1; day <= 90; day++) {
                assertEqual(game.calendar.season(), SUMMER_SEASON, `Expected ${SUMMER_SEASON} for day ${game.calendar.currentDate()}`)
                game.nextDay()
            }
        })

        it("is autumn between day 181 and 270 inclusive", () => {
            const game = new Game(START_OF_AUTUMN)
            for (let day = 1; day <= 90; day++) {
                assertEqual(game.calendar.season(), AUTUMN_SEASON, `Expected ${AUTUMN_SEASON} for day ${game.calendar.currentDate()}`)
                game.nextDay()
            }
        })

        it("is autumn between day 271 and 365 inclusive", () => {
            const game = new Game(START_OF_WINTER)
            for (let day = 1; day <= 95; day++) {
                assertEqual(game.calendar.season(), WINTER_SEASON, `Expected ${WINTER_SEASON} for day ${game.calendar.currentDate()}`)
                game.nextDay()
            }
        })

        describe("Rain likelihood", () => {
            it("is 30% in spring", () => {
                assertEqual(new Game(START_OF_SPRING).weather.likelihoodOfRain(), 30)
            })
            it("is 10% in summer", () => {
                assertEqual(new Game(START_OF_SUMMER).weather.likelihoodOfRain(), 10)
            })
            it("is 45% in autumn", () => {
                assertEqual(new Game(START_OF_AUTUMN).weather.likelihoodOfRain(), 45)
            })
            it("is 60% in winter", () => {
                assertEqual(new Game(START_OF_WINTER).weather.likelihoodOfRain(), 60)
            })
        })

        class FakeRiverFactory{
            constructor(river){
                this.river = river
            }
            create() {
                return this.river
            }
        }

        class FakeRiver{
            constructor() {
                this.calls = []
            }
            rain(amountInMl) {
                this.calls.push(amountInMl)
            }
        }

        it("should call River.rain with amount of rain each day", () => {
            const fakeRiver = new FakeRiver()
            const game = new Game(START_OF_SPRING, new FakeRiverFactory(fakeRiver))
            game.nextDay()
            assertEqual(fakeRiver.calls.length, 1)
        })
    })
})