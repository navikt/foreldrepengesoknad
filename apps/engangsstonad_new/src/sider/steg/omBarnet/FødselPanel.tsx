import { useFormContext } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { Radio } from '@navikt/ds-react';
import {
    Block,
    erMindreEnn3UkerSiden,
    etterDagensDato,
    hasValue,
    sisteDatoBarnetKanVæreFødt,
    sisteMuligeTermindato,
    utstedtDatoErIUke22,
} from '@navikt/fp-common';

import RadioGroupPanel from 'fpcommon/form/RadioGroupPanel';
import Select from 'fpcommon/form/Select';
import Datepicker from 'fpcommon/form/Datepicker';
import { isValidFormattedDateString } from 'fpcommon/validering/valideringsregler';

export type FormValues = {
    erBarnetFødt?: boolean;
    antallBarn?: number;
    antallBarnDropDown?: number;
    fødselsdatoer?: string[];
    termindato?: string;
    terminbekreftelsedato?: string;
};

export const validateFødselDate = (dato: string, intl: IntlShape) => {
    if (!hasValue(dato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.fodselsdato.duMåOppgi' });
    }
    if (etterDagensDato(dato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.fodselsdato.måVæreIdagEllerTidligere' });
    }
    if (sisteDatoBarnetKanVæreFødt(dato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.fodselsdato.ikkeMerEnn6MånederTilbake' });
    }
    return undefined;
};

export const validateTerminDate = (dato: string, intl: IntlShape) => {
    if (!hasValue(dato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.termindato.duMåOppgi' });
    }
    if (!isValidFormattedDateString(dato)) {
        return intl.formatMessage({ id: 'invalidFormatErrorKey.termindato' });
    }
    if (!erMindreEnn3UkerSiden(dato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.termindato.termindatoKanIkkeVære3UkerFraIdag' });
    }
    if (sisteMuligeTermindato(dato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.termindato.duMåVæreIUke22' });
    }
    return undefined;
};

export const valideringAvTerminbekreftelsesdato = (
    dato: string | undefined,
    termindato: string | undefined,
    intl: IntlShape,
) => {
    if (!hasValue(dato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.terminbekreftelseDato.duMåOppgi' });
    }
    if (!dato || !termindato) {
        return undefined;
    }

    if (!isValidFormattedDateString(dato)) {
        return intl.formatMessage({ id: 'invalidFormatErrorKey.terminBekreftelsedato' });
    }

    if (etterDagensDato(dato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.terminbekreftelseDato.måVæreIdagEllerTidligere' });
    }
    if (!utstedtDatoErIUke22(dato, termindato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.terminbekreftelseDato.duMåVæreIUke22' });
    }
    return undefined;
};

const FødselPanel: React.FunctionComponent = () => {
    const intl = useIntl();
    const { watch } = useFormContext<FormValues>();

    const erBarnetFødt = watch('erBarnetFødt');
    const antallBarn = watch('antallBarn');
    const termindato = watch('termindato');

    return (
        <>
            <Block margin="xl" padBottom="xl">
                <RadioGroupPanel name="erBarnetFødt" label={<FormattedMessage id="omBarnet.spørsmål.erBarnetFødt" />}>
                    <Radio value={true}>
                        <FormattedMessage id="omBarnet.radiobutton.ja" />
                    </Radio>
                    <Radio value={false}>
                        <FormattedMessage id="omBarnet.radiobutton.nei" />
                    </Radio>
                </RadioGroupPanel>
            </Block>
            {erBarnetFødt !== undefined && (
                <RadioGroupPanel name="antallBarn" label={<FormattedMessage id="omBarnet.text.antallBarn.født" />}>
                    <Radio value="1">
                        <FormattedMessage id="omBarnet.radiobutton.ettbarn" />
                    </Radio>
                    <Radio value="2">
                        <FormattedMessage id="omBarnet.radiobutton.tvillinger" />
                    </Radio>
                    <Radio value="3">
                        <FormattedMessage id="omBarnet.radiobutton.flere" />
                    </Radio>
                </RadioGroupPanel>
            )}
            {antallBarn && antallBarn >= 3 && (
                <Block margin="xl">
                    <Select name="antallBarnDropDown" label={<FormattedMessage id="omBarnet.text.antallBarn.født" />}>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </Select>
                </Block>
            )}
            {erBarnetFødt === false && antallBarn && (
                <Block margin="xl">
                    <Datepicker
                        name="termindato"
                        label={<FormattedMessage id="søknad.termindato" />}
                        disabledDays={[
                            {
                                from: dayjs().subtract(50, 'year').toDate(),
                                to: dayjs().subtract(3, 'week').toDate(),
                            },
                            {
                                from: dayjs().add(18, 'weeks').add(3, 'days').toDate(),
                            },
                        ]}
                        validate={[(value) => validateTerminDate(value, intl)]}
                    />
                </Block>
            )}
            {/* FileUploader */}
            {termindato && (
                <Block margin="xl">
                    <Datepicker
                        name="terminbekreftelsedato"
                        label={<FormattedMessage id="søknad.terminbekreftelsesdato" />}
                        disabledDays={[
                            {
                                from: dayjs().subtract(50, 'year').toDate(),
                                to: dayjs(termindato).subtract(18, 'week').subtract(3, 'day').toDate(),
                            },
                            {
                                from: dayjs().toDate(),
                            },
                        ]}
                        validate={[
                            (terminBekreftelseDato) =>
                                valideringAvTerminbekreftelsesdato(terminBekreftelseDato, termindato, intl),
                        ]}
                    />
                </Block>
            )}
            {erBarnetFødt && antallBarn && (
                <Block margin="xl">
                    <Datepicker
                        name="fødselsdatoer.0"
                        label={<FormattedMessage id="søknad.fødselsdato" />}
                        disabledDays={[
                            {
                                from: dayjs().subtract(50, 'year').toDate(),
                                to: dayjs().subtract(6, 'month').toDate(),
                            },
                            {
                                from: dayjs().toDate(),
                            },
                        ]}
                        validate={[(value) => validateFødselDate(value, intl)]}
                    />
                </Block>
            )}
        </>
    );
};

export default FødselPanel;
