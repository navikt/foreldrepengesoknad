import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, Button, Detail, HStack, Radio, RadioGroup, VStack } from '@navikt/ds-react';

interface Props {
    harPeriodeFørSeksUkserEtterFamiliehendelsedato: boolean;
    avbryt: () => void;
    fjernPeriode: (skalForskyveBakover: boolean) => void;
}

export const SlettPeriodeForskyvEllerErstatt = ({
    harPeriodeFørSeksUkserEtterFamiliehendelsedato,
    avbryt,
    fjernPeriode,
}: Props) => {
    const [skalForskyvePeriode, setSkalForskyvePeriode] = useState<boolean | undefined>(undefined);

    const skalForskyve =
        harPeriodeFørSeksUkserEtterFamiliehendelsedato || skalForskyvePeriode === undefined
            ? false
            : skalForskyvePeriode;

    return (
        <VStack gap="space-16">
            <RadioGroup
                legend={<FormattedMessage id="RedigeringPanel.HvaSkalSkjeSlette" />}
                description={<FormattedMessage id="RedigeringPanel.HvaSkalSkjeSletteBeskrivelse" />}
                onChange={(value: boolean) => setSkalForskyvePeriode(value)}
            >
                <Radio value={true} disabled={harPeriodeFørSeksUkserEtterFamiliehendelsedato}>
                    <VStack gap="space-4">
                        <BodyShort>
                            <FormattedMessage id="RedigeringPanel.SlettFlyttPlanen" />
                        </BodyShort>
                        {skalForskyvePeriode && (
                            <Detail>
                                <FormattedMessage id="RedigeringPanel.SlettFlyttPlanenDetaljer" />
                            </Detail>
                        )}
                    </VStack>
                </Radio>
                <Radio value={false}>
                    <VStack gap="space-4">
                        <BodyShort>
                            <FormattedMessage id="RedigeringPanel.SlettEndrePlanen" />
                        </BodyShort>
                        {skalForskyvePeriode === false && (
                            <Detail>
                                <FormattedMessage id="RedigeringPanel.SlettEndrePlanenDetaljer" />
                            </Detail>
                        )}
                    </VStack>
                </Radio>
            </RadioGroup>
            {harPeriodeFørSeksUkserEtterFamiliehendelsedato && (
                <Alert variant="info">
                    <FormattedMessage id="RedigeringPanel.ValgtDagerFørSeksUkerEtterFamDato" />
                </Alert>
            )}
            <HStack justify="space-between">
                <Button type="button" variant="primary" size="small" onClick={() => fjernPeriode(skalForskyve)}>
                    <FormattedMessage id="RedigeringPanel.Fortsett" />
                </Button>
                <Button type="button" variant="secondary" size="small" onClick={avbryt}>
                    <FormattedMessage id="RedigeringPanel.LukkRedigeringsmodus" />
                </Button>
            </HStack>
        </VStack>
    );
};
