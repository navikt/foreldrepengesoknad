import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';
import { Radio } from '@navikt/ds-react';
import { Kjønn } from '@navikt/fp-common';
import { RadioGroupPanel, Datepicker, Select } from '@navikt/fp-form-hooks';
import { useFormValidators } from '@navikt/fp-validation';

import AdopsjonFodselFieldArray from './AdopsjonFodselFieldArray';
import { Adopsjon } from 'types/OmBarnet';

export type FormValues = {
    antallBarnDropDown?: string;
} & Adopsjon;

interface Props {
    kjønn: Kjønn;
}

const AdopsjonPanel: React.FunctionComponent<Props> = ({ kjønn }) => {
    const {
        isRequired,
        date: { isValidDate, isMaxOneYearIntoTheFuture },
    } = useFormValidators();

    const { watch } = useFormContext<FormValues>();

    const { adopsjonAvEktefellesBarn, adopsjonsdato, antallBarn, antallBarnDropDown } = watch();

    return (
        <>
            <RadioGroupPanel
                name="adopsjonAvEktefellesBarn"
                label={<FormattedMessage id="AdopsjonPanel.Spørsmål.Stebarnsadopsjon" />}
                validate={[isRequired('AdopsjonPanel.Spørsmål.Required')]}
            >
                <Radio value={true}>
                    <FormattedMessage id="AdopsjonPanel.Ja" />
                </Radio>
                <Radio value={false}>
                    <FormattedMessage id="AdopsjonPanel.Nei" />
                </Radio>
            </RadioGroupPanel>
            <Datepicker
                name="adopsjonsdato"
                label={
                    <FormattedMessage
                        id={
                            adopsjonAvEktefellesBarn
                                ? 'AdopsjonPanel.Spørsmål.Stebarnsadopsjondato'
                                : 'AdopsjonPanel.Spørsmål.Overtaomsorgdato'
                        }
                    />
                }
                minDate={dayjs().subtract(6, 'month').toDate()}
                validate={[
                    isRequired(
                        adopsjonAvEktefellesBarn
                            ? 'AdopsjonPanel.EktefellensBarn.DuMåOppgi'
                            : 'AdopsjonPanel.OvertaOmsorg.DuMåOppgi',
                    ),
                    isValidDate(
                        adopsjonAvEktefellesBarn
                            ? 'AdopsjonPanel.Adopsjonsdato.GyldigFormat'
                            : 'AdopsjonPanel.Omsorgsovertakelsen.GyldigFormat',
                    ),
                    isMaxOneYearIntoTheFuture('AdopsjonPanel.AdopsjonDato.ForLangtFremITid'),
                ]}
            />
            <RadioGroupPanel
                name="antallBarn"
                label={<FormattedMessage id="AdopsjonPanel.Spørsmål.AntallBarnAdoptert" />}
                description={<FormattedMessage id="AdopsjonPanel.Spørsmål.AntallBarnAdoptert.Beskrivelse" />}
                validate={[isRequired('AdopsjonPanel.Antallbarn.Required')]}
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
            </RadioGroupPanel>
            {antallBarn && antallBarn >= 3 && (
                <Select
                    name="antallBarnDropDown"
                    label={<FormattedMessage id="AdopsjonPanel.AntallBarn.Omsorgsovertakelse" />}
                    validate={[isRequired('AdopsjonPanel.Antallbarndropdown.Required')]}
                >
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </Select>
            )}
            <AdopsjonFodselFieldArray
                adopsjonsdato={adopsjonsdato}
                antallBarn={antallBarn}
                antallBarnDropDown={antallBarnDropDown}
            />
            {kjønn === 'M' && adopsjonAvEktefellesBarn === false && (
                <RadioGroupPanel
                    name="søkerAdopsjonAlene"
                    label={<FormattedMessage id="AdopsjonPanel.Spørsmål.AdoptererDuAlene" />}
                    validate={[isRequired('AdopsjonPanel.AdoptererDuAlene.Required')]}
                >
                    <Radio value={true}>
                        <FormattedMessage id="AdopsjonPanel.Ja" />
                    </Radio>
                    <Radio value={false}>
                        <FormattedMessage id="AdopsjonPanel.Nei" />
                    </Radio>
                </RadioGroupPanel>
            )}
        </>
    );
};

export default AdopsjonPanel;
