import { Forelder } from 'common/types';
import { ForeldreparForelder } from 'shared/types';

export interface FordelingsinfoEnForelder {
    tittel: string;
    navn: string;
    antallDager: number;
    harForMangeDager: boolean;
    ikonRef: ForeldreparForelder;
}

export interface FordelingDeltOmsorg {
    type: 'deltOmsorg';
    mor: {
        pstAvTotal: number;
        pstBrukt: number;
    };
    felles: {
        pstAvTotal: number;
        pstBruktMor: number;
        pstBruktFar: number;
        pstForMye: number;
    };
    farMedmor: {
        pstAvTotal: number;
        pstBrukt: number;
    };
}

export interface FordelingIkkeDeltOmsorg {
    type: 'ikkeDeltOmsorg';
    pstBrukt: number;
    pstForMye?: number;
    forelder: Forelder;
}

export type FordelingGrafData = FordelingDeltOmsorg | FordelingIkkeDeltOmsorg;
