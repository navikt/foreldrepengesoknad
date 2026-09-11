import { BulletListIcon, CalendarIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Foreldrepengesak } from 'types/Sak';

import { Button, HStack, ToggleGroup, VStack } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-types';
import { useMedia } from '@navikt/fp-utils';
import { KvoteOppsummering, UttaksplanDataProvider, UttaksplanKalender, UttaksplanListe } from '@navikt/fp-uttaksplan';

import { hentUttakskvoteOptions } from '../../api/queries';
import { useUttaksplan } from '../../hooks/useUttaksplan';
import { getBarnFraSak } from '../../utils/sakerUtils';

interface Props {
    sak: Foreldrepengesak;
    navnPåForeldre: NavnPåForeldre;
}

export const DinPlan = ({ navnPåForeldre, sak }: Props) => {
    const isDesktop = useMedia('screen and (min-width: 768px)');

    const [visKalender, setVisKalender] = useState(false);

    const kontoQuery = useQuery(
        hentUttakskvoteOptions({
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

    // Prototype: /uttaksplan-endepunktet i fp-oversikt er enno ikkje utrulla (sjå useUttaksplan),
    // så `uttaksplanQuery.data` vil i praksis vera undefined heilt til det skjer. Me viser difor
    // ingenting for denne seksjonen inntil då.
    const uttaksplanQuery = useUttaksplan(sak);

    if (!konto || !uttaksplanQuery.data) {
        return null;
    }

    const familiehendelse = sak.familiehendelse;
    const sakTilhørerMor = sak.sakTilhørerMor;
    const gjelderAdopsjon = sak.gjelderAdopsjon;
    const rettighetType = sak.rettighetType;
    const sakAvsluttet = sak.sakAvsluttet;
    const erEndringssøknad = uttaksplanQuery.data.perioder.some(
        (periode) => periode.søker?.resultat !== undefined || periode.annenPart?.resultat !== undefined,
    );

    const erDeltUttak = rettighetType === 'BEGGE_RETT';
    const morHarRett = sakTilhørerMor && (rettighetType === 'BEGGE_RETT' || rettighetType === 'BARE_SØKER_RETT');
    const søkerErAleneOmOmsorg = rettighetType === 'ALENEOMSORG';
    const harAktivitetskravIPeriodeUtenUttak = !erDeltUttak && !morHarRett && !søkerErAleneOmOmsorg;
    const barn = getBarnFraSak(familiehendelse, gjelderAdopsjon);

    return (
        <VStack gap="space-40">
            {!sakAvsluttet && (
                <HStack>
                    <Button
                        className="mt-4"
                        size={isDesktop ? 'small' : 'medium'}
                        variant="secondary"
                        onClick={() => location.assign('https://www.nav.no/foreldrepenger/soknad')}
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
                    perioder={uttaksplanQuery.data.perioder}
                    barn={barn}
                    foreldreInfo={{
                        søker: sakTilhørerMor ? 'MOR' : 'FAR_MEDMOR',
                        navnPåForeldre: navnPåForeldre,
                        erMedmorDelAvSøknaden: false,
                        rettighetType,
                    }}
                    valgtStønadskvote={konto}
                    harAktivitetskravIPeriodeUtenUttak={harAktivitetskravIPeriodeUtenUttak}
                    erPeriodeneTilAnnenPartLåst={false}
                    erEndringssøknad={erEndringssøknad}
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
