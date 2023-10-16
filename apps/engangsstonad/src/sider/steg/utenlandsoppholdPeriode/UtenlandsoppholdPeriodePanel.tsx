import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { TrashIcon } from '@navikt/aksel-icons';
import { Button, HStack, Radio, Tag, VStack } from '@navikt/ds-react';
import { date1YearAgo, date1YearFromNow, dateRangesCollide, dateToday } from '@navikt/fp-common';
import { createCountryOptions } from '@navikt/fp-utils';
import { Datepicker, RadioGroupPanel, Select } from '@navikt/fp-form-hooks';
import { useFormValidators } from '@navikt/fp-validation';
import { ISO_DATE_FORMAT, TIDENES_ENDE } from '@navikt/fp-constants';

import { validateFromDate, validateToDate } from '../../../fpcommon/validering/valideringsregler';
import { Periode } from 'types/Utenlandsopphold';

const validerPeriodeOverlapp = (
    intl: IntlShape,
    alleAndrePerioder: Periode[],
    fom?: string,
    tom?: string,
): string | null => {
    const dateRanges = alleAndrePerioder.map((u) => ({
        from: dayjs(u.fom).toDate(),
        to: u.tom ? dayjs(u.tom).toDate() : TIDENES_ENDE,
    }));

    const allDateRanges = dateRanges.concat({
        from: dayjs(fom).toDate(),
        to: tom ? dayjs(tom).toDate() : TIDENES_ENDE,
    });

    if (dateRangesCollide(allDateRanges)) {
        return intl.formatMessage({
            id: 'UtenlandsoppholdPeriodePanel.Valideringsfeil.Utenlandsopphold.Overlapp',
        });
    }
    return null;
};

interface OwnProps {
    index: number;
    fjernOpphold: (index: number) => void;
}

