import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import { Box, Chips, HStack, Show, VStack } from '@navikt/ds-react';

import { MinimerRedigeringspanelKnapp } from '../../../../felles/MinimerRedigeringspanelKnapp';
import { UtvidIkonKnapp } from '../../../../felles/UtvidIkonKnapp';
import { getVarighetString } from '../../../../utils/dateUtils';
import { useKalenderRedigeringContext } from '../../context/KalenderRedigeringContext';
import { finnAntallDager } from '../../utils/kalenderPeriodeUtils';
import { useMediaRemoveScrollingOnMobile, useMediaResetMinimering } from '../../utils/useMediaActions';
import { LeggTilEllerEndrePeriodeForm } from './LeggTilEllerEndrePeriodeForm';
import { PeriodeDetaljerOgInfoMeldinger } from './eksisterende-perioder/PeriodeDetaljerOgInfoMeldinger';

interface Props {
    lukkRedigeringsmodus: () => void;
    labels: React.ReactNode;
}

export const LeggTilEllerEndrePeriodePanel = ({ lukkRedigeringsmodus, labels }: Props) => {
    const [erMinimert, setErMinimert] = useState(false);

    useMediaResetMinimering(setErMinimert);
    useMediaRemoveScrollingOnMobile(erMinimert);

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
                <HeaderMobil labels={labels} erMinimert={erMinimert} setErMinimert={setErMinimert} />
            </Show>
            <div className={erMinimert ? 'hidden' : 'block px-4 pb-4'}>
                <div className={erMinimert ? 'hidden' : 'block'}>
                    <div className="px-4 pt-4 pb-4">
                        <LeggTilEllerEndrePeriodeForm lukkRedigeringsmodus={lukkRedigeringsmodus} />
                    </div>
                </div>
            </div>
        </VStack>
    );
};

const HeaderDesktop = ({ labels }: { labels: React.ReactNode }) => {
    const intl = useIntl();

    const { sammenslåtteValgtePerioder, setValgtePerioder } = useKalenderRedigeringContext();

    const [visPeriodeDetaljer, setVisPeriodeDetaljer] = useState(false);

    return (
        <Box background="accent-soft" padding="space-16">
            <VStack gap="space-16">
                <HStack justify="space-between" align="center" wrap={false}>
                    <Chips size="small">
                        <Chips.Removable onDelete={() => setValgtePerioder([])} onClick={(e) => e.stopPropagation()}>
                            {intl.formatMessage(
                                { id: 'RedigeringPanel.ValgteDager' },
                                {
                                    varighet: getVarighetString(finnAntallDager(sammenslåtteValgtePerioder), intl),
                                },
                            )}
                        </Chips.Removable>
                    </Chips>
                    <UtvidIkonKnapp
                        ikon={
                            visPeriodeDetaljer ? (
                                <ChevronUpIcon aria-hidden fontSize="1.5rem" />
                            ) : (
                                <ChevronDownIcon aria-hidden fontSize="1.5rem" />
                            )
                        }
                        label={intl.formatMessage({ id: 'RedigeringPanel.Periodeinformasjon' })}
                        erUtvidet={visPeriodeDetaljer}
                        onClick={() => setVisPeriodeDetaljer(!visPeriodeDetaljer)}
                    />
                </HStack>
                {labels}
                {visPeriodeDetaljer && <PeriodeDetaljerOgInfoMeldinger />}
            </VStack>
        </Box>
    );
};

const HeaderMobil = ({
    labels,
    erMinimert,
    setErMinimert,
}: {
    labels: React.ReactNode;
    erMinimert: boolean;
    setErMinimert: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const intl = useIntl();

    const { sammenslåtteValgtePerioder, setValgtePerioder } = useKalenderRedigeringContext();

    return (
        <VStack>
            <Box
                padding="space-12"
                onClick={() => setErMinimert(!erMinimert)}
                className="bg-ax-bg-accent-soft hover:bg-ax-bg-accent-moderate cursor-pointer"
            >
                <VStack gap="space-4" align="center">
                    <MinimerRedigeringspanelKnapp erMinimert={erMinimert} setErMinimert={setErMinimert} />

                    <Chips size="small">
                        <Chips.Removable onDelete={() => setValgtePerioder([])} onClick={(e) => e.stopPropagation()}>
                            {intl.formatMessage(
                                { id: 'RedigeringPanel.ValgteDager' },
                                {
                                    varighet: getVarighetString(finnAntallDager(sammenslåtteValgtePerioder), intl),
                                },
                            )}
                        </Chips.Removable>
                    </Chips>
                </VStack>
            </Box>
            <Box className="bg-ax-bg-accent-soft">
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
