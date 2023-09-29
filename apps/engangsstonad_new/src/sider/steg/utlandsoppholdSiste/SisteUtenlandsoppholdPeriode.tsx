import { FormattedMessage, useIntl } from 'react-intl';
import { useFormContext } from 'react-hook-form';
import { TrashIcon } from '@navikt/aksel-icons';
import { Button, VStack } from '@navikt/ds-react';
import { date1YearAgo, dateToday } from '@navikt/fp-common';

import { createCountryOptions } from 'fpcommon/util/countryUtils';
import Datepicker from 'fpcommon/form/Datepicker';
import Select from 'fpcommon/form/Select';
import dayjs from 'dayjs';
import {
    validateDatesNotEqual,
    isRequired,
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

const SisteUtenlandsoppholdPeriode: React.FunctionComponent<OwnProps> = ({ index, fjernOpphold }) => {
    const intl = useIntl();
    const { watch } = useFormContext<{ utenlandsoppholdSiste12Mnd: FormValues[] }>();

    const fom = watch(`utenlandsoppholdSiste12Mnd.${index}.fom`);
    const tom = watch(`utenlandsoppholdSiste12Mnd.${index}.tom`);

    const minDateFom = dayjs(date1YearAgo).subtract(1, 'day').toDate();
    const maxDateFom = tom ? dayjs(tom).toDate() : dayjs(dateToday).add(1, 'day').toDate();

    const minDateTom = fom ? dayjs(fom).toDate() : dayjs(date1YearAgo).subtract(1, 'day').toDate();
    const maxDateTom = dayjs(dateToday).add(1, 'day').toDate();

    return (
        <VStack gap="5" align="start">
            <Select
                name={`utenlandsoppholdSiste12Mnd.${index}.landkode`}
                label={
                    <FormattedMessage id="utenlandsopphold.leggTilUtenlandsopphold.spørsmål.hvilketLandHarDuBoddI" />
                }
                validate={[
                    isRequired(
                        intl.formatMessage({
                            id: 'valideringsfeil.leggTilUtenlandsopphold.landDuHarBoddIPåkrevd',
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
                name={`utenlandsoppholdSiste12Mnd.${index}.fom`}
                label={<FormattedMessage id="utenlandsopphold.leggTilUtenlandsopphold.fraogmed" />}
                minDate={minDateFom}
                maxDate={maxDateFom}
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
                name={`utenlandsoppholdSiste12Mnd.${index}.tom`}
                label={<FormattedMessage id="utenlandsopphold.leggTilUtenlandsopphold.tilogmed" />}
                minDate={minDateTom}
                maxDate={maxDateTom}
                validate={[
                    isRequired(
                        intl.formatMessage({
                            id: 'valideringsfeil.leggTilUtenlandsopphold.landTomDuHarBoddIPåkreved',
                        }),
                    ),
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
                            minDateTom,
                            maxDateTom,
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

export default SisteUtenlandsoppholdPeriode;
