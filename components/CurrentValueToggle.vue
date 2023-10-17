<script lang="ts">
    import { defineComponent } from 'vue'
    import type { PropType } from 'vue'
    import { TSegmentValues } from '../types'
    import { SEGMENT_VALUE } from '../assets/constants'

    const defaultVal: TSegmentValues  = SEGMENT_VALUE.tic;

    export default defineComponent({
        name: 'CurrentValueToggle',
        props: {
            currentVal: {
                type: String as PropType<TSegmentValues>,
                default: defaultVal,
            },
        },
        computed: {
            SEGMENT_VALUE() {
                return SEGMENT_VALUE;
            },
        },
    })
</script>
<template>
    <div :class="['current-value-toggle']">
        <div 
            :class="[
                'current-value-toggle__position',
                'current-value-toggle__position--tic',
                currentVal === SEGMENT_VALUE.tic && 'active'
            ]"
        ></div>
        <div 
            :class="[
                'current-value-toggle__position',
                'current-value-toggle__position--tac',
                currentVal === SEGMENT_VALUE.tac && 'active'
            ]"
        ></div>
    </div>
</template>
<style lang="scss">
.current-value-toggle {
    width: 6em;
    height: 3em;
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-radius: 0.2em;
    box-shadow: 0 0 0.2em var(--color-dark);
    overflow: hidden;

    &__position {
        width: 100%;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;

        &--tic {
           background-image: url('../assets/images/tic.svg'); 
        }

        &--tac {
            background-image: url('../assets/images/tac.svg');
        }

        &.active {
            background-color: var(--color-main);
            color: var(--color-light);
        }
    }
}
</style>