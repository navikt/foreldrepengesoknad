import { BulletListIcon, CalendarIcon } from '@navikt/aksel-icons';
import { FunctionComponent, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button, HStack, ToggleGroup, VStack } from '@navikt/ds-react';

import { NavnPåForeldre, SaksperiodeNy } from '@navikt/fp-types';
import { useMedia } from '@navikt/fp-utils';
import { UttaksplanKalender } from '@navikt/fp-uttaksplan-kalender-ny';
import { UttaksplanNy } from '@navikt/fp-uttaksplan-ny';

import { useGetSelectedSak } from '../../hooks/useSelectedSak';
import { RettighetType } from '../../types/RettighetType';
import { Ytelse } from '../../types/Ytelse';
import { getBarnFraSak, getFamiliehendelseDato, utledFamiliesituasjon } from '../../utils/sakerUtils';
import { KvoteOppsummering } from './KvoteOppsummering';

interface Props {
    annenPartsPerioder?: SaksperiodeNy[];
    navnPåForeldre: NavnPåForeldre;
}

export const DinPlan: FunctionComponent<Props> = ({ annenPartsPerioder, navnPåForeldre }) => {
    const gjeldendeSak = useGetSelectedSak();
    const isDesktop = useMedia('screen and (min-width: 768px)');

    const [visKalender, setVisKalender] = useState(false);

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
        <VStack gap="10">
            <HStack>
                <Button
                    className="mt-4"
                    size={isDesktop ? 'small' : 'medium'}
                    variant="secondary"
                    onClick={() => (window.location.href = 'https://www.nav.no/foreldrepenger/soknad')}
                >
                    <FormattedMessage id="DinPlan.EndrePlan" />
                </Button>
            </HStack>
            <VStack gap="10">
                <ToggleGroup
                    defaultValue={visKalender ? 'kalender' : 'plan'}
                    onChange={(value: string) => setVisKalender(value === 'kalender')}
                    fill
                >
                    <ToggleGroup.Item
                        value="plan"
                        icon={<BulletListIcon aria-hidden />}
                        label={<FormattedMessage id="DinPlan.Liste" />}
                    />
                    <ToggleGroup.Item
                        value="kalender"
                        icon={<CalendarIcon aria-hidden />}
                        label={<FormattedMessage id="DinPlan.Kalender" />}
                    />
                </ToggleGroup>
                {!visKalender && (
                    <>
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
                        <KvoteOppsummering />
                    </>
                )}
                {visKalender && (
                    <UttaksplanKalender
                        bareFarHarRett={bareFarHarRett}
                        barn={barn}
                        erFarEllerMedmor={søkerErFarEllerMedmor}
                        harAktivitetskravIPeriodeUtenUttak={harAktivitetskravIPeriodeUtenUttak}
                        søkersPerioder={getRelevantePerioder() || []}
                        annenPartsPerioder={annenPartsPerioder}
                        navnAnnenPart={søkerErFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor}
                    />
                )}
            </VStack>
        </VStack>
    );
};
