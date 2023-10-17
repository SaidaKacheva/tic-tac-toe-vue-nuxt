<script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'ReplayButton',
    })
</script>
<template>
    <div class="replay-button"></div>
</template>
<style lang="scss">
    .replay-button {
        width: 3em;
        height: 3em;
        border-radius: 0.2em;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        background-image: url('../assets/images/replay.svg');
        cursor: pointer;
    }
</style>