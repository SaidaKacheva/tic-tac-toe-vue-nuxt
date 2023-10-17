import { SEGMENT_VALUE, WIN_DIRECTION, GAME_RESULT } from '../assets/constants';

export type TSegmentValues = typeof SEGMENT_VALUE[keyof typeof SEGMENT_VALUE];

export type TSegmentPosition = {
    row: number,
    col: number,
};

export type TSegment = TSegmentPosition & {
    val?: TSegmentValues,
};

export type TWinDirections = typeof WIN_DIRECTION[keyof typeof WIN_DIRECTION];

export type TWin = {
    result: typeof GAME_RESULT.win,
    direction: TWinDirections,
    index: number,
};

export type TStandoff = {
    result: typeof GAME_RESULT.standoff
};

export type TGameResult = TWin | TStandoff;
