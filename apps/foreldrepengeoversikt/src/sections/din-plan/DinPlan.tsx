import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from '@navikt/ds-react';

import { NavnPåForeldre, SaksperiodeNy } from '@navikt/fp-types';
import { useMedia } from '@navikt/fp-utils';
import { UttaksplanNy } from '@navikt/fp-uttaksplan-ny';

import { useGetSelectedSak } from '../../hooks/useSelectedSak';
import { RettighetType } from '../../types/RettighetType';
import { Ytelse } from '../../types/Ytelse';
import { getBarnFraSak, getFamiliehendelseDato, utledFamiliesituasjon } from '../../utils/sakerUtils';

interface Props {
    annenPartsPerioder?: SaksperiodeNy[];
    navnPåForeldre: NavnPåForeldre;
}

const DinPlan: FunctionComponent<Props> = ({ annenPartsPerioder, navnPåForeldre }) => {
    const gjeldendeSak = useGetSelectedSak();
    const isDesktop = useMedia('screen and (min-width: 768px)');

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

    const søkerErFarEllerMedmor = !sakTilhørerMor;
    const bareFarHarRett = rettighetType === RettighetType.BARE_SØKER_RETT && !sakTilhørerMor;
    const erDeltUttak = rettighetType === RettighetType.BEGGE_RETT;
    const morHarRett = sakTilhørerMor && (RettighetType.BEGGE_RETT || RettighetType.BARE_SØKER_RETT);
    const søkerErAleneOmOmsorg = rettighetType === RettighetType.ALENEOMSORG;
    const harAktivitetskravIPeriodeUtenUttak = !erDeltUttak && !morHarRett && !søkerErAleneOmOmsorg;
    const familiehendelseDato = getFamiliehendelseDato(familiehendelse);
    const barn = getBarnFraSak(familiehendelse, gjelderAdopsjon);
    const familiesituasjon = utledFamiliesituasjon(familiehendelse, gjelderAdopsjon);

    return (
        <>
            <Button
                className="mt-4"
                size={isDesktop ? 'small' : 'medium'}
                variant="secondary"
                onClick={() => (window.location.href = 'https://www.nav.no/foreldrepenger/soknad')}
            >
                <FormattedMessage id="DinPlan.EndrePlan" />
            </Button>
            <UttaksplanNy
                barn={barn}
                erFarEllerMedmor={søkerErFarEllerMedmor}
                familiehendelsedato={familiehendelseDato}
                navnPåForeldre={navnPåForeldre}
                annenPartsPerioder={annenPartsPerioder}
                søkersPerioder={getRelevantePerioder() || []}
                gjelderAdopsjon={gjelderAdopsjon}
                bareFarHarRett={bareFarHarRett}
                familiesituasjon={familiesituasjon}
                førsteUttaksdagNesteBarnsSak={undefined}
                harAktivitetskravIPeriodeUtenUttak={harAktivitetskravIPeriodeUtenUttak}
            />
        </>
    );
};

export default DinPlan;
