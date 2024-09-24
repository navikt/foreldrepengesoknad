import { FunctionComponent } from 'react';

import { BodyLong } from '@navikt/ds-react';

import { NavnPåForeldre, SaksperiodeNy } from '@navikt/fp-types';
import { UttaksplanNy } from '@navikt/fp-uttaksplan-ny';

import { useGetSelectedSak } from '../../hooks/useSelectedSak';
import { RettighetType } from '../../types/RettighetType';
import { Ytelse } from '../../types/Ytelse';
import { getBarnFraSak, getFamiliehendelseDato } from '../../utils/sakerUtils';

interface Props {
    annenPartsPerioder?: SaksperiodeNy[];
    navnPåForeldre: NavnPåForeldre;
}

const DinPlan: FunctionComponent<Props> = ({ annenPartsPerioder, navnPåForeldre }) => {
    const gjeldendeSak = useGetSelectedSak();

    if (!gjeldendeSak || gjeldendeSak.ytelse !== Ytelse.FORELDREPENGER) {
        return null;
    }

    const søkersPerioder = gjeldendeSak.gjeldendeVedtak?.perioder;
    const perioderSomErSøktOm = gjeldendeSak.åpenBehandling?.søknadsperioder;
    const familiehendelse = gjeldendeSak.familiehendelse;
    const sakTilhørerMor = gjeldendeSak.sakTilhørerMor;
    const gjelderAdopsjon = gjeldendeSak.gjelderAdopsjon;
    const rettighetType = gjeldendeSak.rettighetType;

    const getRelevantePerioder = () => {
        return søkersPerioder ?? perioderSomErSøktOm;
    };

    const erPlanVedtatt = !!søkersPerioder;
    const søkerErFarEllerMedmor = !sakTilhørerMor;
    const bareFarHarRett = rettighetType === RettighetType.BARE_SØKER_RETT && !sakTilhørerMor;
    const erDeltUttak = rettighetType === RettighetType.BEGGE_RETT;
    const morHarRett = sakTilhørerMor && (RettighetType.BEGGE_RETT || RettighetType.BARE_SØKER_RETT);
    const søkerErAleneOmOmsorg = rettighetType === RettighetType.ALENEOMSORG;
    const harAktivitetskravIPeriodeUtenUttak = !erDeltUttak && !morHarRett && !søkerErAleneOmOmsorg;
    const familiehendelseDato = getFamiliehendelseDato(familiehendelse);
    const barn = getBarnFraSak(familiehendelse, gjelderAdopsjon);

    return (
        <>
            <div className="pt-4">
                {erPlanVedtatt && <BodyLong>Du har fått vedtatt planen nedenfor.</BodyLong>}
                {!erPlanVedtatt && <BodyLong>Du har søkt om planen nedenfor.</BodyLong>}
                {!erPlanVedtatt && <BodyLong>Planen er ikke vedtatt av NAV ennå.</BodyLong>}
            </div>
            <UttaksplanNy
                barn={barn}
                erFarEllerMedmor={søkerErFarEllerMedmor}
                familiehendelsedato={familiehendelseDato}
                navnPåForeldre={navnPåForeldre}
                annenPartsPerioder={annenPartsPerioder}
                søkersPerioder={getRelevantePerioder() || []}
                gjelderAdopsjon={gjelderAdopsjon}
                bareFarHarRett={bareFarHarRett}
                førsteUttaksdagNesteBarnsSak={undefined}
                harAktivitetskravIPeriodeUtenUttak={harAktivitetskravIPeriodeUtenUttak}
            />
        </>
    );
};

export default DinPlan;
