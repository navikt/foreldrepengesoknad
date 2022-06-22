import React from 'react';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { erUttaksmengdeForFarMedmorForHøyTest } from './erUttaksmengdeForFarMedmorForHøyTest';
import { andreAugust2022ReglerGjelder } from 'app/utils/dateUtils';
import links from 'app/links/links';
import { IntlShape } from 'react-intl';

export const farMedmorHarRettPåForeldrepengerUtenAktivitetskravTest: RegelTest = (
    grunnlag: Søknadsinfo
): RegelTestresultat => {
    const tattUtForMangeDagerIPlanen = erUttaksmengdeForFarMedmorForHøyTest(grunnlag).passerer === false;
    if (!grunnlag.søkerErFarEllerMedmor || grunnlag.morHarRett || tattUtForMangeDagerIPlanen) {
        return {
            passerer: true,
        };
    }

    let kontoUtenAktivitetskravUker = 0;
    if (grunnlag.morErUfør) {
        kontoUtenAktivitetskravUker = 15;
    } else if (andreAugust2022ReglerGjelder(grunnlag.familiehendelsesdato)) {
        kontoUtenAktivitetskravUker = 8;
    }

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
