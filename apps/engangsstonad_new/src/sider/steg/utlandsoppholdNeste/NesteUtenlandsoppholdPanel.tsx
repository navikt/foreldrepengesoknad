import { FormattedMessage, useIntl } from 'react-intl';
import { useFormContext } from 'react-hook-form';
import { TrashIcon } from '@navikt/aksel-icons';
import { Button, VStack } from '@navikt/ds-react';
import { date1YearFromNow, dateToday } from '@navikt/fp-common';

import { createCountryOptions } from 'fpcommon/util/countryUtils';
import Datepicker from 'fpcommon/form/Datepicker';
import Select from 'fpcommon/form/Select';
import dayjs from 'dayjs';
import {
    isRequired,
    validateDatesNotEqual,
    validateFromDate,
    validateToDate,
} from 'fpcommon/validering/valideringsregler';

export type FormValues = {
    fom?: string;
    tom?: string;
    landkode?: string;
};

interface OwnProps {
    index: number;
    fjernOpphold: (index: number) => void;
}

const NesteUtenlandsoppholdPanel: React.FunctionComponent<OwnProps> = ({ index, fjernOpphold }) => {
    const intl = useIntl();
    const { watch } = useFormContext<{ utenlandsoppholdNeste12Mnd: FormValues[] }>();

    // TODO Manglar validering på tvers av periodar

    const fom = watch(`utenlandsoppholdNeste12Mnd.${index}.fom`);
    const tom = watch(`utenlandsoppholdNeste12Mnd.${index}.tom`);

    const minDateFom = dayjs(dateToday).subtract(1, 'day').toDate();
    const maxDateFom = tom ? dayjs(tom).toDate() : dayjs(date1YearFromNow).add(1, 'day').toDate();

    const minDateTom = dayjs(fom || dateToday)
        .subtract(1, 'day')
        .toDate();
    const maxDateTom = dayjs(date1YearFromNow).add(1, 'day').toDate();

    return (
        <VStack gap="5" align="start">
            <Select
                name={`utenlandsoppholdNeste12Mnd.${index}.landkode`}
                label={
                    <FormattedMessage id={'utenlandsopphold.leggTilUtenlandsopphold.spørsmål.hvilketLandSkalDuBoI'} />
                }
                validate={[
                    isRequired(
                        intl.formatMessage({
                            id: 'valideringsfeil.leggTilUtenlandsopphold.landDuSkalBoIPåkreved',
                        }),
                    ),
                ]}
            >
                {createCountryOptions().map((o: Record<string, any>) => (
                    <option key={o[0]} value={o[0]}>
                        {o[1]}
                    </option>
                ))}
            </Select>
            <Datepicker
                name={`utenlandsoppholdNeste12Mnd.${index}.fom`}
                label={<FormattedMessage id="utenlandsopphold.leggTilUtenlandsopphold.fraogmed" />}
                minDate={dayjs(dateToday).subtract(1, 'day').toDate()}
                maxDate={tom ? dayjs(tom).toDate() : dayjs(date1YearFromNow).add(1, 'day').toDate()}
                validate={[
                    isRequired(
                        intl.formatMessage({
                            id: 'valideringsfeil.leggTilUtenlandsopphold.landFomDuSkalBoIPåkreved',
                        }),
                    ),
                    validateDatesNotEqual(
                        intl.formatMessage({
                            id: 'valideringsfeil.fomErLikTom',
                        }),
                        tom,
                    ),
                    (fomValue) => {
                        return validateFromDate(
                            intl,
                            dayjs(fomValue).toDate(),
                            minDateFom,
                            maxDateFom,
                            dayjs(tom).toDate(),
                        );
                    },
                ]}
            />
            <Datepicker
                name={`utenlandsoppholdNeste12Mnd.${index}.tom`}
                label={<FormattedMessage id="utenlandsopphold.leggTilUtenlandsopphold.tilogmed" />}
                minDate={minDateTom}
                maxDate={maxDateTom}
                validate={[
                    validateDatesNotEqual(
                        intl.formatMessage({
                            id: 'valideringsfeil.tomErLikFom',
                        }),
                        fom,
                    ),
                    (tomValue) => {
                        return validateToDate(
                            intl,
                            dayjs(tomValue).toDate(),
                            dayjs(fom || dateToday)
                                .subtract(1, 'day')
                                .toDate(),
                            dayjs(date1YearFromNow).add(1, 'day').toDate(),
                            dayjs(fom).toDate(),
                        );
                    },
                ]}
            />
            {index > 0 && (
                <Button
                    type="button"
                    variant="tertiary"
                    size="small"
                    icon={<TrashIcon aria-hidden />}
                    onClick={() => fjernOpphold(index)}
                >
                    <FormattedMessage id="utenlandsopphold.knapp.SlettOpphold" />
                </Button>
            )}
        </VStack>
    );
};

export default NesteUtenlandsoppholdPanel;
