import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Fødsel } from 'types/OmBarnet';

import { Radio } from '@navikt/ds-react';

import { Datepicker, RadioGroup, Select } from '@navikt/fp-form-hooks';
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
    const intl = useIntl();

    const { watch } = useFormContext<FormValues>();

    const erBarnetFødt = watch('erBarnetFødt');
    const antallBarn = watch('antallBarn');

    return (
        <>
            <RadioGroup
                name="erBarnetFødt"
                label={<FormattedMessage id="FødselPanel.Spørsmål.ErBarnetFødt" />}
                validate={[isRequired(intl.formatMessage({ id: 'FødselPanel.Spørsmål.ErBarnetFødt.Required' }))]}
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
                    description={intl.formatMessage({ id: 'FødselPanel.TermindatoFodselsdato.beskrivelse' })}
                    minDate={dayjs().subtract(6, 'month').toDate()}
                    maxDate={dayjs().toDate()}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'FødselPanel.Fødselsdato.DuMåOppgi' })),
                        isValidDate(intl.formatMessage({ id: 'FødselPanel.Fødselsdato.Gyldig' })),
                        isBeforeTodayOrToday(
                            intl.formatMessage({ id: 'FødselPanel.Fodselsdato.MåVæreIdagEllerTidligere' }),
                        ),
                        isAfterOrSameAsSixMonthsAgo(
                            intl.formatMessage({ id: 'FødselPanel.Fodselsdato.IkkeMerEnn6MånederTilbake' }),
                        ),
                    ]}
                />
            )}
            {!erBarnetFødt && (
                <Datepicker
                    name="termindato"
                    label={<FormattedMessage id="FødselPanel.Termindato" />}
                    description={intl.formatMessage({ id: 'FødselPanel.TermindatoFodselsdato.beskrivelse' })}
                    minDate={dayjs().subtract(3, 'week').toDate()}
                    maxDate={dayjs().add(18, 'weeks').add(3, 'days').toDate()}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'FødselPanel.Termindato.DuMåOppgi' })),
                        isValidDate(intl.formatMessage({ id: 'FødselPanel.Termindato.Gyldig' })),
                        isLessThanThreeWeeksAgo(
                            intl.formatMessage({ id: 'FødselPanel.Termindato.TermindatoKanIkkeVære3UkerFraIdag' }),
                        ),
                        erI22SvangerskapsukeEllerSenere(
                            intl.formatMessage({ id: 'FødselPanel.Termindato.DuMåVæreIUke22' }),
                        ),
                    ]}
                />
            )}

            <RadioGroup
                name="antallBarn"
                label={
                    erBarnetFødt
                        ? intl.formatMessage({ id: 'FødselPanel.AntallBarn.Født' })
                        : intl.formatMessage({ id: 'FødselPanel.AntallBarn.Termin' })
                }
                description={intl.formatMessage({ id: 'FødselPanel.AntallBarn.TerminBeskrivelse' })}
                validate={[
                    isRequired(
                        erBarnetFødt
                            ? intl.formatMessage({ id: 'FødselPanel.AntallBarn.Født.Required' })
                            : intl.formatMessage({ id: 'FødselPanel.AntallBarn.Venter.Required' }),
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
                    label={
                        erBarnetFødt
                            ? intl.formatMessage({ id: 'FødselPanel.AntallBarn.Født' })
                            : intl.formatMessage({ id: 'FødselPanel.AntallBarn.Termin' })
                    }
                    validate={[
                        isRequired(
                            erBarnetFødt
                                ? intl.formatMessage({ id: 'FødselPanel.AntallBarn.Født.Required' })
                                : intl.formatMessage({ id: 'FødselPanel.AntallBarn.Venter.Required' }),
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
