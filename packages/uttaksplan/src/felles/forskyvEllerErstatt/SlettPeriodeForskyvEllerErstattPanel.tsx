import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, Button, Detail, HStack, Radio, RadioGroup, VStack } from '@navikt/ds-react';

import { useForskyvEllerErstattAlerts } from '../../regler/alert/informasjonsAlertHooks';

interface Props {
    valgtePerioder: Array<{ fom: string; tom: string }>;
    avbryt: () => void;
    fjernPeriode: (skalForskyveBakover: boolean) => void;
}

export const SlettPeriodeForskyvEllerErstattPanel = ({ valgtePerioder, avbryt, fjernPeriode }: Props) => {
    const [skalForskyvePeriode, setSkalForskyvePeriode] = useState<boolean | undefined>(undefined);

    const { senerePerioderReadonly, valgteDagerFørSeksUker } = useForskyvEllerErstattAlerts({
        valgtePerioder,
        erFerie: true,
    });

    const harDisablingAlert = Boolean(senerePerioderReadonly || valgteDagerFørSeksUker);

    return (
        <VStack gap="space-16">
            <RadioGroup
                legend={<FormattedMessage id="RedigeringPanel.HvaSkalSkjeSlette" />}
                description={<FormattedMessage id="RedigeringPanel.HvaSkalSkjeSletteBeskrivelse" />}
                onChange={(value: boolean) => setSkalForskyvePeriode(value)}
            >
                <Radio
                    value={true}
                    disabled={harDisablingAlert}
                >
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
            {senerePerioderReadonly && (
                <Alert variant={senerePerioderReadonly.variant}>
                    <FormattedMessage id={senerePerioderReadonly.meldingId} />
                </Alert>
            )}
            {valgteDagerFørSeksUker && (
                <Alert variant={valgteDagerFørSeksUker.variant}>
                    <FormattedMessage id={valgteDagerFørSeksUker.meldingId} />
                </Alert>
            )}
            <HStack justify="space-between">
                <Button
                    type="button"
                    variant="primary"
                    size="small"
                    onClick={() => {
                        fjernPeriode(skalForskyvePeriode ?? false);
                    }}
                    disabled={skalForskyvePeriode === undefined}
                >
                    <FormattedMessage id="RedigeringPanel.Fortsett" />
                </Button>
                <Button type="button" variant="secondary" size="small" onClick={avbryt}>
                    <FormattedMessage id="RedigeringPanel.LukkRedigeringsmodus" />
                </Button>
            </HStack>
        </VStack>
    );
};
