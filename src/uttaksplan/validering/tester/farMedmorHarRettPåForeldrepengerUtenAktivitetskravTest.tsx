import React from 'react';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { erUttaksmengdeForFarMedmorForHøyTest } from './erUttaksmengdeForFarMedmorForHøyTest';
import links from 'app/links/links';
import { IntlShape } from 'react-intl';
import { getkontoUtenAktivitetskravUker } from 'app/utils/minsterettUtils';

export const farMedmorHarRettPåForeldrepengerUtenAktivitetskravTest: RegelTest = (
    grunnlag: Søknadsinfo
): RegelTestresultat => {
    const tattUtForMangeDagerIPlanen = erUttaksmengdeForFarMedmorForHøyTest(grunnlag).passerer === false;
    if (
        !grunnlag.søkerErFarEllerMedmor ||
        grunnlag.morHarRett ||
        tattUtForMangeDagerIPlanen ||
        (grunnlag.søkerErFarEllerMedmor && grunnlag.søkerErAleneOmOmsorg)
    ) {
        return {
            passerer: true,
        };
    }
    const kontoUtenAktivitetskravUker = getkontoUtenAktivitetskravUker(
        grunnlag.antallBarn,
        grunnlag.morErUfør,
        grunnlag.familiehendelsesdato,
        grunnlag.dekningsgrad,
        !grunnlag.morHarRett
    );
    return {
        passerer: kontoUtenAktivitetskravUker === 0,
        info: {
            intlKey: 'uttaksplan.validering.info.rettTilAktivitetsfriUttak',
            renderAsHtml: true,
            values: {
                antallUker: kontoUtenAktivitetskravUker,
                a: (_intl: IntlShape) => (msg: any) =>
                    (
                        <a href={links.aktivitetsfriUttakInfo} className="lenke" rel="noreferrer" target="_blank">
                            {msg}
                        </a>
                    ),
            },
        },
    };
};
