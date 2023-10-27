import { useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';
import { Radio } from '@navikt/ds-react';
import { RadioGroup, Select, Datepicker } from '@navikt/fp-form-hooks';

import { Fødsel } from 'types/OmBarnet';
import { useCustomIntl } from '@navikt/fp-ui';
import {
    erI22SvangerskapsukeEllerSenere,
    isAfterOrSameAsSixMonthsAgo,
    isBeforeTodayOrToday,
    isLessThanThreeWeeksAgo,
    isRequired,
    isValidDate,
} from '@navikt/fp-validation';

export type FormValues = {
    antallBarnDropDown?: string;
} & Fødsel;

const FødselPanel: React.FunctionComponent = () => {
    const { i18n } = useCustomIntl();

    const { watch } = useFormContext<FormValues>();

    const erBarnetFødt = watch('erBarnetFødt');
    const antallBarn = watch('antallBarn');

    return (
        <>
            <RadioGroup
                name="erBarnetFødt"
                label={<FormattedMessage id="FødselPanel.Spørsmål.ErBarnetFødt" />}
                validate={[isRequired(i18n('FødselPanel.Spørsmål.ErBarnetFødt.Required'))]}
            >
                <Radio value={true}>
                    <FormattedMessage id="FødselPanel.Radiobutton.Ja" />
                </Radio>
                <Radio value={false}>
                    <FormattedMessage id="FødselPanel.Radiobutton.Nei" />
                </Radio>
            </RadioGroup>
            {erBarnetFødt && (
                <Datepicker
                    name="fødselsdato"
                    label={<FormattedMessage id="FødselPanel.Fødselsdato" />}
                    minDate={dayjs().subtract(6, 'month').toDate()}
                    maxDate={dayjs().toDate()}
                    validate={[
                        isRequired(i18n('FødselPanel.Fødselsdato.DuMåOppgi')),
                        isValidDate(i18n('FødselPanel.Fødselsdato.Gyldig')),
                        isBeforeTodayOrToday(i18n('FødselPanel.Fodselsdato.MåVæreIdagEllerTidligere')),
                        isAfterOrSameAsSixMonthsAgo(i18n('FødselPanel.Fodselsdato.IkkeMerEnn6MånederTilbake')),
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
                        isRequired(i18n('FødselPanel.Termindato.DuMåOppgi')),
                        isValidDate(i18n('FødselPanel.Termindato.Gyldig')),
                        isLessThanThreeWeeksAgo(i18n('FødselPanel.Termindato.TermindatoKanIkkeVære3UkerFraIdag')),
                        erI22SvangerskapsukeEllerSenere(i18n('FødselPanel.Termindato.DuMåVæreIUke22')),
                    ]}
                />
            )}

            <RadioGroup
                name="antallBarn"
                label={erBarnetFødt ? i18n('FødselPanel.AntallBarn.Født') : i18n('FødselPanel.AntallBarn.Termin')}
                validate={[
                    isRequired(
                        erBarnetFødt
                            ? i18n('FødselPanel.AntallBarn.Født.Required')
                            : i18n('FødselPanel.AntallBarn.Venter.Required'),
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
            </RadioGroup>
            {antallBarn >= 3 && (
                <Select
                    name="antallBarnDropDown"
                    label={erBarnetFødt ? i18n('FødselPanel.AntallBarn.Født') : i18n('FødselPanel.AntallBarn.Termin')}
                    validate={[
                        isRequired(
                            erBarnetFødt
                                ? i18n('FødselPanel.AntallBarn.Født.Required')
                                : i18n('FødselPanel.AntallBarn.Venter.Required'),
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
