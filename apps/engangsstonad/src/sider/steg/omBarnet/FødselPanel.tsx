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
                label={<FormattedMessage id="FødselPanel.Spørsmål.ErBarnetFødt" />}
                validate={[isRequired('FødselPanel.Spørsmål.ErBarnetFødt.Required')]}
            >
                <Radio value={true}>
                    <FormattedMessage id="FødselPanel.Radiobutton.Ja" />
                </Radio>
                <Radio value={false}>
                    <FormattedMessage id="FødselPanel.Radiobutton.Nei" />
                </Radio>
            </RadioGroupPanel>
            {erBarnetFødt && (
                <Datepicker
                    name="fødselsdatoer.0"
                    label={<FormattedMessage id="FødselPanel.Fødselsdato" />}
                    minDate={dayjs().subtract(6, 'month').toDate()}
                    maxDate={dayjs().toDate()}
                    validate={[
                        isRequired('FødselPanel.Fødselsdato.DuMåOppgi'),
                        isValidDate('FødselPanel.Fødselsdato.Gyldig'),
                        isBeforeTodayOrToday('FødselPanel.Fodselsdato.MåVæreIdagEllerTidligere'),
                        isAfterOrSameAsSixMonthsAgo('FødselPanel.Fodselsdato.IkkeMerEnn6MånederTilbake'),
                    ]}
                />
            )}
            {!erBarnetFødt && (
                <Datepicker
                    name="termindato"
                    label={<FormattedMessage id="FødselPanel.Termindato" />}
                    minDate={dayjs().subtract(3, 'week').toDate()}
                    maxDate={dayjs().add(18, 'weeks').add(3, 'days').toDate()}
                    validate={[
                        isRequired('FødselPanel.Termindato.DuMåOppgi'),
                        isValidDate('FødselPanel.Termindato.Gyldig'),
                        isLessThanThreeWeeksAgo('FødselPanel.Termindato.TermindatoKanIkkeVære3UkerFraIdag'),
                        erI22SvangerskapsukeEllerSenere('FødselPanel.Termindato.DuMåVæreIUke22'),
                    ]}
                />
            )}

            <RadioGroupPanel
                name="antallBarn"
                label={
                    <FormattedMessage
                        id={erBarnetFødt ? 'FødselPanel.AntallBarn.Født' : 'FødselPanel.AntallBarn.Termin'}
                    />
                }
                validate={[
                    isRequired(
                        erBarnetFødt
                            ? 'FødselPanel.AntallBarn.Født.Required'
                            : 'FødselPanel.AntallBarn.Venter.Required',
                    ),
                ]}
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
            </RadioGroupPanel>
            {antallBarn >= 3 && (
                <Select
                    name="antallBarnDropDown"
                    label={
                        <FormattedMessage
                            id={erBarnetFødt ? 'FødselPanel.AntallBarn.Født' : 'FødselPanel.AntallBarn.Termin'}
                        />
                    }
                    validate={[
                        isRequired(
                            erBarnetFødt
                                ? 'FødselPanel.AntallBarn.Født.Required'
                                : 'FødselPanel.AntallBarn.Venter.Required',
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
