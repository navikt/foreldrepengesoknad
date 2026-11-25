import { PencilIcon, PlusIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useId, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Box, Button, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { UttakPeriodeDto } from '@navikt/fp-types';
import { useBreakpoints } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../../../context/UttaksplanDataContext';
import { LeggTilPeriodeForskyvEllerErstattPanel } from '../../../../felles/forskyvEllerErstatt/LeggTilPeriodeForskyvEllerErstattPanel';
import { useVisForskyvEllerErstattPanel } from '../../../../felles/forskyvEllerErstatt/useVisForskyvEllerErstattPanel';
import { useKanKunErstatte } from '../../../../regler/alert/informasjonsAlertHooks';
import { useKnapperIRedigeringspanelSynlighet } from '../../../../regler/synlighet/knapperIRedigeringspanel';
import { useAlleUttakPerioderInklTapteDager } from '../../../../utils/lagHullPerioder';
import { erDetEksisterendePerioderEtterValgtePerioder } from '../../../../utils/periodeUtils';
import { useKalenderRedigeringContext } from '../../context/KalenderRedigeringContext';
import { finnValgtePerioder } from '../../utils/kalenderPeriodeUtils';
import { useMediaResetMinimering } from '../../utils/useMediaActions';
import { MinimerPanelKnapp } from '../MinimerPanelKnapp';
import { ValgteDagerChip } from './ValgteDagerChip';
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
        perioder,
    } = useUttaksplanData();

    const { sammenslåtteValgtePerioder, setValgtePerioder, leggTilUttaksplanPerioder, setEndredePerioder } =
        useKalenderRedigeringContext();

    const uttakPerioderInkludertTapteDager = useAlleUttakPerioderInklTapteDager();

    const { visEndreEllerForskyvPanel, setVisEndreEllerForskyvPanel } =
        useVisForskyvEllerErstattPanel(sammenslåtteValgtePerioder);

    const { visUtsettelsePanel, setVisUtsettelsePanel } = useVisUtsettelsePanel(sammenslåtteValgtePerioder);
    const { visUtsettelsePanel: visPausePanel, setVisUtsettelsePanel: setVisPausePanel } =
        useVisUtsettelsePanel(sammenslåtteValgtePerioder);

    const { isAtLeast768px } = useBreakpoints();

    const [erMinimert, setErMinimert] = useState(!isAtLeast768px);

    useMediaResetMinimering(setErMinimert);

    const innholdId = useId();

    const eksisterendePerioderSomErValgt = finnValgtePerioder(
        sammenslåtteValgtePerioder,
        uttakPerioderInkludertTapteDager,
    );

    const harPeriodeMedPleiepenger = eksisterendePerioderSomErValgt.some((p) => {
        const uttak = p.søker ?? p.annenPart;
        return uttak?.resultat?.innvilget === false && uttak.resultat.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER';
    });

    const erEksisterendePerioderEtterValgteDager = erDetEksisterendePerioderEtterValgtePerioder(
        perioder,
        sammenslåtteValgtePerioder,
    );

    const kanKunErstatte = useKanKunErstatte({
        valgtePerioder: sammenslåtteValgtePerioder,
        erFerie: true,
        erGradert: false,
    });

    const {
        skalViseUtsettelsesknapp,
        skalVisePauseknapp,
        skalViseFerieknapp,
        skalViseLeggTilKnappetekst,
        skalDeaktivereFerieknapp,
    } = useKnapperIRedigeringspanelSynlighet({
        sammenslåtteValgtePerioder,
        eksisterendePerioderSomErValgt,
    });

    const leggTilEllerForskyvPeriode = (skalForskyve: boolean) => {
        leggTilUttaksplanPerioder(
            sammenslåtteValgtePerioder.map(
                (p) =>
                    ({
                        fom: p.fom,
                        tom: p.tom,
                        søker: {
                            forelder: søker,
                            utsettelseÅrsak: 'FERIE',
                            flerbarnsdager: false,
                        },
                    }) satisfies UttakPeriodeDto,
            ),
            skalForskyve,
            () => {
                setValgtePerioder([]);
                setEndredePerioder(sammenslåtteValgtePerioder);
            },
        );
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
                <HeaderForMobil erMinimert={erMinimert} setErMinimert={setErMinimert} innholdId={innholdId} />
            </Show>

            <div id={innholdId} className="contents">
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

                            {harPeriodeMedPleiepenger && (
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
                            {!harPeriodeMedPleiepenger && (
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
                                            disabled={skalDeaktivereFerieknapp}
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
            </div>
        </VStack>
    );
};

const HeaderForDesktop = () => {
    const intl = useIntl();

    return (
        <Box background="accent-soft" padding="space-8">
            <VStack gap="space-8">
                <HStack gap="space-8" align="center" wrap={false}>
                    <PencilIcon title={intl.formatMessage({ id: 'RedigeringPanel.EndreTil' })} fontSize="1.5rem" />
                    <Heading size="small">
                        <FormattedMessage id="RedigeringPanel.EndreTil" />
                    </Heading>
                </HStack>
                <ValgteDagerChip />
            </VStack>
        </Box>
    );
};

const HeaderForMobil = ({
    erMinimert,
    setErMinimert,
    innholdId,
}: {
    erMinimert: boolean;
    setErMinimert: (value: boolean) => void;
    innholdId: string;
}) => {
    const intl = useIntl();

    return (
        <Box padding="space-12" className="bg-ax-bg-accent-soft">
            <VStack gap="space-4" align="center">
                <MinimerPanelKnapp erMinimert={erMinimert} setErMinimert={setErMinimert} kontrollerer={innholdId} />

                <HStack gap="space-8" align="center" wrap={false}>
                    <PencilIcon title={intl.formatMessage({ id: 'RedigeringPanel.EndreTil' })} fontSize="1.5rem" />
                    <HStack gap="space-32" wrap={false}>
                        <Heading size="small">
                            <FormattedMessage id="RedigeringPanel.EndreTil" />
                        </Heading>
                        {erMinimert && <ValgteDagerChip />}
                    </HStack>
                </HStack>

                {!erMinimert && <ValgteDagerChip />}
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
                icon={skalViseLeggTilKnappetekst ? <PlusIcon aria-hidden className="md:hidden" /> : undefined}
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
