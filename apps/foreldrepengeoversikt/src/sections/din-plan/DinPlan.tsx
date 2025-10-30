import { BulletListIcon, CalendarIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Foreldrepengesak } from 'types/Sak';

import { Button, HStack, ToggleGroup, VStack } from '@navikt/ds-react';

import { NavnPåForeldre, RettighetType, SaksperiodeNy } from '@navikt/fp-types';
import { useMedia } from '@navikt/fp-utils';
import {
    KvoteOppsummeringWrapper,
    UttaksplanDataProvider,
    UttaksplanKalender,
    UttaksplanNy,
} from '@navikt/fp-uttaksplan-ny';

import { hentUttaksKontoOptions } from '../../api/api';
import { useGetSelectedSak } from '../../hooks/useSelectedSak';
import { getBarnFraSak } from '../../utils/sakerUtils';

interface Props {
    navnPåForeldre: NavnPåForeldre;
    annenPartsPerioder: SaksperiodeNy[];
}

export const DinPlan = ({ annenPartsPerioder, navnPåForeldre }: Props) => {
    const gjeldendeSak = useGetSelectedSak();
    const isDesktop = useMedia('screen and (min-width: 768px)');

    const [visKalender, setVisKalender] = useState(false);

    const harFpSak = gjeldendeSak && gjeldendeSak.ytelse === 'FORELDREPENGER';

    const sak: Foreldrepengesak = harFpSak ? gjeldendeSak : ({} as Foreldrepengesak);

    const kontoQuery = useQuery({
        ...hentUttaksKontoOptions({
            brukerrolle: sak?.forelder === 'MOR' ? 'MOR' : 'FAR',
            morHarUføretrygd: sak?.morUføretrygd,
            rettighetstype: sak?.rettighetType,
            omsorgsovertakelseDato: sak?.familiehendelse.omsorgsovertakelse,
            antallBarn: sak?.familiehendelse.antallBarn,
            termindato: sak?.familiehendelse.termindato,
            // Fødselsdato trumfer omsorgsovertakelseDato i APIet
            fødselsdato: sak?.familiehendelse.omsorgsovertakelse ? undefined : sak.familiehendelse.fødselsdato,
        }),
        enabled: harFpSak,
    });
    const konto = sak.dekningsgrad === 'HUNDRE' ? kontoQuery.data?.['100'] : kontoQuery.data?.['80'];

    if (!harFpSak || !konto) {
        return null;
    }

    const getAnnenPartsPerioder = () => {
        const perioderAnnenPartEØS = sak.gjeldendeVedtak?.perioderAnnenpartEøs;

        if (perioderAnnenPartEØS && perioderAnnenPartEØS.length > 0) {
            return perioderAnnenPartEØS as SaksperiodeNy[];
        }

        return annenPartsPerioder;
    };

    const søkersPerioder = sak.gjeldendeVedtak?.perioder;
    const perioderSomErSøktOm = sak.åpenBehandling?.søknadsperioder;
    const familiehendelse = sak.familiehendelse;
    const sakTilhørerMor = sak.sakTilhørerMor;
    const gjelderAdopsjon = sak.gjelderAdopsjon;
    const rettighetType = sak.rettighetType;
    const sakAvsluttet = sak.sakAvsluttet;

    const relevantePerioder = (søkersPerioder ?? perioderSomErSøktOm ?? []) as SaksperiodeNy[]; // TODO: fiks enum vs unions
    const søkerErFarEllerMedmor = !sakTilhørerMor;
    const bareFarMedmorHarRett = rettighetType === RettighetType.BARE_SØKER_RETT && !sakTilhørerMor;
    const erDeltUttak = rettighetType === RettighetType.BEGGE_RETT;
    const morHarRett = sakTilhørerMor && (RettighetType.BEGGE_RETT || RettighetType.BARE_SØKER_RETT);
    const søkerErAleneOmOmsorg = rettighetType === RettighetType.ALENEOMSORG;
    const harAktivitetskravIPeriodeUtenUttak = !erDeltUttak && !morHarRett && !søkerErAleneOmOmsorg;
    const barn = getBarnFraSak(familiehendelse, gjelderAdopsjon);
    const relevanteAnnenPartsPerioder = getAnnenPartsPerioder();

    return (
        <VStack gap="space-40">
            {!sakAvsluttet && (
                <HStack>
                    <Button
                        className="mt-4"
                        size={isDesktop ? 'small' : 'medium'}
                        variant="secondary"
                        onClick={() => (globalThis.location.href = 'https://www.nav.no/foreldrepenger/soknad')}
                    >
                        <FormattedMessage id="DinPlan.EndrePlan" />
                    </Button>
                </HStack>
            )}

            <VStack gap="space-40">
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
                <UttaksplanDataProvider
                    barn={barn}
                    erFarEllerMedmor={søkerErFarEllerMedmor}
                    navnPåForeldre={navnPåForeldre}
                    modus="innsyn"
                    valgtStønadskonto={konto}
                    aleneOmOmsorg={søkerErAleneOmOmsorg}
                    erMedmorDelAvSøknaden={false}
                    bareFarMedmorHarRett={bareFarMedmorHarRett}
                    harAktivitetskravIPeriodeUtenUttak={harAktivitetskravIPeriodeUtenUttak}
                    erDeltUttak={erDeltUttak}
                >
                    {!visKalender && (
                        <>
                            <UttaksplanNy
                                saksperioder={relevantePerioder.concat(relevanteAnnenPartsPerioder)}
                                handleOnPlanChange={() => null}
                            />
                            <KvoteOppsummeringWrapper
                                saksperioder={relevantePerioder.concat(relevanteAnnenPartsPerioder)}
                                rettighetType={sak.rettighetType}
                                visStatusIkoner={false}
                            />
                        </>
                    )}
                    {visKalender && (
                        <UttaksplanKalender
                            readOnly={true}
                            saksperioder={relevantePerioder.concat(relevanteAnnenPartsPerioder)}
                        />
                    )}
                </UttaksplanDataProvider>
            </VStack>
        </VStack>
    );
};
