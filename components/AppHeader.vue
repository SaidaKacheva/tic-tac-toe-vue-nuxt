<script>
export default {
  name: 'AppHeader',
}
</script>

<template>
    <div class="app-header">
        <img class="app-header-logo" src="../assets/images/logo_400_main.png" alt="S" />
        <div class="app-header-text">
            Hello!
        </div>
    </div>
</template>

<style lang="scss">
    .app-header {
        width: 100%;
        background: var(--color-main);
        color: var(--color-light);
        padding: 0.5em 1em;
        display: grid;
        grid-template-columns: 3em 1fr 2em;
        align-items: center;
        grid-gap: 0.5em;

        &-logo {
            height: 3em;
            width: 3em;
        }

        &-text {
            font-size: 1.5em;
        }
    }
</style>