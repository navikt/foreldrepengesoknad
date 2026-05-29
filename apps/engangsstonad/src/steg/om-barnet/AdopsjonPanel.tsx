import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { AdopsjonFormValues } from 'schemas/omBarnetSchema';

import { Radio } from '@navikt/ds-react';

import { RhfDatepicker, RhfRadioGroup, RhfSelect } from '@navikt/fp-form-hooks';
import { Kjønn_fpoversikt } from '@navikt/fp-types';

import { AdopsjonFodselFieldArray } from './AdopsjonFodselFieldArray';

export type FormValues = AdopsjonFormValues;

interface Props {
    kjønn: Kjønn_fpoversikt;
}

export const AdopsjonPanel = ({ kjønn }: Props) => {
    const intl = useIntl();

    const { watch, control } = useFormContext<FormValues>();

    const { adopsjonAvEktefellesBarn, adopsjonsdato, antallBarn, antallBarnDropDown } = watch();

    return (
        <>
            <RhfRadioGroup
                name="adopsjonAvEktefellesBarn"
                control={control}
                label={<FormattedMessage id="AdopsjonPanel.Spørsmål.Stebarnsadopsjon" />}
            >
                <Radio value={true}>
                    <FormattedMessage id="AdopsjonPanel.Ja" />
                </Radio>
                <Radio value={false}>
                    <FormattedMessage id="AdopsjonPanel.Nei" />
                </Radio>
            </RhfRadioGroup>
            <RhfDatepicker
                name="adopsjonsdato"
                control={control}
                label={
                    adopsjonAvEktefellesBarn
                        ? intl.formatMessage({ id: 'AdopsjonPanel.Spørsmål.Stebarnsadopsjondato' })
                        : intl.formatMessage({ id: 'AdopsjonPanel.Spørsmål.Overtaomsorgdato' })
                }
                minDate={dayjs().subtract(6, 'month')}
            />
            <RhfRadioGroup
                name="antallBarn"
                control={control}
                label={<FormattedMessage id="AdopsjonPanel.Spørsmål.AntallBarnAdoptert" />}
                description={<FormattedMessage id="AdopsjonPanel.Spørsmål.AntallBarnAdoptert.Beskrivelse" />}
            >
                <Radio value={1}>
                    <FormattedMessage id="AdopsjonPanel.Radiobutton.Ettbarn" />
                </Radio>
                <Radio value={2}>
                    <FormattedMessage id="AdopsjonPanel.Radiobutton.ToBarn" />
                </Radio>
                <Radio value={3}>
                    <FormattedMessage id="AdopsjonPanel.Radiobutton.Flere" />
                </Radio>
            </RhfRadioGroup>
            {antallBarn !== undefined && antallBarn >= 3 && (
                <RhfSelect
                    name="antallBarnDropDown"
                    control={control}
                    label={<FormattedMessage id="AdopsjonPanel.AntallBarn.Omsorgsovertakelse" />}
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
            <AdopsjonFodselFieldArray
                adopsjonsdato={adopsjonsdato}
                antallBarn={antallBarn}
                antallBarnDropDown={antallBarnDropDown}
            />
            {kjønn === 'M' && adopsjonAvEktefellesBarn === false && (
                <RhfRadioGroup
                    name="søkerAdopsjonAlene"
                    control={control}
                    label={<FormattedMessage id="AdopsjonPanel.Spørsmål.AdoptererDuAlene" />}
                >
                    <Radio value={true}>
                        <FormattedMessage id="AdopsjonPanel.Ja" />
                    </Radio>
                    <Radio value={false}>
                        <FormattedMessage id="AdopsjonPanel.Nei" />
                    </Radio>
                </RhfRadioGroup>
            )}
        </>
    );
};
