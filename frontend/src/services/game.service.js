import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import {userService} from './user.service'

import { store } from '../store/store'
import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from './socket.service'


;(() => {

  setTimeout(()=>{
    // socketService.on(SOCKET_EVENT_REVIEW_ADDED, (game) => {
    //   console.log('GOT from socket', game)
    //   store.commit({type: 'addGame', game})
    // })
    // socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (game) => {
    //   showSuccessMsg(`New game about me ${game.txt}`)
    // })
  }, 0)

})()



export const gameService = {
  add,
  query,
  remove
}



function query(filterBy) {
  // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  // return httpService.get(`game${queryStr}`)
  return storageService.query('game')
}

async function remove(gameId) {
  // await httpService.delete(`game/${gameId}`)
  await storageService.delete('game', gameId)

}
async function add(game) {
  // const addedGame = await httpService.post(`game`, game)

  game.byUser = userService.getLoggedinUser()
  game.aboutUser = await userService.getById(game.aboutUserId)
  const addedGame = await storageService.post('game', game)

  return addedGame
}

