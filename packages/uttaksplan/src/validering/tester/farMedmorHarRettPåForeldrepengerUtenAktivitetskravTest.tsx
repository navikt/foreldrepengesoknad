import { IntlShape } from 'react-intl';

import {
    StønadskontoType,
    Søknadsinfo,
    andreAugust2022ReglerGjelder,
    getBareFarHarRettAntallUkerPåÅTaUtDagerUtenAktivitetskravFørWLB,
    getVarighetString,
} from '@navikt/fp-common';
import { links } from '@navikt/fp-constants';

import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';
import { erUttaksmengdeForFarMedmorForHøyTest } from './erUttaksmengdeForFarMedmorForHøyTest';

export const farMedmorHarRettPåForeldrepengerUtenAktivitetskravTest: RegelTest = (
    grunnlag: Søknadsinfo,
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

    const kontoUtenAktivitetskrav = grunnlag.stønadskontoer.kontoer.find(
        (k) => k.konto === StønadskontoType.AktivitetsfriKvote,
    );

    const testPasserer = !kontoUtenAktivitetskrav || kontoUtenAktivitetskrav.dager === 0;
    const renderAsHtml = true;
    const link = (_intl: IntlShape) => (msg: any) => (
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
                    antallUkerOgDager: (intl: IntlShape) =>
                        kontoUtenAktivitetskrav ? getVarighetString(kontoUtenAktivitetskrav.dager, intl) : '',
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
            bareFarHarRett,
        );
        return {
            passerer: testPasserer,
            info: {
                intlKey: 'uttaksplan.validering.info.rettTilAktivitetsfriUttak.førWLB',
                renderAsHtml: renderAsHtml,
                values: {
                    antallUkerOgDager: (intl: IntlShape) =>
                        kontoUtenAktivitetskrav ? getVarighetString(kontoUtenAktivitetskrav.dager, intl) : '',
                    antallUkerÅTaUtDagerUtenAktivitet: antallUkerPåÅTaUtDager,
                    a: link,
                },
            },
        };
    }
};
