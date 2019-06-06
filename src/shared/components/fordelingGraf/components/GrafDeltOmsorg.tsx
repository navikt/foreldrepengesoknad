import * as React from 'react';
import Multibar from 'shared/elements/multibar/Multibar';
import { UttaksplanHexFarge } from 'common/util/colors';
import { fordelingGrafBem } from '../FordelingGraf';

export interface GrafDeltOmsorgProps {
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

const GrafDeltOmsorg: React.StatelessComponent<GrafDeltOmsorgProps> = ({ mor, farMedmor, felles }) => {
    const childBem = fordelingGrafBem.child('graf');
    return (
        <div className={childBem.block}>
            <div className={childBem.element('forelder1')} style={{ width: `${mor.pstAvTotal}%` }}>
                <Multibar
                    borderColor={UttaksplanHexFarge.lilla}
                    leftBar={{
                        width: mor.pstBrukt,
                        color: UttaksplanHexFarge.lilla
                    }}
                />
            </div>
            <div className={childBem.element('felles')} style={{ width: `${felles.pstAvTotal}%` }}>
                <Multibar
                    borderColor={UttaksplanHexFarge.graa}
                    leftBar={{
                        width: felles.pstBruktMor,
                        color: UttaksplanHexFarge.lilla
                    }}
                    rightBar={{
                        width: felles.pstBruktFar,
                        color: UttaksplanHexFarge.blaa
                    }}
                    centerBar={
                        felles.pstForMye > 0
                            ? {
                                  width: felles.pstForMye,
                                  color: UttaksplanHexFarge.rod
                              }
                            : undefined
                    }
                />{' '}
            </div>
            <div className={childBem.element('forelder2')} style={{ width: `${farMedmor.pstAvTotal}%` }}>
                <Multibar
                    borderColor={UttaksplanHexFarge.blaa}
                    rightBar={{
                        width: farMedmor.pstBrukt,
                        color: UttaksplanHexFarge.blaa
                    }}
                />
            </div>
        </div>
    );
};

export default GrafDeltOmsorg;
