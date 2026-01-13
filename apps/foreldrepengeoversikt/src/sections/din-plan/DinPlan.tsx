import { BulletListIcon, CalendarIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Foreldrepengesak } from 'types/Sak';

import { Button, HStack, ToggleGroup, VStack } from '@navikt/ds-react';

import {
    BrukerRolleSak_fpoversikt,
    NavnPåForeldre,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { useMedia } from '@navikt/fp-utils';
import {
    KvoteOppsummering,
    UttaksplanDataProvider,
    UttaksplanKalender,
    UttaksplanListe,
} from '@navikt/fp-uttaksplan-ny';

import { hentUttaksKontoOptions } from '../../api/queries';
import { useGetSelectedSak } from '../../hooks/useSelectedSak';
import { getBarnFraSak } from '../../utils/sakerUtils';

interface Props {
    navnPåForeldre: NavnPåForeldre;
    annenPartsPerioder: UttakPeriode_fpoversikt[];
}

// TODO (TOR) Send heller med gjeldendeSak som prop
export const DinPlan = ({ annenPartsPerioder, navnPåForeldre }: Props) => {
    const gjeldendeSak = useGetSelectedSak();

    if (gjeldendeSak?.ytelse !== 'FORELDREPENGER') {
        return null;
    }

    return <DinPlanMedSak annenPartsPerioder={annenPartsPerioder} navnPåForeldre={navnPåForeldre} sak={gjeldendeSak} />;
};

const DinPlanMedSak = ({ annenPartsPerioder, navnPåForeldre, sak }: Props & { sak: Foreldrepengesak }) => {
    const isDesktop = useMedia('screen and (min-width: 768px)');

    const [visKalender, setVisKalender] = useState(false);

    const kontoQuery = useQuery(
        hentUttaksKontoOptions({
            brukerrolle: sak.forelder === 'MOR' ? 'MOR' : 'FAR',
            morHarUføretrygd: sak.morUføretrygd,
            rettighetstype: sak.rettighetType,
            omsorgsovertakelseDato: sak.familiehendelse.omsorgsovertakelse,
            antallBarn: sak.familiehendelse.antallBarn,
            termindato: sak.familiehendelse.termindato,
            // Fødselsdato trumfer omsorgsovertakelseDato i APIet
            fødselsdato: sak.familiehendelse.omsorgsovertakelse ? undefined : sak.familiehendelse.fødselsdato,
        }),
    );
    const konto = sak.dekningsgrad === 'HUNDRE' ? kontoQuery.data?.['100'] : kontoQuery.data?.['80'];

    if (!konto) {
        return null;
    }

    const søkersPerioder = sak.gjeldendeVedtak?.perioder;
    const perioderSomErSøktOm = sak.åpenBehandling?.søknadsperioder;
    const familiehendelse = sak.familiehendelse;
    const sakTilhørerMor = sak.sakTilhørerMor;
    const gjelderAdopsjon = sak.gjelderAdopsjon;
    const rettighetType = sak.rettighetType;
    const sakAvsluttet = sak.sakAvsluttet;

    const relevantePerioder = søkersPerioder ?? perioderSomErSøktOm ?? [];
    const erDeltUttak = rettighetType === 'BEGGE_RETT';
    const morHarRett = sakTilhørerMor && (rettighetType === 'BEGGE_RETT' || rettighetType === 'BARE_SØKER_RETT');
    const søkerErAleneOmOmsorg = rettighetType === 'ALENEOMSORG';
    const harAktivitetskravIPeriodeUtenUttak = !erDeltUttak && !morHarRett && !søkerErAleneOmOmsorg;
    const barn = getBarnFraSak(familiehendelse, gjelderAdopsjon);

    const perioderAnnenPartEØS = sak.gjeldendeVedtak?.perioderAnnenpartEøs;
    const relevanteAnnenPartsPerioder =
        perioderAnnenPartEØS && perioderAnnenPartEØS.length > 0 ? perioderAnnenPartEØS : annenPartsPerioder;

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
                    uttakPerioder={leggTilForelderIPerioder(
                        relevantePerioder,
                        relevanteAnnenPartsPerioder,
                        sakTilhørerMor,
                    )}
                    barn={barn}
                    foreldreInfo={{
                        søker: sakTilhørerMor ? 'MOR' : 'FAR_ELLER_MEDMOR',
                        navnPåForeldre: navnPåForeldre,
                        erMedmorDelAvSøknaden: false,
                        rettighetType,
                    }}
                    valgtStønadskonto={konto}
                    harAktivitetskravIPeriodeUtenUttak={harAktivitetskravIPeriodeUtenUttak}
                >
                    {!visKalender && (
                        <>
                            <UttaksplanListe isReadOnly />
                            <KvoteOppsummering erInnsyn visStatusIkoner={false} />
                        </>
                    )}
                    {visKalender && <UttaksplanKalender readOnly={true} />}
                </UttaksplanDataProvider>
            </VStack>
        </VStack>
    );
};

// TODO (TOR) Burde kunne setta forelder backend og så fjerna denne koden
const leggTilForelderIPerioder = (
    søkersPerioder: UttakPeriode_fpoversikt[],
    annenPartsPerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    sakTilhørerMor: boolean,
): Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> => {
    return leggTilForelderOmMangler(søkersPerioder, sakTilhørerMor ? 'MOR' : 'FAR_MEDMOR').concat(
        leggTilForelderOmMangler(annenPartsPerioder, sakTilhørerMor ? 'FAR_MEDMOR' : 'MOR'),
    );
};

const leggTilForelderOmMangler = (
    perioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    forelder: BrukerRolleSak_fpoversikt,
) => {
    return perioder.map((periode) => {
        if ('trekkdager' in periode || periode.forelder !== undefined) {
            return periode;
        }
        return {
            ...periode,
            forelder,
        };
    });
};
