import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Adopsjon } from 'types/OmBarnet';

import { Radio } from '@navikt/ds-react';

import { RhfDatepicker, RhfRadioGroup, RhfSelect } from '@navikt/fp-form-hooks';
import { Kjønn } from '@navikt/fp-types';
import { isMaxOneYearIntoTheFuture, isRequired, isValidDate } from '@navikt/fp-validation';

import { AdopsjonFodselFieldArray } from './AdopsjonFodselFieldArray';

export type FormValues = {
    antallBarnDropDown?: string;
} & Adopsjon;

interface Props {
    kjønn: Kjønn;
}

export const AdopsjonPanel = ({ kjønn }: Props) => {
    const intl = useIntl();

    const { watch } = useFormContext<FormValues>();

    const { adopsjonAvEktefellesBarn, adopsjonsdato, antallBarn, antallBarnDropDown } = watch();

    return (
        <>
            <RhfRadioGroup
                name="adopsjonAvEktefellesBarn"
                label={<FormattedMessage id="AdopsjonPanel.Spørsmål.Stebarnsadopsjon" />}
                validate={[isRequired(intl.formatMessage({ id: 'AdopsjonPanel.Spørsmål.Required' }))]}
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
                label={
                    adopsjonAvEktefellesBarn
                        ? intl.formatMessage({ id: 'AdopsjonPanel.Spørsmål.Stebarnsadopsjondato' })
                        : intl.formatMessage({ id: 'AdopsjonPanel.Spørsmål.Overtaomsorgdato' })
                }
                minDate={dayjs().subtract(6, 'month').toDate()}
                validate={[
                    isRequired(
                        adopsjonAvEktefellesBarn
                            ? intl.formatMessage({ id: 'AdopsjonPanel.EktefellensBarn.DuMåOppgi' })
                            : intl.formatMessage({ id: 'AdopsjonPanel.OvertaOmsorg.DuMåOppgi' }),
                    ),
                    isValidDate(
                        adopsjonAvEktefellesBarn
                            ? intl.formatMessage({ id: 'AdopsjonPanel.Adopsjonsdato.GyldigFormat' })
                            : intl.formatMessage({ id: 'AdopsjonPanel.Omsorgsovertakelsen.GyldigFormat' }),
                    ),
                    isMaxOneYearIntoTheFuture(
                        intl.formatMessage({ id: 'AdopsjonPanel.AdopsjonDato.ForLangtFremITid' }),
                    ),
                ]}
            />
            <RhfRadioGroup
                name="antallBarn"
                label={<FormattedMessage id="AdopsjonPanel.Spørsmål.AntallBarnAdoptert" />}
                description={<FormattedMessage id="AdopsjonPanel.Spørsmål.AntallBarnAdoptert.Beskrivelse" />}
                validate={[isRequired(intl.formatMessage({ id: 'AdopsjonPanel.Antallbarn.Required' }))]}
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
            {antallBarn && antallBarn >= 3 && (
                <RhfSelect
                    name="antallBarnDropDown"
                    label={<FormattedMessage id="AdopsjonPanel.AntallBarn.Omsorgsovertakelse" />}
                    validate={[isRequired(intl.formatMessage({ id: 'AdopsjonPanel.Antallbarndropdown.Required' }))]}
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
                    label={<FormattedMessage id="AdopsjonPanel.Spørsmål.AdoptererDuAlene" />}
                    validate={[isRequired(intl.formatMessage({ id: 'AdopsjonPanel.AdoptererDuAlene.Required' }))]}
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
