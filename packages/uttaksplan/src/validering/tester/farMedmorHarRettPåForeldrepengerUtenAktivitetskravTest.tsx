import { IntlShape } from 'react-intl';

import { Link } from '@navikt/ds-react';

import { Søknadsinfo } from '@navikt/fp-common';
import { links } from '@navikt/fp-constants';

import { getVarighetString } from '../../components/periodeliste-item-header/PeriodelisteItemHeader';
import { andreAugust2022ReglerGjelder } from '../../utils/dateUtils';
import { getBareFarHarRettAntallUkerPåÅTaUtDagerUtenAktivitetskravFørWLB } from '../../utils/minsterettUtils';
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

    const kontoUtenAktivitetskrav = grunnlag.stønadskontoer.kontoer.find((k) => k.konto === 'AKTIVITETSFRI_KVOTE');

    const testPasserer = !kontoUtenAktivitetskrav || kontoUtenAktivitetskrav.dager === 0;
    const renderAsHtml = true;
    const link = () => (msg: any) => (
        <Link href={links.aktivitetsfriUttakInfo} rel="noreferrer" target="_blank">
            {msg}
        </Link>
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
