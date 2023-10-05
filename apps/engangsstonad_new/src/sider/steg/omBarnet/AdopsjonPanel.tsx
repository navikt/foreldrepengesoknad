import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Radio } from '@navikt/ds-react';
import { Kjønn, hasValue, sisteMuligeDatoForOvertaOmsorg } from '@navikt/fp-common';

import AdopsjonFodselFieldArray from './AdopsjonFodselFieldArray';
import RadioGroupPanel from 'fpcommon/form/RadioGroupPanel';
import Datepicker from 'fpcommon/form/Datepicker';
import Select from 'fpcommon/form/Select';
import { isRequired, isValidFormattedDateString } from 'fpcommon/validering/valideringsregler';
import { Adopsjon } from 'types/OmBarnet';

export type FormValues = {
    antallBarnDropDown?: string;
} & Adopsjon;

const validateEktefellensBarnAdopsjonDate = (dato: string, intl: IntlShape) => {
    if (!hasValue(dato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.adopsjonDato.ektefellensBarn.duMåOppgi' });
    }

    if (!isValidFormattedDateString(dato)) {
        return intl.formatMessage({ id: 'invalidFormatErrorKey.adopsjonsdato' });
    }

    if (sisteMuligeDatoForOvertaOmsorg(dato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.adopsjonDato.forLangtFremITid' });
    }

    return undefined;
};

const validateOvertaOmsorgAdopsjonDate = (dato: string, intl: IntlShape) => {
    if (!hasValue(dato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.adopsjonDato.overtaOmsorg.duMåOppgi' });
    }
    if (sisteMuligeDatoForOvertaOmsorg(dato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.adopsjonDato.forLangtFremITid' });
    }
    return undefined;
};

interface Props {
    kjønn: Kjønn;
}

const AdopsjonPanel: React.FunctionComponent<Props> = ({ kjønn }) => {
    const intl = useIntl();
    const { watch } = useFormContext<FormValues>();

    const { adopsjonAvEktefellesBarn, adopsjonsdato, antallBarn, antallBarnDropDown } = watch();

    return (
        <>
            <RadioGroupPanel
                name="adopsjonAvEktefellesBarn"
                label={<FormattedMessage id="omBarnet.adopsjon.spørsmål.stebarnsadopsjon" />}
                validate={[isRequired(intl.formatMessage({ id: 'omBarnet.adopsjon.spørsmål.required' }))]}
            >
                <Radio value={true}>
                    <FormattedMessage id="omBarnet.adopsjon.text.ja" />
                </Radio>
                <Radio value={false}>
                    <FormattedMessage id="omBarnet.adopsjon.text.nei" />
                </Radio>
            </RadioGroupPanel>
            <Datepicker
                name="adopsjonsdato"
                label={
                    <FormattedMessage
                        id={
                            adopsjonAvEktefellesBarn
                                ? 'omBarnet.adopsjon.spørsmål.stebarnsadopsjondato'
                                : 'omBarnet.adopsjon.spørsmål.overtaomsorgdato'
                        }
                    />
                }
                minDate={dayjs().subtract(6, 'month').toDate()}
                validate={[
                    adopsjonAvEktefellesBarn
                        ? (value) => validateEktefellensBarnAdopsjonDate(value, intl)
                        : (value) => validateOvertaOmsorgAdopsjonDate(value, intl),
                ]}
            />
            <RadioGroupPanel
                name="antallBarn"
                label={<FormattedMessage id="omBarnet.adopsjon.spørsmål.antallBarnAdoptert" />}
                validate={[isRequired(intl.formatMessage({ id: 'omBarnet.adopsjon.antallbarn.required' }))]}
            >
                <Radio value={1}>
                    <FormattedMessage id="omBarnet.radiobutton.ettbarn" />
                </Radio>
                <Radio value={2}>
                    <FormattedMessage id="omBarnet.radiobutton.toBarn" />
                </Radio>
                <Radio value={3}>
                    <FormattedMessage id="omBarnet.radiobutton.flere" />
                </Radio>
            </RadioGroupPanel>
            {antallBarn && antallBarn >= 3 && (
                <Select
                    name="antallBarnDropDown"
                    label={<FormattedMessage id="omBarnet.text.antallBarn.omsorgsovertakelse" />}
                    validate={[isRequired(intl.formatMessage({ id: 'omBarnet.adopsjon.antallbarndropdown.required' }))]}
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
                    label={<FormattedMessage id="omBarnet.adopsjon.spørsmål.adoptererDuAlene" />}
                    validate={[isRequired(intl.formatMessage({ id: 'omBarnet.adopsjon.adoptererDuAlene.required' }))]}
                >
                    <Radio value={true}>
                        <FormattedMessage id="omBarnet.adopsjon.text.ja" />
                    </Radio>
                    <Radio value={false}>
                        <FormattedMessage id="omBarnet.adopsjon.text.nei" />
                    </Radio>
                </RadioGroupPanel>
            )}
        </>
    );
};

export default AdopsjonPanel;
