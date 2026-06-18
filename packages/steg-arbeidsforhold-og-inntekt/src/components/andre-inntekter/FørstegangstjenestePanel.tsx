import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, HStack, Radio, VStack } from '@navikt/ds-react';

import { RhfDatepicker, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { BluePanel } from '@navikt/fp-ui';
import { isBeforeOrSame, isBeforeTodayOrToday, isRequired, isValidDate } from '@navikt/fp-validation';

import { AndreInntekterFormValues, AndreInntektskilder, AnnenInntektType } from '../../types/AndreInntektskilder';

interface Props {
    index: number;
    inntektskilde: AndreInntektskilder;
}

export const FørstegangstjenestePanel = ({ index, inntektskilde }: Props) => {
    const intl = useIntl();
    const today = useMemo(() => new Date(), []);

    const { control } = useFormContext<AndreInntekterFormValues>();

    if (inntektskilde.type !== AnnenInntektType.MILITÆRTJENESTE) {
        throw new Error('Inntektskilde ikke av type MILITÆRTJENESTE');
    }

    return (
        <VStack gap="space-40">
            <RhfRadioGroup
                name={`andreInntektskilder.${index}.pågående`}
                control={control}
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
            <HStack gap="space-24">
                <RhfDatepicker
                    name={`andreInntektskilder.${index}.fom`}
                    control={control}
                    label={intl.formatMessage({ id: 'FørstegangstjenestePanel.Fom' })}
                    maxDate={today}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'FørstegangstjenestePanel.Validering.Required.Fom' })),
                        isValidDate(intl.formatMessage({ id: 'FørstegangstjenestePanel.Validering.Valid.Fom' })),
                        isBeforeTodayOrToday(
                            intl.formatMessage({ id: 'FørstegangstjenestePanel.FraOgMedDato.ErIFremtiden' }),
                        ),
                        isBeforeOrSame(
                            intl.formatMessage({ id: 'FørstegangstjenestePanel.FraOgMedDato.FørTilDato' }),
                            inntektskilde.pågående === false ? inntektskilde.tom : today,
                        ),
                    ]}
                />
                {inntektskilde.pågående === false && (
                    <RhfDatepicker
                        name={`andreInntektskilder.${index}.tom`}
                        control={control}
                        label={intl.formatMessage({ id: 'FørstegangstjenestePanel.Tom' })}
                        maxDate={today}
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
                <BodyShort>
                    <FormattedMessage id="FørstegangstjenestePanel.Vedlegg" />
                </BodyShort>
            </BluePanel>
        </VStack>
    );
};
