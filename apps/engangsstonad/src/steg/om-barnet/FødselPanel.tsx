import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Fødsel } from 'types/OmBarnet';

import { Radio } from '@navikt/ds-react';

import { RhfDatepicker, RhfRadioGroup, RhfSelect } from '@navikt/fp-form-hooks';
import {
    erI22SvangerskapsukeEllerSenere,
    isAfterOrSameAsSixMonthsAgo,
    isBeforeTodayOrToday,
    isRequired,
    isValidDate,
} from '@navikt/fp-validation';
import { isLessThanThreeWeeksBeforeFødsel } from '@navikt/fp-validation/src/form/dateFormValidation';

export type FormValues = {
    antallBarnDropDown?: string;
} & Fødsel;

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
                validate={[isRequired(intl.formatMessage({ id: 'FødselPanel.Spørsmål.ErBarnetFødt.Required' }))]}
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
                minDate={dayjs(fødselsdato).subtract(3, 'week').toDate()}
                maxDate={dayjs().add(18, 'weeks').add(3, 'days').toDate()}
                validate={[
                    isRequired(intl.formatMessage({ id: 'FødselPanel.Termindato.DuMåOppgi' })),
                    isValidDate(intl.formatMessage({ id: 'FødselPanel.Termindato.Gyldig' })),
                    isLessThanThreeWeeksBeforeFødsel(
                        intl.formatMessage({ id: 'FødselPanel.Termindato.TermindatoKanIkkeVære3UkerFørFødsel' }),
                        fødselsdato,
                    ),
                    erI22SvangerskapsukeEllerSenere(
                        intl.formatMessage({ id: 'FødselPanel.Termindato.DuMåVæreIUke22' }),
                    ),
                ]}
            />
            {erBarnetFødt && (
                <RhfDatepicker
                    name="fødselsdato"
                    control={control}
                    label={<FormattedMessage id="FødselPanel.Fødselsdato" />}
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
            <RhfRadioGroup
                name="antallBarn"
                control={control}
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
            </RhfRadioGroup>
            {antallBarn >= 3 && (
                <RhfSelect
                    name="antallBarnDropDown"
                    control={control}
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
                </RhfSelect>
            )}
        </>
    );
};