const UtenlandsoppholdPeriodePanel: React.FunctionComponent<OwnProps> = ({ index, fjernOpphold }) => {
    const intl = useIntl();
    const {
        isRequired,
        date: { isDatesValidAndTheSame },
    } = useFormValidators();

    const {
        watch,
        trigger,
        setValue,
        resetField,
        formState: { isSubmitted },
    } = useFormContext<{ perioder: Periode[] }>();

    const alleAndreUtenlandsopphold = watch(`perioder`).filter((_u, i) => i !== index);
    const harFlyttetUtForMerEnn12MånderSiden = watch(`perioder.${index}.harFlyttetUtForMerEnn12MånderSiden`);
    const skalBoIUtlandetMerEnEttÅrFremover = watch(`perioder.${index}.skalBoIUtlandetMerEnEttÅrFremover`);
    const fom = watch(`perioder.${index}.fom`);
    const tom = watch(`perioder.${index}.tom`);

    const minDateFom = dayjs(date1YearAgo).toDate();
    const maxDateFom = tom ? dayjs(tom).toDate() : dayjs(date1YearFromNow).toDate();

    const minDateTom = dayjs(fom || date1YearAgo).toDate();
    const maxDateTom = dayjs(date1YearFromNow).toDate();

    return (
        <>
            <VStack gap="2">
                <hr style={{ width: '100%' }} color="#99C4DD" />
                <HStack justify="space-between">
                    <Tag variant="info">
                        <FormattedMessage id="UtenlandsoppholdPeriodePanel.OppholdIUtlandet" />
                    </Tag>
                    {index > 0 && (
                        <Button
                            type="button"
                            variant="tertiary"
                            size="small"
                            icon={<TrashIcon aria-hidden />}
                            onClick={() => fjernOpphold(index)}
                        >
                            <FormattedMessage id="UtenlandsoppholdPeriodePanel.SlettOpphold" />
                        </Button>
                    )}
                </HStack>
            </VStack>
            <VStack gap="10" align="start">
                <Select
                    name={`perioder.${index}.landkode`}
                    label={<FormattedMessage id={'UtenlandsoppholdPeriodePanel.Land'} />}
                    validate={[isRequired('UtenlandsoppholdPeriodePanel.Validering.Land.Required')]}
                >
                    {createCountryOptions().map((o: Record<string, any>) => (
                        <option key={o[0]} value={o[0]}>
                            {o[1]}
                        </option>
                    ))}
                </Select>
                <RadioGroupPanel
                    name={`perioder.${index}.harFlyttetUtForMerEnn12MånderSiden`}
                    label={<FormattedMessage id="UtenlandsoppholdPeriodePanel.Historisk.Spørsmål" />}
                    validate={[isRequired('UtenlandsoppholdPeriodePanel.Historisk.IsRequired')]}
                    onChange={(value) => {
                        if (value) {
                            const ettÅrSiden = dayjs(date1YearAgo).format(ISO_DATE_FORMAT);
                            setValue(`perioder.${index}.fom`, ettÅrSiden);
                        } else if (value === false) {
                            resetField(`perioder.${index}.fom`);
                        }
                    }}
                >
                    <Radio value={false}>
                        <FormattedMessage id="UtenlandsoppholdPeriodePanel.Nei" />
                    </Radio>
                    <Radio value={true}>
                        <FormattedMessage id="UtenlandsoppholdPeriodePanel.Ja" />
                    </Radio>
                </RadioGroupPanel>
                {harFlyttetUtForMerEnn12MånderSiden === false && (
                    <Datepicker
                        name={`perioder.${index}.fom`}
                        label={<FormattedMessage id="UtenlandsoppholdPeriodePanel.Fraogmed" />}
                        minDate={minDateFom}
                        maxDate={tom ? dayjs(tom).toDate() : dayjs(date1YearFromNow).toDate()}
                        validate={[
                            isRequired('UtenlandsoppholdPeriodePanel.Validering.Fraogmed.Required'),
                            isDatesValidAndTheSame('valideringsfeil.fomErLikTom', tom),
                            (fomValue) => {
                                return validateFromDate(
                                    intl,
                                    dayjs(fomValue).toDate(),
                                    minDateFom,
                                    maxDateFom,
                                    dayjs(tom).toDate(),
                                );
                            },
                            (fomValue) => {
                                return validerPeriodeOverlapp(intl, alleAndreUtenlandsopphold, fomValue, tom);
                            },
                        ]}
                        onChange={() => isSubmitted && trigger()}
                    />
                )}
                <RadioGroupPanel
                    name={`perioder.${index}.skalBoIUtlandetMerEnEttÅrFremover`}
                    label={<FormattedMessage id="UtenlandsoppholdPeriodePanel.Fremtidig.Spørsmål" />}
                    validate={[isRequired('UtenlandsoppholdPeriodePanel.Fremtidig.IsRequired')]}
                    onChange={(value) => {
                        if (value) {
                            const ettÅrFrem = dayjs(date1YearFromNow).format(ISO_DATE_FORMAT);
                            setValue(`perioder.${index}.tom`, ettÅrFrem);
                        } else if (value === false) {
                            resetField(`perioder.${index}.tom`);
                        }
                    }}
                >
                    <Radio value={false}>
                        <FormattedMessage id="UtenlandsoppholdPeriodePanel.Nei" />
                    </Radio>
                    <Radio value={true}>
                        <FormattedMessage id="UtenlandsoppholdPeriodePanel.Ja" />
                    </Radio>
                </RadioGroupPanel>
                {skalBoIUtlandetMerEnEttÅrFremover === false && (
                    <Datepicker
                        name={`perioder.${index}.tom`}
                        label={<FormattedMessage id="UtenlandsoppholdPeriodePanel.Tilogmed" />}
                        minDate={minDateTom}
                        maxDate={maxDateTom}
                        validate={[
                            isRequired('UtenlandsoppholdPeriodePanel.Validering.Tilogmed.Required'),
                            isDatesValidAndTheSame('valideringsfeil.tomErLikFom', fom),
                            (tomValue) => {
                                const tom = tomValue || TIDENES_ENDE;
                                return validateToDate(
                                    intl,
                                    dayjs(tom).toDate(),
                                    dayjs(fom || dateToday).toDate(),
                                    dayjs(date1YearFromNow).toDate(),
                                    dayjs(fom).toDate(),
                                );
                            },
                            (tomValue) => {
                                return validerPeriodeOverlapp(intl, alleAndreUtenlandsopphold, fom, tomValue);
                            },
                        ]}
                        onChange={() => isSubmitted && trigger()}
                    />
                )}
            </VStack>
        </>
    );
};

export default UtenlandsoppholdPeriodePanel;
