<template lang="">
    <div class="riddle-game">
        <template v-if="!gameObject.riddle.solved">
        <h1>Riddle</h1>
        <p>{{gameObject.riddle.txt}}</p>
        <input v-model="userAnswer" type="text" ref="answerInput" />
        <button @click="answerInput">Submit Answer</button>
        </template>
        
    </div>
</template>
<script>
export default {
    props:{gameObject:Object},
    data(){
        return{
            userAnswer:''
        }
    },
    created(){
        console.log('gameObject',this.gameObject)
    },
    methods:{
        answerInput(){
            if(this.gameObject.answers.includes(this.userAnswer)) {
                this.gameObject.solved= true
                this.$emit('gameObjectUpdate', this.gameObject)
            }
            else {
                this.$refs.answerInput.classList.add('error')
                setTimeout(() => {
                    this.$refs.answerInput.classList.remove('error')
            },1000)
        }
    }

    }
}
</script>
