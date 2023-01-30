import { gameService } from '../services/game.service'






export const gameStore = {
    state: {
        games: []
    },
    getters: {
        games({ games }) { return games },
    },
    mutations: {
        setGames(state, { games }) {
            state.games = games
        },
        addGame(state, { game }) {
            state.games.push(game)
        },
        removeGame(state, { gameId }) {
            state.games = state.games.filter(game => game._id !== gameId)
        },
    },
    actions: {
        async addGame(context, { game }) {
            try {
                game = await gameService.add(game)
                context.commit({ type: 'addGame', game })
                context.dispatch({ type: 'increaseScore' })

                return game
            } catch (err) {
                console.log('gameStore: Error in addGame', err)
                throw err
            }
        },
        async loadGames(context) {
            try {
                const games = await gameService.query()
                context.commit({ type: 'setGames', games })
            } catch (err) {
                console.log('gameStore: Error in loadGames', err)
                throw err
            }
        },
        async removeGame(context, { gameId }) {
            try {
                await gameService.remove(gameId)
                context.commit({ type: 'removeGame', gameId })
            } catch (err) {
                console.log('gameStore: Error in removeGame', err)
                throw err
            }
        },

    }
}