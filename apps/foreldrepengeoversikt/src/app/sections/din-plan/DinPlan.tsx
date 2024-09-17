import { FunctionComponent } from 'react';

import { BarnType } from '@navikt/fp-constants';
import { NavnPåForeldre, SaksperiodeNy } from '@navikt/fp-types';
import { UttaksplanNy } from '@navikt/fp-uttaksplan-ny';

import { RettighetType } from '../../types/RettighetType';

interface Props {
    søkersPerioder: SaksperiodeNy[] | undefined;
    annenPartsPerioder?: SaksperiodeNy[];
    familiehendelseDato: string;
    navnPåForeldre: NavnPåForeldre;
    gjelderAdopsjon: boolean;
    sakTilhørerMor: boolean;
    rettighetType: RettighetType;
}

const DinPlan: FunctionComponent<Props> = ({
    annenPartsPerioder,
    søkersPerioder,
    familiehendelseDato,
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

    return (
        <div>
            <UttaksplanNy
                barn={{
                    antallBarn: 1,
                    fødselsdatoer: ['2024-03-05'],
                    type: BarnType.FØDT,
                    termindato: '2024-03-05',
                }}
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
