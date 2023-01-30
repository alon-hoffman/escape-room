import { gameObjectService } from '../services/gameObject.service.local'

export function getActionRemoveGameObject(gameObjectId) {
    return {
        type: 'removeGameObject',
        gameObjectId
    }
}
export function getActionAddGameObject(gameObject) {
    return {
        type: 'addGameObject',
        gameObject
    }
}
export function getActionUpdateGameObject(gameObject) {
    return {
        type: 'updateGameObject',
        gameObject
    }
}

export function getActionAddGameObjectMsg(gameObjectId) {
    return {
        type: 'addGameObjectMsg',
        gameObjectId,
        txt: 'Stam txt'
    }
}

export const gameObjectStore = {
    state: {
        gameObjects: []
    },
    getters: {
        gameObjects({gameObjects}) { return gameObjects },
    },
    mutations: {
        setGameObjects(state, { gameObjects }) {
            state.gameObjects = gameObjects
        },
        addGameObject(state, { gameObject }) {
            state.gameObjects.push(gameObject)
        },
        updateGameObject(state, { gameObject }) {
            const idx = state.gameObjects.findIndex(c => c.id === gameObject._id)
            state.gameObjects.splice(idx, 1, gameObject)
        },
        removeGameObject(state, { gameObjectId }) {
            state.gameObjects = state.gameObjects.filter(gameObject => gameObject._id !== gameObjectId)
        },
        addGameObjectMsg(state, { gameObjectId , msg}) {
            const gameObject = state.gameObjects.find(gameObject => gameObject._id === gameObjectId)
            if (!gameObject.msgs) gameObject.msgs = []
            gameObject.msgs.push(msg)
        },
    },
    actions: {
        async addGameObject(context, { gameObject }) {
            try {
                gameObject = await gameObjectService.save(gameObject)
                context.commit(getActionAddGameObject(gameObject))
                return gameObject
            } catch (err) {
                console.log('gameObjectStore: Error in addGameObject', err)
                throw err
            }
        },
        async updateGameObject(context, { gameObject }) {
            try {
                gameObject = await gameObjectService.save(gameObject)
                context.commit(getActionUpdateGameObject(gameObject))
                return gameObject
            } catch (err) {
                console.log('gameObjectStore: Error in updateGameObject', err)
                throw err
            }
        },
        async loadGameObjects(context) {
            try {
                const gameObjects = await gameObjectService.query()
                context.commit({ type: 'setGameObjects', gameObjects })
            } catch (err) {
                console.log('gameObjectStore: Error in loadGameObjects', err)
                throw err
            }
        },
        async removeGameObject(context, { gameObjectId }) {
            try {
                await gameObjectService.remove(gameObjectId)
                context.commit(getActionRemoveGameObject(gameObjectId))
            } catch (err) {
                console.log('gameObjectStore: Error in removeGameObject', err)
                throw err
            }
        },
        async addGameObjectMsg(context, { gameObjectId, txt }) {
            try {
                const msg = await gameObjectService.addGameObjectMsg(gameObjectId, txt)
                context.commit({type: 'addGameObjectMsg', gameObjectId, msg })
            } catch (err) {
                console.log('gameObjectStore: Error in addGameObjectMsg', err)
                throw err
            }
        },

    }
}