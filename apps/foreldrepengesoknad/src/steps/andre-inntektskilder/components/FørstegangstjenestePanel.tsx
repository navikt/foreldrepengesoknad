import { FileIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { AndreInntektskilder, AnnenInntektType } from 'types/AndreInntektskilder';

import { BodyShort, HStack, Radio, VStack } from '@navikt/ds-react';

import { RhfDatepicker, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { BluePanel } from '@navikt/fp-ui';
import { isBeforeOrSame, isBeforeTodayOrToday, isRequired, isValidDate } from '@navikt/fp-validation';

interface Props {
    index: number;
    inntektskilde: AndreInntektskilder;
}

export const FørstegangstjenestePanel: React.FunctionComponent<Props> = ({ index, inntektskilde }) => {
    const intl = useIntl();

    if (inntektskilde.type !== AnnenInntektType.MILITÆRTJENESTE) {
        throw Error('Inntektskilde ikke av type MILITÆRTJENESTE');
    }

    return (
        <VStack gap="10">
            <RhfRadioGroup
                name={`andreInntektskilder.${index}.pågående`}
                label={<FormattedMessage id="FørstegangstjenestePanel.IFørstegangstjenesteNå" />}
                validate={[
                    isRequired(
                        intl.formatMessage({ id: 'FørstegangstjenestePanel.Validering.IFørstegangstjenesteNå' }),
                    ),
                ]}
            >
                <Radio value={false}>
                    <FormattedMessage id="FørstegangstjenestePanel.RadioButton.Nei" />
                </Radio>
                <Radio value={true}>
                    <FormattedMessage id="FørstegangstjenestePanel.RadioButton.Ja" />
                </Radio>
            </RhfRadioGroup>
            <HStack gap="6">
                <RhfDatepicker
                    name={`andreInntektskilder.${index}.fom`}
                    label={intl.formatMessage({ id: 'FørstegangstjenestePanel.Fom' })}
                    maxDate={dayjs()}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'FørstegangstjenestePanel.Validering.Required.Fom' })),
                        isValidDate(intl.formatMessage({ id: 'FørstegangstjenestePanel.Validering.Valid.Fom' })),
                        isBeforeTodayOrToday(
                            intl.formatMessage({ id: 'FørstegangstjenestePanel.FraOgMedDato.ErIFremtiden' }),
                        ),
                        isBeforeOrSame(
                            intl.formatMessage({ id: 'FørstegangstjenestePanel.FraOgMedDato.FørTilDato' }),
                            inntektskilde.pågående === false ? inntektskilde.tom : dayjs(),
                        ),
                    ]}
                />
                {inntektskilde.pågående === false && (
                    <RhfDatepicker
                        name={`andreInntektskilder.${index}.tom`}
                        label={intl.formatMessage({ id: 'FørstegangstjenestePanel.Tom' })}
                        maxDate={dayjs()}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'FørstegangstjenestePanel.Validering.Required.Tom' })),
                            isValidDate(intl.formatMessage({ id: 'FørstegangstjenestePanel.Validering.Valid.Tom' })),
                            isBeforeTodayOrToday(
                                intl.formatMessage({ id: 'FørstegangstjenestePanel.TilOgMedDato.ErIFremtiden' }),
                            ),
                        ]}
                    />
                )}
            </HStack>
            <BluePanel isDarkBlue>
                <HStack gap="2" wrap={false}>
                    <div>
                        <FileIcon fontSize="1.5rem" />
                    </div>
                    <BodyShort>
                        <FormattedMessage id="FørstegangstjenestePanel.Vedlegg" />
                    </BodyShort>
                </HStack>
            </BluePanel>
        </VStack>
    );
};
