<template>
    <div class="gameObject-preview">
      <img :src="gameObject.imageUrl" alt="" @click="$emit('previewClicked', gameObject)"/>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      gameObject: Object
    },
    mounted() {
    //   console.log(this.gameObject);
    //   console.log(this.gameObject.imageUrl);
    }
  };
  </script>
  
  <style>
  </style>
  