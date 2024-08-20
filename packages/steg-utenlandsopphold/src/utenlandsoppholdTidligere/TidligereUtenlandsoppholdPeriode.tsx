import { XMarkIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, VStack } from '@navikt/ds-react';

import { DATE_1_YEAR_AGO, DATE_TODAY } from '@navikt/fp-constants';
import { Datepicker, Select } from '@navikt/fp-form-hooks';
import { UtenlandsoppholdPeriode } from '@navikt/fp-types';
import { createCountryOptions, formatDate, isDateAAfterDateB } from '@navikt/fp-utils';
import {
    isAfterOrSame,
    isBeforeOrSame,
    isDateWithinRange,
    isDatesNotTheSame,
    isPeriodNotOverlappingOthers,
    isRequired,
    isValidDate,
} from '@navikt/fp-validation';

interface OwnProps {
    index: number;
    fjernOpphold: (index: number) => void;
}

const TidligereUtenlandsoppholdPanel: React.FunctionComponent<OwnProps> = ({ index, fjernOpphold }) => {
    const intl = useIntl();

    const {
        watch,
        trigger,
        formState: { isSubmitted },
    } = useFormContext<{ utenlandsoppholdSiste12Mnd: UtenlandsoppholdPeriode[] }>();

    const alleAndreUtenlandsopphold = watch(`utenlandsoppholdSiste12Mnd`).filter((_u, i) => i !== index);
    const fom = watch(`utenlandsoppholdSiste12Mnd.${index}.fom`);
    const tom = watch(`utenlandsoppholdSiste12Mnd.${index}.tom`);

    const minDateFom = dayjs(DATE_1_YEAR_AGO).toDate();
    const maxDateFom = tom ? dayjs(tom).subtract(1, 'days').toDate() : dayjs(DATE_TODAY).toDate();

    const minDateTom =
        fom && isDateAAfterDateB(fom, DATE_1_YEAR_AGO)
            ? dayjs(fom).add(1, 'days').toDate()
            : dayjs(DATE_1_YEAR_AGO).toDate();
    const maxDateTom = dayjs(DATE_TODAY).toDate();

    return (
        <VStack gap="5" align="start">
            <Select
                name={`utenlandsoppholdSiste12Mnd.${index}.landkode`}
                label={<FormattedMessage id="TidligereUtenlandsoppholdSteg.Spørsmål.HvilketLandHarDuBoddI" />}
                validate={[
                    isRequired(
                        intl.formatMessage({
                            id: 'TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuHarBoddIPåkrevd',
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
                label={<FormattedMessage id="TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed" />}
                minDate={minDateFom}
                maxDate={maxDateFom}
                validate={[
                    isRequired(
                        intl.formatMessage({
                            id: 'TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved',
                        }),
                    ),
                    isValidDate(intl.formatMessage({ id: 'TidligereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato' })),
                    isDatesNotTheSame(intl.formatMessage({ id: 'TidligereUtenlandsoppholdSteg.FomErLikTom' }), tom),
                    isBeforeOrSame(
                        intl.formatMessage({ id: 'TidligereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato' }),
                        tom,
                    ),
                    isDateWithinRange(
                        intl.formatMessage(
                            { id: 'TidligereUtenlandsoppholdSteg.DateOutsideRangeFom' },
                            {
                                min: formatDate(minDateFom),
                                max: formatDate(maxDateFom),
                            },
                        ),
                        minDateFom,
                        maxDateFom,
                    ),
                    isPeriodNotOverlappingOthers(
                        intl.formatMessage({
                            id: 'TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp',
                        }),
                        { date: tom, isStartDate: false },
                        alleAndreUtenlandsopphold,
                    ),
                ]}
                onChange={() => isSubmitted && trigger()}
                defaultMonth={tom ? dayjs(tom).toDate() : undefined}
            />
            <Datepicker
                name={`utenlandsoppholdSiste12Mnd.${index}.tom`}
                label={<FormattedMessage id="TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed" />}
                minDate={minDateTom}
                maxDate={maxDateTom}
                validate={[
                    isRequired(
                        intl.formatMessage({
                            id: 'TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuHarBoddIPåkreved',
                        }),
                    ),
                    isValidDate(intl.formatMessage({ id: 'TidligereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato' })),
                    isDatesNotTheSame(intl.formatMessage({ id: 'TidligereUtenlandsoppholdSteg.TomErLikFom' }), fom),
                    isAfterOrSame(
                        intl.formatMessage({ id: 'TidligereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato' }),
                        fom,
                    ),
                    isDateWithinRange(
                        intl.formatMessage(
                            { id: 'TidligereUtenlandsoppholdSteg.DateOutsideRangeTom' },
                            {
                                min: formatDate(minDateTom),
                                max: formatDate(maxDateTom),
                            },
                        ),
                        minDateTom,
                        maxDateTom,
                    ),
                    isPeriodNotOverlappingOthers(
                        intl.formatMessage({
                            id: 'TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp',
                        }),
                        { date: fom, isStartDate: true },
                        alleAndreUtenlandsopphold,
                    ),
                ]}
                onChange={() => isSubmitted && trigger()}
            />
            {index > 0 && (
                <Button
                    type="button"
                    variant="tertiary"
                    size="small"
                    icon={<XMarkIcon aria-hidden />}
                    onClick={() => fjernOpphold(index)}
                >
                    <FormattedMessage id="TidligereUtenlandsoppholdSteg.Knapp.SlettOpphold" />
                </Button>
            )}
        </VStack>
    );
};

export default TidligereUtenlandsoppholdPanel;
