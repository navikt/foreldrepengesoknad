import { FunctionComponent } from 'react';

import { NavnPåForeldre, SaksperiodeNy } from '@navikt/fp-types';
import { UttaksplanNy } from '@navikt/fp-uttaksplan-ny';

import { Familiehendelse } from '../../types/Familiehendelse';
import { RettighetType } from '../../types/RettighetType';
import { getBarnFraSak, getFamiliehendelseDato } from '../../utils/sakerUtils';

interface Props {
    søkersPerioder: SaksperiodeNy[] | undefined;
    annenPartsPerioder?: SaksperiodeNy[];
    familiehendelse: Familiehendelse;
    navnPåForeldre: NavnPåForeldre;
    gjelderAdopsjon: boolean;
    sakTilhørerMor: boolean;
    rettighetType: RettighetType;
}

const DinPlan: FunctionComponent<Props> = ({
    annenPartsPerioder,
    søkersPerioder,
    familiehendelse,
    navnPåForeldre,
    gjelderAdopsjon,
    sakTilhørerMor,
    rettighetType,
}) => {
    const søkerErFarEllerMedmor = !sakTilhørerMor;
    const bareFarHarRett = rettighetType === RettighetType.BARE_SØKER_RETT && !sakTilhørerMor;
    const erDeltUttak = rettighetType === RettighetType.BEGGE_RETT;
    const morHarRett = sakTilhørerMor && (RettighetType.BEGGE_RETT || RettighetType.BARE_SØKER_RETT);
    const søkerErAleneOmOmsorg = rettighetType === RettighetType.ALENEOMSORG;
    const harAktivitetskravIPeriodeUtenUttak = !erDeltUttak && !morHarRett && !søkerErAleneOmOmsorg;
    const familiehendelseDato = getFamiliehendelseDato(familiehendelse);
    const barn = getBarnFraSak(familiehendelse, gjelderAdopsjon);

    return (
        <div>
            <UttaksplanNy
                barn={barn}
                erFarEllerMedmor={søkerErFarEllerMedmor}
                familiehendelsedato={familiehendelseDato}
                navnPåForeldre={navnPåForeldre}
                annenPartsPerioder={annenPartsPerioder}
                søkersPerioder={søkersPerioder || []}
                gjelderAdopsjon={gjelderAdopsjon}
                bareFarHarRett={bareFarHarRett}
                førsteUttaksdagNesteBarnsSak={undefined}
                harAktivitetskravIPeriodeUtenUttak={harAktivitetskravIPeriodeUtenUttak}
            />
        </div>
    );
};

export default DinPlan;
