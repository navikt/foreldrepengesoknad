import dayjs from 'dayjs';

import { Periode, Søknadsinfo } from '@navikt/fp-common';

import { getSumUttaksdagerÅTrekkeIPeriodene } from '../../utils/Periodene';
import { formaterDatoKompakt } from '../../utils/dateUtils';
import {
    ANTALL_UTTAKSDAGER_FAR_MEDMOR_RUNDT_FØDSEL,
    getFarMedmorUttakRundtFødsel,
    getFørsteUttaksdag2UkerFørFødsel,
    getSisteUttaksdag6UkerEtterFødsel,
    gjelderWLBReglerFarMedmorRundtFødsel,
    slutterTidsperiodeInnen6UkerEtterFødsel,
} from '../../utils/wlbUtils';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';

const overskridelseUttakRundtFødselAntallDager = (
    perioderRundtFødsel: Periode[],
    familiehendelsesdato: Date,
): number => {
    const sisteUttak6UkerEtterFødsel = getSisteUttaksdag6UkerEtterFødsel(familiehendelsesdato);
    const perioderAvkortetTilÅSlutte6UkerEtterFødsel = perioderRundtFødsel.map((p) =>
        dayjs(p.tidsperiode.tom).isAfter(dayjs(sisteUttak6UkerEtterFødsel), 'day')
            ? { ...p, tidsperiode: { fom: p.tidsperiode.fom, tom: sisteUttak6UkerEtterFødsel } }
            : p,
    );
    const antallDager = getSumUttaksdagerÅTrekkeIPeriodene(perioderAvkortetTilÅSlutte6UkerEtterFødsel);
    return ANTALL_UTTAKSDAGER_FAR_MEDMOR_RUNDT_FØDSEL - antallDager;
};

export const farMedmorHarSøktUgyldigAntallDagerUttakRundtFødselTest: RegelTest = (
    grunnlag: Søknadsinfo,
): RegelTestresultat => {
    if (
        gjelderWLBReglerFarMedmorRundtFødsel(
            grunnlag.familiehendelsesdato,
            grunnlag.søkerErFarEllerMedmor,
            grunnlag.morHarRett,
            grunnlag.søkersituasjon.situasjon,
        )
    ) {
        const perioderUttakRundtFødsel = getFarMedmorUttakRundtFødsel(
            grunnlag.perioder,
            grunnlag.familiehendelsesdato,
            grunnlag.termindato,
        );
        const antallDagerForMye = overskridelseUttakRundtFødselAntallDager(
            perioderUttakRundtFødsel,
            grunnlag.familiehendelsesdato,
        );

        const slutterEnAvPeriodeneForSent = perioderUttakRundtFødsel.some(
            (p) => !slutterTidsperiodeInnen6UkerEtterFødsel(p.tidsperiode, grunnlag.familiehendelsesdato),
        );
        let info;
        const fraDato = formaterDatoKompakt(
            getFørsteUttaksdag2UkerFørFødsel(grunnlag.familiehendelsesdato, grunnlag.termindato),
        );
        const tilDato = formaterDatoKompakt(getSisteUttaksdag6UkerEtterFødsel(grunnlag.familiehendelsesdato));
        if (slutterEnAvPeriodeneForSent) {
            info = {
                intlKey:
                    'uttaksplan.validering.feil.farMedmorHarSøktUgyldigAntallDagerUttakRundtFødsel.periodeSlutterForSent',
                values: {
                    fraDato: fraDato,
                    tilDato: tilDato,
                },
            };
        } else {
            info = {
                intlKey: 'uttaksplan.validering.feil.farMedmorHarSøktUgyldigAntallDagerUttakRundtFødsel',
                values: {
                    fraDato: fraDato,
                    tilDato: tilDato,
                    dagerForMye: Math.abs(antallDagerForMye),
                },
            };
        }
        return {
            passerer: antallDagerForMye >= 0,
            info: info,
        };
    }

    return {
        passerer: true,
    };
};
