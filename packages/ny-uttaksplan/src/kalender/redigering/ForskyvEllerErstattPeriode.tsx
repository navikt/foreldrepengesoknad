import dayjs from 'dayjs';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, Box, Button, Detail, HStack, Radio, RadioGroup, VStack } from '@navikt/ds-react';

import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { useKalenderRedigeringContext } from './context/KalenderRedigeringContext';

interface Props {
    setVisEndreEllerForskyvPanel: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ForskyvEllerErstattPeriode = ({ setVisEndreEllerForskyvPanel }: Props) => {
    const {
        foreldreInfo: { søker },
        familiehendelsedato,
    } = useUttaksplanData();

    const { sammenslåtteValgtePerioder, leggTilUttaksplanPerioder, setValgtePerioder, setEndredePerioder } =
        useKalenderRedigeringContext();

    const harPeriodeFørFamiliehendelsedato = sammenslåtteValgtePerioder.some((p) =>
        dayjs(p.fom).isBefore(familiehendelsedato),
    );

    const [skalForskyvePeriode, setSkalForskyvePeriode] = useState<boolean | undefined>(undefined);

    const leggTilEllerForskyvPeriode = () => {
        const skalForskyve =
            harPeriodeFørFamiliehendelsedato || skalForskyvePeriode === undefined ? false : skalForskyvePeriode;
        leggTilUttaksplanPerioder(
            sammenslåtteValgtePerioder.map(
                (p) =>
                    ({
                        forelder: søker,
                        fom: p.fom,
                        tom: p.tom,
                        utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                    }) satisfies UttakPeriode_fpoversikt,
            ),
            skalForskyve,
        );

        setValgtePerioder([]);
        setEndredePerioder(sammenslåtteValgtePerioder);
    };

    return (
        <Box background="accent-soft" padding="space-24" style={{ cursor: 'pointer' }}>
            <VStack gap="space-16">
                <RadioGroup
                    legend={<FormattedMessage id="RedigeringPanel.HvaSkalSkje" />}
                    description={<FormattedMessage id="RedigeringPanel.HvaSkalSkjeBeskrivelse" />}
                    onChange={(value) => setSkalForskyvePeriode(!!value)}
                >
                    <Radio value={true} disabled={harPeriodeFørFamiliehendelsedato}>
                        <VStack gap="space-4">
                            <BodyShort>
                                <FormattedMessage id="RedigeringPanel.FlyttPlanen" />
                            </BodyShort>
                            {skalForskyvePeriode && (
                                <Detail>
                                    <FormattedMessage id="RedigeringPanel.FlyttPlanenDetaljer" />
                                </Detail>
                            )}
                        </VStack>
                    </Radio>
                    <Radio value={false}>
                        <VStack gap="space-4">
                            <BodyShort>
                                <FormattedMessage id="RedigeringPanel.EndrePlanen" />
                            </BodyShort>
                            {skalForskyvePeriode === false && (
                                <Detail>
                                    <FormattedMessage id="RedigeringPanel.EndrePlanenDetaljer" />
                                </Detail>
                            )}
                        </VStack>
                    </Radio>
                </RadioGroup>
                {harPeriodeFørFamiliehendelsedato && (
                    <Alert variant="info">
                        <FormattedMessage id="RedigeringPanel.ValgtDagerFørFamiliehendelsesdato" />
                    </Alert>
                )}
                <HStack justify="space-between">
                    <Button type="button" variant="primary" size="small" onClick={() => leggTilEllerForskyvPeriode()}>
                        <FormattedMessage id="RedigeringPanel.Fortsett" />
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        size="small"
                        onClick={() => setVisEndreEllerForskyvPanel(false)}
                    >
                        <FormattedMessage id="RedigeringPanel.LukkRedigeringsmodus" />
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );
};
