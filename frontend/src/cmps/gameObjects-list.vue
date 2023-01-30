<template lang="">
    <div class="gameObject-list">
        <gameObjectPreview v-for="(gameObject, index) in gameObjects" :key="index"
         :gameObject="gameObject"
        @previewClicked="previewClicked"/>
    </div>
</template>
<script>
import gameObjectPreview from './gameObject-preview.vue';
export default {
    props:{
        gameObjects:Array
    },
    components:{
        gameObjectPreview
    },
    created(){
        console.log(this.gameObjects)
    },
    methods:{
        previewClicked(gameObject){
            this.$emit('previewClicked', gameObject)
        }
    }
}
</script>