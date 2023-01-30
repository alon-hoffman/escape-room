
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'gameObject'

export const gameObjectService = {
    query,
    getById,
    save,
    remove,
    getEmptyGameObject,
    addGameObjectMsg
}
window.cs = gameObjectService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)
    

    // var gameObjects = await storageService.query(STORAGE_KEY)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     gameObjects = gameObjects.filter(gameObject => regex.test(gameObject.vendor) || regex.test(gameObject.description))
    // }
    // if (filterBy.price) {
    //     gameObjects = gameObjects.filter(gameObject => gameObject.price <= filterBy.price)
    // }
    // return gameObjects

}
function getById(gameObjectId) {
    // return storageService.get(STORAGE_KEY, gameObjectId)
    return httpService.get(`gameObject/${gameObjectId}`)
}

async function remove(gameObjectId) {
    // await storageService.remove(STORAGE_KEY, gameObjectId)
    return httpService.delete(`gameObject/${gameObjectId}`)
}
async function save(gameObject) {
    var savedGameObject
    if (gameObject._id) {
        // savedGameObject = await storageService.put(STORAGE_KEY, gameObject)
        savedGameObject = await httpService.put(`gameObject/${gameObject._id}`, gameObject)

    } else {
        // Later, owner is set by the backend
        gameObject.owner = userService.getLoggedinUser()
        // savedGameObject = await storageService.post(STORAGE_KEY, gameObject)
        savedGameObject = await httpService.post('gameObject', gameObject)
    }
    return savedGameObject
}

async function addGameObjectMsg(gameObjectId, txt) {
    const savedMsg = await httpService.post(`gameObject/${gameObjectId}/msg`, {txt})
    return savedMsg
}


function getEmptyGameObject() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}





