import { FileIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

import { DateRangepicker } from '@navikt/fp-form-hooks';
import { BluePanel } from '@navikt/fp-ui';
import { isBeforeOrSame, isBeforeTodayOrToday, isRequired, isValidDate } from '@navikt/fp-validation';

import { AndreInntektskilder } from 'app/types/AndreInntektskilder';

interface Props {
    index: number;
    inntektskilde: AndreInntektskilder;
}

export const EtterlønnEllerSluttvederlagPanel: React.FunctionComponent<Props> = ({ index, inntektskilde }) => {
    const intl = useIntl();

    return (
        <VStack gap="10">
            <HStack gap="6">
                <DateRangepicker
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
            <BluePanel isDarkBlue>
                <HStack gap="2" wrap={false}>
                    <div>
                        <FileIcon fontSize="1.5rem" />
                    </div>
                    <BodyShort>
                        <FormattedMessage id="EtterlønnEllerSluttvederlagPanel.Vedlegg" />
                    </BodyShort>
                </HStack>
            </BluePanel>
        </VStack>
    );
};
