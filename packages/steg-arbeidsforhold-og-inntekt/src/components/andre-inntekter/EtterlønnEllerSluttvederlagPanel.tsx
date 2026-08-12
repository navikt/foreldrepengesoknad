import { FileIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { HStack, InfoCard, VStack } from '@navikt/ds-react';

import { RhfDateRangepicker } from '@navikt/fp-form-hooks';
import { isBeforeOrSame, isBeforeTodayOrToday, isRequired, isValidDate } from '@navikt/fp-validation';

import { AndreInntektskilderUtkast, AnnenInntektType } from '../../types/AndreInntektskilder';

interface Props {
    index: number;
    inntektskilde: Extract<AndreInntektskilderUtkast, { type: typeof AnnenInntektType.SLUTTPAKKE }>;
}

export const EtterlønnEllerSluttvederlagPanel = ({ index, inntektskilde }: Props) => {
    const intl = useIntl();

    return (
        <VStack gap="space-40">
            <HStack gap="space-24">
                <RhfDateRangepicker
                    nameFrom={`andreInntektskilder.${index}.fom`}
                    nameTo={`andreInntektskilder.${index}.tom`}
                    labelFrom={intl.formatMessage({ id: 'EtterlønnEllerSluttvederlagPanel.Fom' })}
                    labelTo={intl.formatMessage({ id: 'EtterlønnEllerSluttvederlagPanel.Tom' })}
                    validateFrom={[
                        isRequired(
                            intl.formatMessage({ id: 'EtterlønnEllerSluttvederlagPanel.Validering.Required.Fom' }),
                        ),
                        isValidDate(
                            intl.formatMessage({ id: 'EtterlønnEllerSluttvederlagPanel.Validering.Valid.Fom' }),
                        ),
                        isBeforeTodayOrToday(
                            intl.formatMessage({ id: 'EtterlønnEllerSluttvederlagPanel.FraOgMedDato.ErIFremtiden' }),
                        ),
                        isBeforeOrSame(
                            intl.formatMessage({ id: 'EtterlønnEllerSluttvederlagPanel.FraOgMedDato.FørTilDato' }),
                            inntektskilde.tom,
                        ),
                    ]}
                    validateTo={[
                        isRequired(
                            intl.formatMessage({ id: 'EtterlønnEllerSluttvederlagPanel.Validering.Required.Tom' }),
                        ),
                        isValidDate(
                            intl.formatMessage({ id: 'EtterlønnEllerSluttvederlagPanel.Validering.Valid.Tom' }),
                        ),
                    ]}
                />
            </HStack>

            <InfoCard data-color="info">
                <InfoCard.Header icon={<FileIcon aria-hidden />}>
                    <InfoCard.Title>Inntekten må dokumenteres</InfoCard.Title>
                </InfoCard.Header>
                <InfoCard.Content>
                    <FormattedMessage id="EtterlønnEllerSluttvederlagPanel.Vedlegg" />
                </InfoCard.Content>
            </InfoCard>
        </VStack>
    );
};
