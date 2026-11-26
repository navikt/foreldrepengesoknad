import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { useId, useState } from 'react';
import { useIntl } from 'react-intl';

import { Box, Button, HStack, Show, VStack } from '@navikt/ds-react';

import { useMediaRemoveScrollingOnMobile, useMediaResetMinimering } from '../../utils/useMediaActions';
import { MinimerPanelKnapp } from '../MinimerPanelKnapp';
import { LeggTilEllerEndrePeriodeForm } from './LeggTilEllerEndrePeriodeForm';
import { ValgteDagerChip } from './ValgteDagerChip';
import { PeriodeDetaljerOgInfoMeldinger } from './eksisterende-perioder/PeriodeDetaljerOgInfoMeldinger';

interface Props {
    lukkRedigeringsmodus: () => void;
    labels: React.ReactNode;
}

export const LeggTilEllerEndrePeriodePanel = ({ lukkRedigeringsmodus, labels }: Props) => {
    const [erMinimert, setErMinimert] = useState(false);

    useMediaResetMinimering(setErMinimert);
    useMediaRemoveScrollingOnMobile(erMinimert);

    const skjemaId = useId();

    return (
        <VStack
            gap="space-2"
            className={
                erMinimert
                    ? undefined
                    : 'bg-ax-bg-default fixed inset-0 z-50 overflow-y-auto md:static md:max-h-[calc(100vh-100px)] md:overflow-visible'
            }
        >
            <Show above="md">
                <HeaderDesktop labels={labels} />
            </Show>
            <Show below="md">
                <HeaderMobil
                    labels={labels}
                    erMinimert={erMinimert}
                    setErMinimert={setErMinimert}
                    skjemaId={skjemaId}
                />
            </Show>
            <div id={skjemaId} className={erMinimert ? 'hidden' : 'block px-4 pb-4'}>
                <div className="px-4 pt-4 pb-4">
                    <LeggTilEllerEndrePeriodeForm lukkRedigeringsmodus={lukkRedigeringsmodus} />
                </div>
            </div>
        </VStack>
    );
};

const HeaderDesktop = ({ labels }: { labels: React.ReactNode }) => {
    const intl = useIntl();

    const [visPeriodeDetaljer, setVisPeriodeDetaljer] = useState(false);

    const detaljerId = useId();

    return (
        <Box background="accent-soft" padding="space-16">
            <VStack gap="space-16">
                <HStack justify="space-between" align="center" wrap={false}>
                    <ValgteDagerChip />
                    <Button
                        type="button"
                        variant="tertiary-neutral"
                        size="small"
                        aria-label={
                            visPeriodeDetaljer
                                ? intl.formatMessage({ id: 'RedigeringPanel.SkjulDetaljer' })
                                : intl.formatMessage({ id: 'RedigeringPanel.VisDetaljer' })
                        }
                        aria-expanded={visPeriodeDetaljer}
                        aria-controls={detaljerId}
                        icon={
                            visPeriodeDetaljer ? (
                                <ChevronUpIcon aria-hidden fontSize="1.5rem" />
                            ) : (
                                <ChevronDownIcon aria-hidden fontSize="1.5rem" />
                            )
                        }
                        onClick={() => setVisPeriodeDetaljer(!visPeriodeDetaljer)}
                    />
                </HStack>
                {labels}
                <div id={detaljerId} className="contents">
                    {visPeriodeDetaljer && <PeriodeDetaljerOgInfoMeldinger />}
                </div>
            </VStack>
        </Box>
    );
};

const HeaderMobil = ({
    labels,
    erMinimert,
    setErMinimert,
    skjemaId,
}: {
    labels: React.ReactNode;
    erMinimert: boolean;
    setErMinimert: (erMinimert: boolean) => void;
    skjemaId: string;
}) => {
    const detaljerId = useId();

    return (
        <VStack>
            <Box padding="space-12" className="bg-ax-bg-accent-soft">
                <VStack gap="space-4" align="center">
                    <MinimerPanelKnapp
                        erMinimert={erMinimert}
                        setErMinimert={setErMinimert}
                        kontrollerer={`${detaljerId} ${skjemaId}`}
                    />
                    <ValgteDagerChip />
                </VStack>
            </Box>
            <Box id={detaljerId} className="bg-ax-bg-accent-soft">
                {!erMinimert && (
                    <VStack gap="space-16" className="px-4 pb-4">
                        {labels}
                        <PeriodeDetaljerOgInfoMeldinger />
                    </VStack>
                )}
            </Box>
        </VStack>
    );
};
