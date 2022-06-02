import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';
import { formaterDatoKompakt } from 'app/utils/dateUtils';
import { Periode } from 'uttaksplan/types/Periode';
import {
    getFarMedmorUttakRundtFødsel,
    getFørsteUttaksdag2UkerFørFødsel,
    getSisteUttaksdag6UkerEtterFødsel,
    gjelderWLBReglerFarMedmorRundtFødsel,
} from 'app/utils/wlbUtils';
import { getSumUttaksdagerÅTrekkeIPeriodene } from 'app/steps/uttaksplan-info/utils/Periodene';
import { ANTALL_UTTAKSDAGER_FAR_MEDMOR_RUNDT_FØDSEL } from 'app/utils/wlbUtils';
import dayjs from 'dayjs';

const overskridelseUttakRundtFødselAntallDager = (
    perioderRundtFødsel: Periode[],
    familiehendelsesdato: Date
): number => {
    const sisteUttak6UkerEtterFødsel = getSisteUttaksdag6UkerEtterFødsel(familiehendelsesdato);
    const perioderAvkortetTilÅSlutte6UkerEtterFødsel = perioderRundtFødsel.map((p) =>
        dayjs(p.tidsperiode.tom).isAfter(dayjs(sisteUttak6UkerEtterFødsel))
            ? { ...p, tidsperiode: { fom: p.tidsperiode.fom, tom: sisteUttak6UkerEtterFødsel } }
            : p
    );
    const antallDager = getSumUttaksdagerÅTrekkeIPeriodene(perioderAvkortetTilÅSlutte6UkerEtterFødsel);
    return ANTALL_UTTAKSDAGER_FAR_MEDMOR_RUNDT_FØDSEL - antallDager;
};

export const farMedmorHarSøktUgyldigAntallDagerUttakRundtFødselTest: RegelTest = (
    grunnlag: Søknadsinfo
): RegelTestresultat => {
    if (
        gjelderWLBReglerFarMedmorRundtFødsel(
            grunnlag.familiehendelsesdato,
            grunnlag.søkerErFarEllerMedmor,
            grunnlag.morHarRett,
            grunnlag.søkersituasjon.situasjon
        )
    ) {
        const perioderUttakRundtFødsel = getFarMedmorUttakRundtFødsel(
            grunnlag.perioder,
            grunnlag.familiehendelsesdato,
            grunnlag.termindato
        );
        const antallDagerForMye = overskridelseUttakRundtFødselAntallDager(
            perioderUttakRundtFødsel,
            grunnlag.familiehendelsesdato
        );
        return {
            passerer: antallDagerForMye >= 0,
            info: {
                intlKey: 'uttaksplan.validering.feil.farMedmorHarSøktUgyldigAntallDagerUttakRundtFødsel',
                values: {
                    fraDato: formaterDatoKompakt(
                        getFørsteUttaksdag2UkerFørFødsel(grunnlag.familiehendelsesdato, grunnlag.termindato)
                    ),
                    tilDato: formaterDatoKompakt(getSisteUttaksdag6UkerEtterFødsel(grunnlag.familiehendelsesdato)),
                    dagerForMye: Math.abs(antallDagerForMye),
                },
            },
        };
    }

    return {
        passerer: true,
    };
};
