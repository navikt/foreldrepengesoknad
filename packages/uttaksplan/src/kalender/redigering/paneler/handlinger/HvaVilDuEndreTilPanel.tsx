import { ChevronDownIcon, ChevronUpIcon, PencilIcon, PlusIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Box, Button, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { useUttaksplanData } from '../../../../context/UttaksplanDataContext';
import { LeggTilPeriodeForskyvEllerErstattPanel } from '../../../../felles/forskyvEllerErstatt/LeggTilPeriodeForskyvEllerErstattPanel';
import { useVisForskyvEllerErstattPanel } from '../../../../felles/forskyvEllerErstatt/useVisForskyvEllerErstattPanel';
import { useKanKunErstatte } from '../../../../regler/alert/informasjonsAlertHooks';
import { useKnapperIRedigeringspanelSynlighet } from '../../../../regler/synlighet/knapperIRedigeringspanel';
import { erEøsUttakPeriode, erVanligUttakPeriode } from '../../../../types/UttaksplanPeriode';
import { getVarighetString } from '../../../../utils/dateUtils';
import { useAlleUttakPerioderInklTapteDager } from '../../../../utils/lagHullPerioder';
import { erDetEksisterendePerioderEtterValgtePerioder } from '../../../../utils/periodeUtils';
import { useKalenderRedigeringContext } from '../../context/KalenderRedigeringContext';
import { BlåRamme } from '../../utils/BlåRamme';
import { finnAntallDager, finnValgtePerioder } from '../../utils/kalenderPeriodeUtils';
import { useErDesktop, useMediaResetMinimering } from '../../utils/useMediaActions';
import { PeriodeDetaljerOgInfoMeldinger } from './eksisterende-perioder/PeriodeDetaljerOgInfoMeldinger';
import { LeggTilPausePanel } from './utsettelse/LeggTilPausePanel';
import { LeggTilUtsettelsePanel } from './utsettelse/LeggTilUtsettelsePanel';
import { useVisUtsettelsePanel } from './utsettelse/useVisUtsettelsePanel';

interface Props {
    åpneRedigeringsmodus: () => void;
    labels: React.ReactNode;
}

export const HvaVilDuEndreTilPanel = ({ åpneRedigeringsmodus, labels }: Props) => {
    const {
        foreldreInfo: { søker },
        uttakPerioder,
    } = useUttaksplanData();

    const { sammenslåtteValgtePerioder, setValgtePerioder, leggTilUttaksplanPerioder, setEndredePerioder } =
        useKalenderRedigeringContext();

    const uttakPerioderInkludertTapteDager = useAlleUttakPerioderInklTapteDager();

    const { visEndreEllerForskyvPanel, setVisEndreEllerForskyvPanel } =
        useVisForskyvEllerErstattPanel(sammenslåtteValgtePerioder);

    const { visUtsettelsePanel, setVisUtsettelsePanel } = useVisUtsettelsePanel(sammenslåtteValgtePerioder);
    const { visUtsettelsePanel: visPausePanel, setVisUtsettelsePanel: setVisPausePanel } =
        useVisUtsettelsePanel(sammenslåtteValgtePerioder);

    const erDesktop = useErDesktop();

    const [erMinimert, setErMinimert] = useState(!erDesktop);

    useMediaResetMinimering(setErMinimert);

    const eksisterendePerioderSomErValgt = finnValgtePerioder(
        sammenslåtteValgtePerioder,
        uttakPerioderInkludertTapteDager,
    );

    const harValgtEøsPeriode = eksisterendePerioderSomErValgt.some((p) => erEøsUttakPeriode(p));

    const harPeriodeMedPleiepenger = eksisterendePerioderSomErValgt.some(
        (p) =>
            erVanligUttakPeriode(p) &&
            p.resultat?.innvilget === false &&
            p.resultat.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER',
    );

    const erEksisterendePerioderEtterValgteDager = erDetEksisterendePerioderEtterValgtePerioder(
        uttakPerioder,
        sammenslåtteValgtePerioder,
    );

    const kanKunErstatte = useKanKunErstatte({
        valgtePerioder: sammenslåtteValgtePerioder,
        erFerie: true,
        erGradert: false,
    });

    const { skalViseUtsettelsesknapp, skalVisePauseknapp, skalViseFerieknapp, skalViseLeggTilKnappetekst } =
        useKnapperIRedigeringspanelSynlighet({
            sammenslåtteValgtePerioder,
            eksisterendePerioderSomErValgt,
        });

    const leggTilEllerForskyvPeriode = (skalForskyve: boolean) => {
        leggTilUttaksplanPerioder(
            sammenslåtteValgtePerioder.map(
                (p) =>
                    ({
                        forelder: søker,
                        fom: p.fom,
                        tom: p.tom,
                        utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                        flerbarnsdager: false,
                    }) satisfies UttakPeriode_fpoversikt,
            ),
            skalForskyve,
        );

        setValgtePerioder([]);
        setEndredePerioder(sammenslåtteValgtePerioder);
    };

    return (
        <VStack
            gap="space-16"
            className={erMinimert ? undefined : 'max-h-[calc(100vh-100px)] overflow-y-auto md:max-h-full'}
        >
            <Show above="md">
                <HeaderForDesktop />
            </Show>
            <Show below="md">
                <HeaderForMobil erMinimert={erMinimert} setErMinimert={setErMinimert} />
            </Show>

            {!erMinimert && visEndreEllerForskyvPanel && (
                <Box padding="space-24">
                    <LeggTilPeriodeForskyvEllerErstattPanel
                        setVisEndreEllerForskyvPanel={setVisEndreEllerForskyvPanel}
                        leggTilEllerForskyvPeriode={leggTilEllerForskyvPeriode}
                    />
                </Box>
            )}

            {!erMinimert && visUtsettelsePanel && (
                <Box className="pb-6 pr-6 pl-6">
                    <LeggTilUtsettelsePanel setVisUtsettelsePanel={setVisUtsettelsePanel} />
                </Box>
            )}
            {!erMinimert && visPausePanel && (
                <Box className="pb-6 pr-6 pl-6">
                    <LeggTilPausePanel setVisPausePanel={setVisPausePanel} />
                </Box>
            )}

            {!erMinimert && !visEndreEllerForskyvPanel && !visUtsettelsePanel && !visPausePanel && (
                <div className="block px-4 pb-4">
                    <VStack gap="space-12">
                        {labels}

                        <PeriodeDetaljerOgInfoMeldinger />

                        {(harPeriodeMedPleiepenger || harValgtEøsPeriode) && (
                            <HStack justify="end">
                                <Button
                                    type="button"
                                    variant="tertiary"
                                    size="small"
                                    onClick={() => setValgtePerioder([])}
                                >
                                    <FormattedMessage id="RedigeringPanel.LukkRedigeringsmodus" />
                                </Button>
                            </HStack>
                        )}
                        {!harPeriodeMedPleiepenger && !harValgtEøsPeriode && (
                            <HStack gap="space-12" wrap={false} className="w-full">
                                <LeggTilOgEndreKnapp
                                    åpneRedigeringsmodus={åpneRedigeringsmodus}
                                    skalViseLeggTilKnappetekst={skalViseLeggTilKnappetekst}
                                />
                                {skalViseFerieknapp && (
                                    <Button
                                        variant="secondary"
                                        size="small"
                                        className="flex-1"
                                        onClick={() =>
                                            erEksisterendePerioderEtterValgteDager && !kanKunErstatte
                                                ? setVisEndreEllerForskyvPanel(true)
                                                : leggTilEllerForskyvPeriode(false)
                                        }
                                        type="button"
                                    >
                                        {skalViseLeggTilKnappetekst ? (
                                            <FormattedMessage id="RedigeringPanel.LeggTilFerie" />
                                        ) : (
                                            <FormattedMessage id="RedigeringPanel.EndreTilFerie" />
                                        )}
                                    </Button>
                                )}
                                {skalViseUtsettelsesknapp && (
                                    <Button
                                        variant="secondary"
                                        size="small"
                                        className="flex-1"
                                        onClick={() => setVisUtsettelsePanel(true)}
                                        type="button"
                                    >
                                        <FormattedMessage id="RedigeringPanel.LeggTilUtsettelse" />
                                    </Button>
                                )}
                                {skalVisePauseknapp && (
                                    <Button
                                        variant="secondary"
                                        size="small"
                                        className="flex-1"
                                        onClick={() => setVisPausePanel(true)}
                                        type="button"
                                    >
                                        <FormattedMessage id="RedigeringPanel.LeggTilPause" />
                                    </Button>
                                )}
                            </HStack>
                        )}
                    </VStack>
                </div>
            )}
        </VStack>
    );
};

const HeaderForDesktop = () => {
    const intl = useIntl();

    const { sammenslåtteValgtePerioder } = useKalenderRedigeringContext();

    return (
        <Box background="accent-soft" padding="space-8" style={{ cursor: 'pointer' }}>
            <VStack gap="space-8">
                <HStack gap="space-8" align="center" wrap={false}>
                    <PencilIcon title={intl.formatMessage({ id: 'RedigeringPanel.EndreTil' })} fontSize="1.5rem" />
                    <Heading size="small">
                        <FormattedMessage id="RedigeringPanel.EndreTil" />
                    </Heading>
                </HStack>
                <HStack>
                    <BlåRamme>
                        <BodyShort size="small">
                            <FormattedMessage
                                id="RedigeringPanel.ValgteDager"
                                values={{
                                    varighet: getVarighetString(finnAntallDager(sammenslåtteValgtePerioder), intl),
                                }}
                            />
                        </BodyShort>
                    </BlåRamme>
                </HStack>
            </VStack>
        </Box>
    );
};

const HeaderForMobil = ({
    erMinimert,
    setErMinimert,
}: {
    erMinimert: boolean;
    setErMinimert: (value: boolean) => void;
}) => {
    const intl = useIntl();

    const { sammenslåtteValgtePerioder } = useKalenderRedigeringContext();

    return (
        <Box
            padding="space-12"
            onClick={() => setErMinimert(!erMinimert)}
            className="bg-ax-bg-accent-soft hover:bg-ax-bg-accent-moderate cursor-pointer"
        >
            <VStack gap="space-4" align="center">
                {erMinimert ? (
                    <ChevronUpIcon
                        title={intl.formatMessage({ id: 'RedigeringPanel.Maksimer' })}
                        height={24}
                        width={24}
                    />
                ) : (
                    <ChevronDownIcon
                        title={intl.formatMessage({ id: 'RedigeringPanel.Minimer' })}
                        height={24}
                        width={24}
                    />
                )}

                <HStack gap="space-8" align="center" wrap={false}>
                    <PencilIcon title={intl.formatMessage({ id: 'RedigeringPanel.EndreTil' })} fontSize="1.5rem" />
                    <HStack gap="space-32" wrap={false}>
                        <Heading size="small">
                            <FormattedMessage id="RedigeringPanel.EndreTil" />
                        </Heading>
                        {erMinimert && (
                            <Box
                                background="brand-blue-strong"
                                padding="space-2"
                                borderRadius="8"
                                width="fit-content"
                                className={'text-ax-bg-default px-2'}
                            >
                                {finnAntallDager(sammenslåtteValgtePerioder)}
                            </Box>
                        )}
                    </HStack>
                </HStack>

                {!erMinimert && (
                    <BlåRamme>
                        <FormattedMessage
                            id="RedigeringPanel.ValgteDager"
                            values={{
                                varighet: getVarighetString(finnAntallDager(sammenslåtteValgtePerioder), intl),
                            }}
                        />
                    </BlåRamme>
                )}
            </VStack>
        </Box>
    );
};

const LeggTilOgEndreKnapp = ({
    åpneRedigeringsmodus,
    skalViseLeggTilKnappetekst,
}: {
    åpneRedigeringsmodus: () => void;
    skalViseLeggTilKnappetekst: boolean;
}) => {
    const { familiehendelsedato, familiesituasjon } = useUttaksplanData();

    const { sammenslåtteValgtePerioder } = useKalenderRedigeringContext();

    const harValgtPeriodeFørFamDato = sammenslåtteValgtePerioder.some((p) =>
        dayjs(p.fom).isBefore(familiehendelsedato),
    );

    if (!(harValgtPeriodeFørFamDato && familiesituasjon === 'adopsjon')) {
        return (
            <Button
                variant="primary"
                size="small"
                onClick={åpneRedigeringsmodus}
                type="button"
                className="flex-1"
                icon={<PlusIcon aria-hidden className="md:hidden" />}
                iconPosition="left"
            >
                {skalViseLeggTilKnappetekst ? (
                    <FormattedMessage id="RedigeringPanel.NyPeriode" />
                ) : (
                    <FormattedMessage id="RedigeringPanel.RedigerUttaksplan" />
                )}
            </Button>
        );
    }

    return null;
};
