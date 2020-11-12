import * as React from 'react';
import Multibar from 'shared/elements/multibar/Multibar';
import { UttaksplanHexFarge } from 'common/util/colors';
import { fordelingGrafBem } from '../FordelingGraf';
import { FordelingDeltOmsorg } from '../types';

const GrafDeltOmsorg: React.FunctionComponent<FordelingDeltOmsorg> = ({ mor, farMedmor, felles }) => {
    const childBem = fordelingGrafBem.child('graf');
    const morsFarge = UttaksplanHexFarge.lilla;
    const farsFarge = UttaksplanHexFarge.blaa;
    return (
        <div className={childBem.block}>
            <div className={childBem.element('forelder1')} style={{ width: `${mor.pstAvTotal}%` }}>
                <Multibar
                    borderColor={morsFarge}
                    leftBar={{
                        width: mor.pstBrukt,
                        color: morsFarge,
                    }}
                    centerBar={
                        mor.pstForMye > 0
                            ? {
                                  width: mor.pstForMye,
                                  color: UttaksplanHexFarge.rod,
                              }
                            : undefined
                    }
                    rightBar={
                        mor.pstOverførtTilAnnenForelder
                            ? {
                                  width: mor.pstOverførtTilAnnenForelder,
                                  color: farsFarge,
                              }
                            : undefined
                    }
                />
            </div>
            <div className={childBem.element('felles')} style={{ width: `${felles.pstAvTotal}%` }}>
                <Multibar
                    borderColor={UttaksplanHexFarge.graa}
                    leftBar={{
                        width: felles.pstBruktMor,
                        color: morsFarge,
                    }}
                    rightBar={{
                        width: felles.pstBruktFar,
                        color: farsFarge,
                    }}
                    centerBar={
                        felles.pstForMye > 0
                            ? {
                                  width: felles.pstForMye,
                                  color: UttaksplanHexFarge.rod,
                              }
                            : undefined
                    }
                />
            </div>
            <div className={childBem.element('forelder2')} style={{ width: `${farMedmor.pstAvTotal}%` }}>
                <Multibar
                    borderColor={farsFarge}
                    leftBar={
                        farMedmor.pstOverførtTilAnnenForelder
                            ? {
                                  width: farMedmor.pstOverførtTilAnnenForelder,
                                  color: morsFarge,
                              }
                            : undefined
                    }
                    centerBar={
                        farMedmor.pstForMye > 0
                            ? {
                                  width: farMedmor.pstForMye,
                                  color: UttaksplanHexFarge.rod,
                              }
                            : undefined
                    }
                    rightBar={{
                        width: farMedmor.pstBrukt,
                        color: farsFarge,
                    }}
                />
            </div>
        </div>
    );
};

export default GrafDeltOmsorg;
