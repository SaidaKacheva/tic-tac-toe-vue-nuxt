<script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'SettingsButton',
    })
</script>
<template>
    <div class="settings-button"></div>
</template>
<style lang="scss">
    .settings-button {
        width: 3em;
        height: 3em;
        border-radius: 0.2em;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        background-image: url('../assets/images/settings.svg');
        cursor: pointer;
    }
</style>