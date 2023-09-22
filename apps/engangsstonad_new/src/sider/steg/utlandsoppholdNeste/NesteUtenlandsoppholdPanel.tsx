import { FormattedMessage, useIntl } from 'react-intl';
import { useFormContext } from 'react-hook-form';
import { TrashIcon } from '@navikt/aksel-icons';
import { Button, VStack, HStack } from '@navikt/ds-react';
import { date1YearFromNow, dateToday } from '@navikt/fp-common';

import { createCountryOptions } from 'fpcommon/util/countryUtils';
import Datepicker from 'fpcommon/form/Datepicker';
import Select from 'fpcommon/form/Select';
import dayjs from 'dayjs';
import { isRequired, validateFromDate, validateToDate } from 'fpcommon/validering/valideringsregler';

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
            <HStack gap="10">
                <Datepicker
                    name={`utenlandsoppholdNeste12Mnd.${index}.fom`}
                    label={<FormattedMessage id="utenlandsopphold.leggTilUtenlandsopphold.fraogmed" />}
                    disabledDays={[
                        {
                            from: dayjs().subtract(50, 'year').toDate(),
                            to: dayjs(dateToday).subtract(1, 'day').toDate(),
                        },
                        {
                            from: tom ? dayjs(tom).toDate() : dayjs(date1YearFromNow).add(1, 'day').toDate(),
                            to: dayjs().add(50, 'year').toDate(),
                        },
                    ]}
                    validate={[
                        isRequired(
                            intl.formatMessage({
                                id: 'valideringsfeil.leggTilUtenlandsopphold.landFomDuSkalBoIPåkreved',
                            }),
                        ),
                        (fomValue) => {
                            if (tom && fomValue && dayjs(tom).isSame(fomValue)) {
                                return intl.formatMessage({ id: 'valideringsfeil.fomErLikTom' });
                            }
                            return validateFromDate(
                                intl,
                                dayjs(fomValue).toDate(),
                                dayjs(dateToday).subtract(1, 'day').toDate(),
                                tom ? dayjs(tom).toDate() : dayjs(date1YearFromNow).add(1, 'day').toDate(),
                                dayjs(tom).toDate(),
                            );
                        },
                    ]}
                />
                <Datepicker
                    name={`utenlandsoppholdNeste12Mnd.${index}.tom`}
                    label={<FormattedMessage id="utenlandsopphold.leggTilUtenlandsopphold.fraogmed" />}
                    disabledDays={[
                        {
                            from: dayjs().subtract(50, 'year').toDate(),
                            to: dayjs(fom || dateToday)
                                .subtract(1, 'day')
                                .toDate(),
                        },
                        {
                            from: dayjs(date1YearFromNow).add(1, 'day').toDate(),
                            to: dayjs().add(50, 'year').toDate(),
                        },
                    ]}
                    validate={[
                        (tomValue) => {
                            if (tomValue && fom && dayjs(tomValue).isSame(fom)) {
                                return intl.formatMessage({ id: 'valideringsfeil.tomErLikFom' });
                            }
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
            </HStack>
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
