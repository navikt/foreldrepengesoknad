import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Box, HStack, Heading, Show, VStack } from '@navikt/ds-react';

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
    const [erForskyvEllerErstattPanelvisningPå, setErForskyvEllerErstattPanelvisningPå] = useState(false);

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
                <HeaderDesktop
                    labels={labels}
                    erForskyvEllerErstattPanelvisningPå={erForskyvEllerErstattPanelvisningPå}
                    setErForskyvEllerErstattPanelvisningPå={setErForskyvEllerErstattPanelvisningPå}
                />
            </Show>
            <Show below="md">
                <HeaderMobil
                    labels={labels}
                    erMinimert={erMinimert}
                    setErMinimert={setErMinimert}
                    erForskyvEllerErstattPanelvisningPå={erForskyvEllerErstattPanelvisningPå}
                    setErForskyvEllerErstattPanelvisningPå={setErForskyvEllerErstattPanelvisningPå}
                />
            </Show>
            {!erForskyvEllerErstattPanelvisningPå && (
                <div className={erMinimert ? 'hidden' : 'block px-4 pb-4'}>
                    <div className={erMinimert ? 'hidden' : 'block'}>
                        <div className="px-4 pt-4 pb-4">
                            <LeggTilEllerEndrePeriodeForm lukkRedigeringsmodus={lukkRedigeringsmodus} />
                        </div>
                    </div>
                </div>
            )}
        </VStack>
    );
};

const HeaderDesktop = ({
    labels,
    erForskyvEllerErstattPanelvisningPå,
    setErForskyvEllerErstattPanelvisningPå,
}: {
    labels: React.ReactNode;
    erForskyvEllerErstattPanelvisningPå: boolean;
    setErForskyvEllerErstattPanelvisningPå: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const intl = useIntl();

    const { sammenslåtteValgtePerioder } = useKalenderRedigeringContext();

    const [visPeriodeDetaljer, setVisPeriodeDetaljer] = useState(false);

    return (
        <Box background="accent-soft" padding="space-16">
            <VStack gap="space-16">
                <HStack justify="space-between" align="center" wrap={false}>
                    <Box
                        background="brand-blue-strong"
                        padding="space-2"
                        borderRadius="8"
                        width="fit-content"
                        className={'text-ax-bg-default px-2'}
                    >
                        <Heading size="xsmall">
                            <FormattedMessage
                                id="RedigeringPanel.ValgteDager"
                                values={{
                                    varighet: getVarighetString(finnAntallDager(sammenslåtteValgtePerioder), intl),
                                }}
                            />
                        </Heading>
                    </Box>
                    {visPeriodeDetaljer ? (
                        <ChevronUpIcon
                            title={intl.formatMessage({ id: 'RedigeringPanel.SkjulDetaljer' })}
                            fontSize="1.5rem"
                            onClick={() => setVisPeriodeDetaljer(false)}
                        />
                    ) : (
                        <ChevronDownIcon
                            title={intl.formatMessage({ id: 'RedigeringPanel.VisDetaljer' })}
                            fontSize="1.5rem"
                            onClick={() => setVisPeriodeDetaljer(true)}
                        />
                    )}
                </HStack>
                {labels}
                {visPeriodeDetaljer && (
                    <PeriodeDetaljerOgInfoMeldinger
                        erForskyvEllerErstattPanelvisningPå={erForskyvEllerErstattPanelvisningPå}
                        setErForskyvEllerErstattPanelvisningPå={setErForskyvEllerErstattPanelvisningPå}
                    />
                )}
            </VStack>
        </Box>
    );
};

const HeaderMobil = ({
    labels,
    erMinimert,
    erForskyvEllerErstattPanelvisningPå,
    setErMinimert,
    setErForskyvEllerErstattPanelvisningPå,
}: {
    labels: React.ReactNode;
    erMinimert: boolean;
    erForskyvEllerErstattPanelvisningPå: boolean;
    setErMinimert: React.Dispatch<React.SetStateAction<boolean>>;
    setErForskyvEllerErstattPanelvisningPå: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const intl = useIntl();

    const { sammenslåtteValgtePerioder } = useKalenderRedigeringContext();

    return (
        <VStack>
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

                    <HStack>
                        <Box
                            background="brand-blue-strong"
                            padding="space-2"
                            borderRadius="8"
                            width="fit-content"
                            className={'text-ax-bg-default px-2'}
                        >
                            <Heading size="xsmall">
                                <FormattedMessage
                                    id="RedigeringPanel.ValgteDager"
                                    values={{
                                        varighet: getVarighetString(finnAntallDager(sammenslåtteValgtePerioder), intl),
                                    }}
                                />
                            </Heading>
                        </Box>
                    </HStack>
                </VStack>
            </Box>
            <Box className="bg-ax-bg-accent-soft">
                {!erMinimert && (
                    <VStack gap="space-16" className="px-4 pb-4">
                        {labels}
                        <PeriodeDetaljerOgInfoMeldinger
                            erForskyvEllerErstattPanelvisningPå={erForskyvEllerErstattPanelvisningPå}
                            setErForskyvEllerErstattPanelvisningPå={setErForskyvEllerErstattPanelvisningPå}
                        />
                    </VStack>
                )}
            </Box>
        </VStack>
    );
};
