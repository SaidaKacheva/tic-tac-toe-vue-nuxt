<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { TSegmentValues, TSegment, TWin } from '../types'

export default defineComponent({
    name: 'GameField',
    props: {
        currentVal: {
            type: String as PropType<TSegmentValues>,
            required: true,
        },
        segments: {
            type: Array as PropType<TSegment[]>,
            required: true,
        },
        win: {
            type: Object as PropType<TWin>,
            required: false,
        },
        onStepCompleted: Function as PropType<(segment: TSegment) => void>,
    },
    methods: {
        onSegmentClick(segment: TSegment) {
            this.onStepCompleted?.(segment);
        },        
    },
})
</script>
<template>
    <div class="game-field">
        <div 
            :class="['game-field__segment', `game-field__segment--${segment.val}`]"
            v-for="segment in segments"
            @click="onSegmentClick(segment)"
        ></div>
        <div v-if="win" 
            :class="['game-win-line', `game-win-line--${win.direction}-${win.index}`]"></div>
    </div>
</template>

<style lang="scss">
.game-field {
    position: relative;
    width: 30em;
    height: 30em;
    margin: 2em;
    background-image: url('../assets/images/game-field.svg');
    background-repeat: no-repeat;
    background-size: contain;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;

    &__segment {
        background-repeat: no-repeat;
        background-size: contain;

        &--tic {
           background-image: url('../assets/images/tic.svg'); 
        }

        &--tac {
            background-image: url('../assets/images/tac.svg');
        }
    }
}

.game-win-line {
    background-image: url('../assets/images/cross-line.svg');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    width: 33%;
    top: 0;
    height: 100%;
    transform-origin: left top;

    &--col-2 {
        transform: translate(100%, 0);
    }
    
    &--col-3 {
        transform: translate(200%, 0);
    }

    &--row-1 {
        transform: rotate(90deg) translate(0%, -100%);
    }

    &--row-2 {
        transform: rotate(90deg) translate(100%, -100%);
    }

    &--row-3 {
        transform: rotate(90deg) translate(200%, -100%);
    }

    &--cross-1 {
        transform: rotate(135deg) translate(-50%, -130%) scaleY(1.2);
    }

    &--cross-3 {
        transform: rotate(-135deg) translate(-265%, -60%) scaleY(1.2);
    }
}
</style>
