import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, Button, Detail, HStack, Radio, RadioGroup, VStack } from '@navikt/ds-react';

interface Props {
    harPeriodeFørFamiliehendelsedato: boolean;
    setVisEndreEllerForskyvPanel: React.Dispatch<React.SetStateAction<boolean>>;
    leggTilEllerForskyvPeriode: (skalForskyve: boolean) => void;
}

export const LeggTilPeriodeForskyvEllerErstatt = ({
    harPeriodeFørFamiliehendelsedato,
    setVisEndreEllerForskyvPanel,
    leggTilEllerForskyvPeriode,
}: Props) => {
    const [skalForskyvePeriode, setSkalForskyvePeriode] = useState<boolean | undefined>(undefined);

    const skalForskyve =
        harPeriodeFørFamiliehendelsedato || skalForskyvePeriode === undefined ? false : skalForskyvePeriode;

    return (
        <VStack gap="space-16">
            <RadioGroup
                legend={<FormattedMessage id="RedigeringPanel.HvaSkalSkje" />}
                description={<FormattedMessage id="RedigeringPanel.HvaSkalSkjeBeskrivelse" />}
                onChange={(value: boolean) => setSkalForskyvePeriode(value)}
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
                <Button
                    type="button"
                    variant="primary"
                    size="small"
                    onClick={() => leggTilEllerForskyvPeriode(skalForskyve)}
                >
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
    );
};
