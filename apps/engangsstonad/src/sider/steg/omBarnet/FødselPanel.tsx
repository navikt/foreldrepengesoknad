import { useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';
import { Radio } from '@navikt/ds-react';
import { RadioGroupPanel, Select, Datepicker } from '@navikt/fp-form-hooks';
import { useFormValidators } from '@navikt/fp-validation';

import { Fødsel } from 'types/OmBarnet';

export type FormValues = {
    antallBarnDropDown?: string;
} & Fødsel;

const FødselPanel: React.FunctionComponent = () => {
    const {
        isRequired,
        date: {
            isValidDate,
            isBeforeTodayOrToday,
            isAfterOrSameAsSixMonthsAgo,
            isLessThanThreeWeeksAgo,
            erI22SvangerskapsukeEllerSenere,
        },
    } = useFormValidators();

    const { watch } = useFormContext<FormValues>();

    const erBarnetFødt = watch('erBarnetFødt');
    const antallBarn = watch('antallBarn');

    return (
        <>
            <RadioGroupPanel
                name="erBarnetFødt"
                label={<FormattedMessage id="omBarnet.spørsmål.erBarnetFødt" />}
                validate={[isRequired('omBarnet.spørsmål.erBarnetFødt.required')]}
            >
                <Radio value={true}>
                    <FormattedMessage id="omBarnet.radiobutton.ja" />
                </Radio>
                <Radio value={false}>
                    <FormattedMessage id="omBarnet.radiobutton.nei" />
                </Radio>
            </RadioGroupPanel>
            {erBarnetFødt && (
                <Datepicker
                    name="fødselsdatoer.0"
                    label={<FormattedMessage id="søknad.fødselsdato" />}
                    minDate={dayjs().subtract(6, 'month').toDate()}
                    maxDate={dayjs().toDate()}
                    validate={[
                        isRequired('valideringsfeil.omBarnet.terminbekreftelseDato.duMåOppgi'),
                        isValidDate('invalidFormatErrorKey.fødselsdato'),
                        isBeforeTodayOrToday('valideringsfeil.omBarnet.fodselsdato.måVæreIdagEllerTidligere'),
                        isAfterOrSameAsSixMonthsAgo('valideringsfeil.omBarnet.fodselsdato.ikkeMerEnn6MånederTilbake'),
                    ]}
                />
            )}
            {!erBarnetFødt && (
                <Datepicker
                    name="termindato"
                    label={<FormattedMessage id="søknad.termindato" />}
                    minDate={dayjs().subtract(3, 'week').toDate()}
                    maxDate={dayjs().add(18, 'weeks').add(3, 'days').toDate()}
                    validate={[
                        isRequired('valideringsfeil.omBarnet.termindato.duMåOppgi'),
                        isValidDate('invalidFormatErrorKey.termindato'),
                        isLessThanThreeWeeksAgo(
                            'valideringsfeil.omBarnet.termindato.termindatoKanIkkeVære3UkerFraIdag',
                        ),
                        erI22SvangerskapsukeEllerSenere('valideringsfeil.omBarnet.termindato.duMåVæreIUke22'),
                    ]}
                />
            )}

            <RadioGroupPanel
                name="antallBarn"
                label={
                    <FormattedMessage
                        id={erBarnetFødt ? 'omBarnet.text.antallBarn.født' : 'omBarnet.text.antallBarn.termin'}
                    />
                }
                validate={[
                    isRequired(
                        erBarnetFødt
                            ? 'omBarnet.text.antallBarn.født.required'
                            : 'omBarnet.text.antallBarn.venter.required',
                    ),
                ]}
            >
                <Radio value={1}>
                    <FormattedMessage id="omBarnet.radiobutton.ettbarn" />
                </Radio>
                <Radio value={2}>
                    <FormattedMessage id="omBarnet.radiobutton.tvillinger" />
                </Radio>
                <Radio value={3}>
                    <FormattedMessage id="omBarnet.radiobutton.flere" />
                </Radio>
            </RadioGroupPanel>
            {antallBarn >= 3 && (
                <Select
                    name="antallBarnDropDown"
                    label={
                        <FormattedMessage
                            id={erBarnetFødt ? 'omBarnet.text.antallBarn.født' : 'omBarnet.text.antallBarn.termin'}
                        />
                    }
                    validate={[
                        isRequired(
                            erBarnetFødt
                                ? 'omBarnet.text.antallBarn.født.required'
                                : 'omBarnet.text.antallBarn.venter.required',
                        ),
                    ]}
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
        </>
    );
};

export default FødselPanel;
