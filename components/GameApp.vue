<script lang="ts">
    import { defineComponent } from 'vue'
    import { TSegmentValues, TSegment, TGameResult, TSegmentPosition, TWin } from '../types'
    import { SEGMENT_VALUE, WIN_DIRECTION, GAME_RESULT } from '../assets/constants';

    export default defineComponent({
        name: 'GameApp',
        data() {
            return {
                currentValue: SEGMENT_VALUE.tic as TSegmentValues,
                segments: [
                    {row: 1, col: 1},
                    {row: 1, col: 2},
                    {row: 1, col: 3},
                    {row: 2, col: 1},
                    {row: 2, col: 2},
                    {row: 2, col: 3},
                    {row: 3, col: 1},
                    {row: 3, col: 2},
                    {row: 3, col: 3},
                ] as TSegment[],
                gameRes: undefined as TGameResult | undefined,
            }
        },
        computed: {
            nextValue: function(): TSegmentValues {
                return this.currentValue === SEGMENT_VALUE.tic ? SEGMENT_VALUE.tac : SEGMENT_VALUE.tic;
            },
            win: function(): TWin | undefined {
                return this.gameRes?.result === GAME_RESULT.win ? this.gameRes : undefined;
            }
        },
        methods: {
            handleCurrentValueChange: function(newValue: TSegmentValues) {
                this.currentValue = newValue;
            },
            handleStepCompleted: function(segment: TSegment) {
                if (segment.val || this.gameRes) {
                    return;
                }
                segment.val = this.currentValue;

                this.gameRes = this.checkGameRes();
                
                if(this.gameRes) {
                    if (this.gameRes.result === GAME_RESULT.win) {
                        console.log('WINNER IS ', this.currentValue);
                    } else {
                        console.log('STANOFF');
                    }
                } else {
                    this.handleCurrentValueChange(this.nextValue);
                }
            },
            handleReplayClick: function() {
                this.currentValue = SEGMENT_VALUE.tic;
                this.segments.map(s => s.val = undefined);
                this.gameRes = undefined;
            },
            handleSettingsClick: function() {
                console.log('handleSettingsClick');
            },
            checkGameRes(): TGameResult | undefined {
                const filledSegments = this.segments.filter((s) => s.val === this.currentValue);
                
                if(filledSegments.length < 3) {
                    return;
                }
                console.log('filledSegments.length', filledSegments.length);
                if (filledSegments.length === this.segments.length) {
                    return { result: GAME_RESULT.standoff };
                }
                
                const winRowNum = this.getWinLineNumber(filledSegments, WIN_DIRECTION.row);
                if (winRowNum && winRowNum > 0) {
                    return {
                        result: GAME_RESULT.win,
                        direction: WIN_DIRECTION.row,
                        index: winRowNum,
                    };
                }
                const winColNum = this.getWinLineNumber(filledSegments, 'col');
                if (winColNum && winColNum > 0) {
                    return {
                        result: GAME_RESULT.win,
                        direction: WIN_DIRECTION.col,
                        index: winColNum,
                    };
                }
                const winCrossNum = this.getWinCrossLineStartNumber(filledSegments);
                if (winCrossNum && winCrossNum > 0) {
                    return {
                        result: GAME_RESULT.win,
                        direction: WIN_DIRECTION.cross,
                        index: winCrossNum,
                    };
                }
            },
            getWinLineNumber(filledSegments: TSegment[], dir: keyof TSegmentPosition): number | undefined {
                const lineFilterCb = (num: number) => (
                    (s: TSegment) => s[dir] === num
                );
                
                const winSets = ([
                    filledSegments.filter(lineFilterCb(1)),
                    filledSegments.filter(lineFilterCb(2)),
                    filledSegments.filter(lineFilterCb(3)),
                ]).filter((set: TSegment[]) => set.length === 3);
                
                if (winSets.length > 0) {
                    return winSets[0][0][dir];
                }
            },
            getWinCrossLineStartNumber(filledSegments: TSegment[]): number | undefined {
                const crossSet1 = filledSegments.filter((s: TSegment) => s.row === s.col);
                if (crossSet1.length === 3) {
                    return 1;
                }

                const crossSet3 = filledSegments.filter((s: TSegment) => s.row + s.col === 4);
                if (crossSet3.length === 3) {
                    return 3;
                }
            },
            
        },
    })
</script>
<template>
    <div class="game-app">
        <div class="game-app__ui-block">
            <CurrentValueToggle
                :currentVal="currentValue" />
            <div class="game-app__ui-block-right">
                <ReplayButton
                    @click="handleReplayClick"/>
                <SettingsButton
                    @click="handleSettingsClick"/>
            </div>
        </div>
        <GameField
            :currentVal="currentValue"
            :segments="segments"
            :win="win"
            :onStepCompleted="handleStepCompleted" />
    </div>
</template>
<style lang="scss">
    .game-app {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2em;

        &__ui-block {
            width: 30em;
            display: flex;
            gap: 1em;
            justify-content: space-between;

            &-right {
                display: flex;
                gap: 1em;
                justify-content: flex-end;
            }
        }
    }
</style>
