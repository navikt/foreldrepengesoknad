import { BulletListIcon, CalendarIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button, HStack, ToggleGroup, VStack } from '@navikt/ds-react';

import { NavnPåForeldre, RettighetType, SaksperiodeNy } from '@navikt/fp-types';
import { useMedia } from '@navikt/fp-utils';
import { UttaksplanKalender } from '@navikt/fp-uttaksplan-kalender-ny';
import { UttaksplanNy } from '@navikt/fp-uttaksplan-ny';

import { useGetSelectedSak } from '../../hooks/useSelectedSak';
import { getBarnFraSak, getFamiliehendelseDato, utledFamiliesituasjon } from '../../utils/sakerUtils';
import { KvoteOversikt } from './KvoteOppsummering';

interface Props {
    navnPåForeldre: NavnPåForeldre;
    annenPartsPerioder: SaksperiodeNy[];
}

export const DinPlan = ({ annenPartsPerioder, navnPåForeldre }: Props) => {
    const gjeldendeSak = useGetSelectedSak();
    const isDesktop = useMedia('screen and (min-width: 768px)');

    const [visKalender, setVisKalender] = useState(false);

    if (!gjeldendeSak || gjeldendeSak.ytelse !== 'FORELDREPENGER') {
        return null;
    }

    const søkersPerioder = gjeldendeSak.gjeldendeVedtak?.perioder;
    const perioderSomErSøktOm = gjeldendeSak.åpenBehandling?.søknadsperioder;
    const familiehendelse = gjeldendeSak.familiehendelse;
    const sakTilhørerMor = gjeldendeSak.sakTilhørerMor;
    const gjelderAdopsjon = gjeldendeSak.gjelderAdopsjon;
    const rettighetType = gjeldendeSak.rettighetType;
    const sakAvsluttet = gjeldendeSak.sakAvsluttet;

    const relevantePerioder = (søkersPerioder ?? perioderSomErSøktOm ?? []) as SaksperiodeNy[]; // TODO: fiks enum vs unions
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
            {!sakAvsluttet && (
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
            )}

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
                            søkersPerioder={relevantePerioder}
                            gjelderAdopsjon={gjelderAdopsjon}
                            bareFarHarRett={bareFarHarRett}
                            familiesituasjon={familiesituasjon}
                            førsteUttaksdagNesteBarnsSak={undefined}
                            harAktivitetskravIPeriodeUtenUttak={harAktivitetskravIPeriodeUtenUttak}
                            modus="innsyn"
                            handleOnPlanChange={() => null}
                            valgtStønadskonto={{} as any}
                        />
                        <KvoteOversikt />
                    </>
                )}
                {visKalender && (
                    <UttaksplanKalender
                        bareFarHarRett={bareFarHarRett}
                        barn={barn}
                        erFarEllerMedmor={søkerErFarEllerMedmor}
                        harAktivitetskravIPeriodeUtenUttak={harAktivitetskravIPeriodeUtenUttak}
                        søkersPerioder={relevantePerioder}
                        annenPartsPerioder={annenPartsPerioder}
                        navnAnnenPart={søkerErFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor}
                    />
                )}
            </VStack>
        </VStack>
    );
};
