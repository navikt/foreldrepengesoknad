import React from 'react';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { erUttaksmengdeForFarMedmorForHøyTest } from './erUttaksmengdeForFarMedmorForHøyTest';
import links from 'app/links/links';
import { IntlShape } from 'react-intl';
import {
    getBareFarHarRettKontoUtenAktivitetskravUker,
    getBareFarHarRettAntallUkerPåÅTaUtDagerUtenAktivitetskravFørWLB,
} from 'app/utils/minsterettUtils';
import { andreAugust2022ReglerGjelder } from 'app/utils/dateUtils';

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
    const kontoUtenAktivitetskravUker = getBareFarHarRettKontoUtenAktivitetskravUker(
        grunnlag.antallBarn,
        grunnlag.morErUfør,
        grunnlag.familiehendelsesdato,
        grunnlag.dekningsgrad,
        !grunnlag.morHarRett
    );

    const testPasserer = kontoUtenAktivitetskravUker === 0;
    const renderAsHtml = true;
    const link = (_intl: IntlShape) => (msg: any) =>
        (
            <a href={links.aktivitetsfriUttakInfo} className="lenke" rel="noreferrer" target="_blank">
                {msg}
            </a>
        );

    if (andreAugust2022ReglerGjelder(grunnlag.familiehendelsesdato)) {
        return {
            passerer: testPasserer,
            info: {
                intlKey: 'uttaksplan.validering.info.rettTilAktivitetsfriUttak.etterWLB',
                renderAsHtml: renderAsHtml,
                values: {
                    antallUker: kontoUtenAktivitetskravUker,
                    a: link,
                },
            },
        };
    } else {
        const bareFarHarRett = grunnlag.søkerErFarEllerMedmor && !grunnlag.morHarRett;
        const antallUkerPåÅTaUtDager = getBareFarHarRettAntallUkerPåÅTaUtDagerUtenAktivitetskravFørWLB(
            grunnlag.antallBarn,
            grunnlag.familiehendelsesdato,
            grunnlag.dekningsgrad,
            bareFarHarRett
        );
        return {
            passerer: testPasserer,
            info: {
                intlKey: 'uttaksplan.validering.info.rettTilAktivitetsfriUttak.førWLB',
                renderAsHtml: renderAsHtml,
                values: {
                    antallUker: kontoUtenAktivitetskravUker,
                    antallUkerÅTaUtDagerUtenAktivitet: antallUkerPåÅTaUtDager,
                    a: link,
                },
            },
        };
    }
};
