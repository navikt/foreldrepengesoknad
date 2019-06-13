import { Forelder } from 'common/types';
import { ForeldreparForelder } from 'shared/types';

export interface FordelingsinfoEnForelder {
    tittel: string;
    navn: string;
    antallDager: number;
    harForMangeDager: boolean;
    ikonRef: ForeldreparForelder;
}

export interface FordelingDeltOmsorgForelderinfo {
    pstAvTotal: number;
    pstBrukt: number;
    pstOverførtTilAnnenForelder: number;
    pstForMye: number;
}

export interface FordelingDeltOmsorg {
    type: 'deltOmsorg';
    mor: FordelingDeltOmsorgForelderinfo;
    felles: {
        pstAvTotal: number;
        pstBruktMor: number;
        pstBruktFar: number;
        pstForMye: number;
    };
    farMedmor: FordelingDeltOmsorgForelderinfo;
}

export interface FordelingIkkeDeltOmsorg {
    type: 'ikkeDeltOmsorg';
    pstBrukt: number;
    pstForMye?: number;
    forelder: Forelder;
}

export type FordelingGrafData = FordelingDeltOmsorg | FordelingIkkeDeltOmsorg;
