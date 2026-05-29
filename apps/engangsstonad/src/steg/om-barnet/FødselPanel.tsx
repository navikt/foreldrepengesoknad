import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { FødselFormValues } from 'schemas/omBarnetSchema';

import { Radio } from '@navikt/ds-react';

import { RhfDatepicker, RhfRadioGroup, RhfSelect } from '@navikt/fp-form-hooks';

export type FormValues = FødselFormValues;

export const FødselPanel = () => {
    const intl = useIntl();

    const { watch, control } = useFormContext<FormValues>();

    const erBarnetFødt = watch('erBarnetFødt');
    const antallBarn = watch('antallBarn');
    const fødselsdato = watch('fødselsdato');

    return (
        <>
            <RhfRadioGroup
                name="erBarnetFødt"
                control={control}
                label={<FormattedMessage id="FødselPanel.Spørsmål.ErBarnetFødt" />}
            >
                <Radio value={true}>
                    <FormattedMessage id="FødselPanel.Radiobutton.Ja" />
                </Radio>
                <Radio value={false}>
                    <FormattedMessage id="FødselPanel.Radiobutton.Nei" />
                </Radio>
            </RhfRadioGroup>
            <RhfDatepicker
                name="termindato"
                control={control}
                label={<FormattedMessage id="FødselPanel.Termindato" />}
                description={intl.formatMessage({ id: 'FødselPanel.TermindatoFodselsdato.beskrivelse' })}
                minDate={dayjs(fødselsdato).subtract(3, 'week')}
                maxDate={dayjs().add(18, 'weeks').add(3, 'days')}
            />
            {erBarnetFødt && (
                <RhfDatepicker
                    name="fødselsdato"
                    control={control}
                    label={<FormattedMessage id="FødselPanel.Fødselsdato" />}
                    minDate={dayjs().subtract(6, 'month')}
                    maxDate={dayjs()}
                />
            )}
            <RhfRadioGroup
                name="antallBarn"
                control={control}
                label={
                    erBarnetFødt
                        ? intl.formatMessage({ id: 'FødselPanel.AntallBarn.Født' })
                        : intl.formatMessage({ id: 'FødselPanel.AntallBarn.Termin' })
                }
                description={intl.formatMessage({ id: 'FødselPanel.AntallBarn.TerminBeskrivelse' })}
            >
                <Radio value={1}>
                    <FormattedMessage id="FødselPanel.Radiobutton.Ettbarn" />
                </Radio>
                <Radio value={2}>
                    <FormattedMessage id="FødselPanel.Radiobutton.Tvillinger" />
                </Radio>
                <Radio value={3}>
                    <FormattedMessage id="FødselPanel.Radiobutton.Flere" />
                </Radio>
            </RhfRadioGroup>
            {antallBarn !== undefined && antallBarn >= 3 && (
                <RhfSelect
                    name="antallBarnDropDown"
                    control={control}
                    label={
                        erBarnetFødt
                            ? intl.formatMessage({ id: 'FødselPanel.AntallBarn.Født' })
                            : intl.formatMessage({ id: 'FødselPanel.AntallBarn.Termin' })
                    }
                >
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </RhfSelect>
            )}
        </>
    );
};
