<template>
  <div class="game-app">
    <gameObjectsList :gameObjects="gameObjects"
    @previewClicked="previewClicked"/>

    <riddleGame v-if="currRiddle" :gameObject="currRiddle"
    @gameObjectUpdate="gameObjectUpdate"/>
  </div>
</template>

<script>
import gameObjectsList from '../cmps/gameObjects-list.vue'
import riddleGame from '../cmps/riddle-game.vue'
export default {
  data(){
    return{
      riddle:null
    }
  },
  components:{
    gameObjectsList,
    riddleGame
  },
  computed: {
    gameObjects() {
      return this.$store.getters.gameObjects
    },
    currRiddle(){
      return this.riddle
    }
  },
  created() {
    this.$store.dispatch({type: 'loadGameObjects'})
  },
  methods:{
    previewClicked(gameObject){
      this.riddle = JSON.parse(JSON.stringify(gameObject))
    },
    gameObjectUpdate(gameObject){
      const gameObjects= JSON.parse(JSON.stringify(this.gameObjects))
      console.log("🚀 ~ file: game-app.vue:41 ~ gameObjectUpdate ~ gameObjects", gameObjects)
    }
  }

  
}
</script>
