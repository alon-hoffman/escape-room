
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'gameObject'

const demoGameObjects =
 [
    {
    id: 1,
    position: 1,
    imageUrl: 'https://res.cloudinary.com/db9hy0vpw/image/upload/v1675084270/envelope_lky75e.png',
    riddle: {txt: 'I am a message, but also a risk. I can deliver the truth, but also reveal the lie. What am I?', solved: false},
    answers: ['letter'],
    clue: 'Letters deliver messages, but what do they say?'
    },
    {
    id: 2,
    position: 2,
    imageUrl: 'https://res.cloudinary.com/db9hy0vpw/image/upload/v1675087111/binary-code_ggcllf.png',
    riddle: {txt: 'I am the key, but also the challenge. I can protect the secret, but also reveal the truth. What am I?', solved: false},
    answers: ['cipher'],
    clue: 'Ciphers protect secrets, but how are they broken?'
    },
    {
    id: 3,
    position: 3,
    imageUrl: 'https://res.cloudinary.com/db9hy0vpw/image/upload/v1675087183/key_yltgz4.png',
    riddle: {txt: 'I am the solution, but also the tool. I can unlock the truth, but also hide it. What am I?', solved: false},
    answers: ['key'],
    clue: 'Keys unlock secrets, but what kind of lock do they fit?'
    },
    {
    id: 4,
    position: 4,
    imageUrl: 'https://res.cloudinary.com/db9hy0vpw/image/upload/v1675087227/safe_1_ukpvk7.png',
    riddle: {txt: 'I am the storage, but also the trap. I can hold the truth, but also hide it. What am I?', solved: false},
    answers: ['safe'],
    clue: 'Safes hold secrets, but what makes them secure?'
    },
    {
    id: 5,
    position: 5,
    imageUrl: 'https://res.cloudinary.com/db9hy0vpw/image/upload/v1675087278/puzzle_dtrlaq.png',
    riddle: {txt: 'I am the password, but also the challenge. I can open the truth, but also hide it. What am I?', solved: false},
    answers: ['combination'],
    clue: 'Combinations open safes, but what is the key?'
    }
    ]

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
    var gameObjects = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        gameObjects = gameObjects.filter(gameObject => regex.test(gameObject.vendor) || regex.test(gameObject.description))
    }
    if (filterBy.price) {
        gameObjects = gameObjects.filter(gameObject => gameObject.price <= filterBy.price)
    }
    return gameObjects
}

function getById(gameObjectId) {
    return storageService.get(STORAGE_KEY, gameObjectId)
}

async function remove(gameObjectId) {
    await storageService.remove(STORAGE_KEY, gameObjectId)
}

async function save(gameObject) {
    var savedGameObject
    if (gameObject._id) {
        savedGameObject = await storageService.put(STORAGE_KEY, gameObject)
    } else {
        // Later, owner is set by the backend
        gameObject.owner = userService.getLoggedinUser()
        savedGameObject = await storageService.post(STORAGE_KEY, gameObject)
    }
    return savedGameObject
}

async function addGameObjectMsg(gameObjectId, txt) {
    // Later, this is all done by the backend
    const gameObject = await getById(gameObjectId)
    if (!gameObject.msgs) gameObject.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    gameObject.msgs.push(msg)
    await storageService.put(STORAGE_KEY, gameObject)

    return msg
}

function getEmptyGameObject() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}


// TEST DATA
;(async ()=>{
     if(storageService.query(STORAGE_KEY).length ) return
     else localStorage.setItem(STORAGE_KEY, JSON.stringify(demoGameObjects))
 
    // await storageService.post(STORAGE_KEY, {vendor: 'Subali Karov 1', price: 180})
    // await storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 240})
})()

