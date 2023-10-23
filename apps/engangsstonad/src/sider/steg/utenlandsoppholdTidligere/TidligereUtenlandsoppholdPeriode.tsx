import { FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { TrashIcon } from '@navikt/aksel-icons';
import { Button, VStack } from '@navikt/ds-react';
import { date1YearAgo, dateRangesCollide, dateToday } from '@navikt/fp-common';

import { createCountryOptions } from '@navikt/fp-utils';
import { Datepicker, Select } from '@navikt/fp-form-hooks';
import { validateFromDate, validateToDate } from './valideringsregler';
import { UtenlandsoppholdPeriode } from 'types/Utenlandsopphold';
import { isDatesNotTheSame, isRequired } from '@navikt/fp-validation';
import { I18nFn, useCustomIntl } from '@navikt/fp-ui';

const validerPeriodeOverlapp = (
    i18n: I18nFn,
    alleAndrePerioder: UtenlandsoppholdPeriode[],
    fom: string,
    tom: string,
): string | null => {
    const dateRanges = alleAndrePerioder.map((u) => ({
        from: dayjs(u.fom).toDate(),
        to: dayjs(u.tom).toDate(),
    }));

    const allDateRanges = dateRanges.concat({
        from: dayjs(fom).toDate(),
        to: dayjs(tom).toDate(),
    });

    if (dateRangesCollide(allDateRanges)) {
        return i18n('TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp');
    }
    return null;
};

interface OwnProps {
    index: number;
    fjernOpphold: (index: number) => void;
}

const TidligereUtenlandsoppholdPanel: React.FunctionComponent<OwnProps> = ({ index, fjernOpphold }) => {
    const { i18n } = useCustomIntl();

    const {
        watch,
        trigger,
        formState: { isSubmitted },
    } = useFormContext<{ utenlandsoppholdSiste12Mnd: UtenlandsoppholdPeriode[] }>();

    const alleAndreUtenlandsopphold = watch(`utenlandsoppholdSiste12Mnd`).filter((_u, i) => i !== index);
    const fom = watch(`utenlandsoppholdSiste12Mnd.${index}.fom`);
    const tom = watch(`utenlandsoppholdSiste12Mnd.${index}.tom`);

    const minDateFom = dayjs(date1YearAgo).toDate();
    const maxDateFom = tom ? dayjs(tom).toDate() : dayjs(dateToday).toDate();

    const minDateTom = fom ? dayjs(fom).toDate() : dayjs(date1YearAgo).toDate();
    const maxDateTom = dayjs(dateToday).toDate();

    return (
        <VStack gap="5" align="start">
            <Select
                name={`utenlandsoppholdSiste12Mnd.${index}.landkode`}
                label={<FormattedMessage id="TidligereUtenlandsoppholdSteg.Spørsmål.HvilketLandHarDuBoddI" />}
                validate={[
                    isRequired(i18n('TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuHarBoddIPåkrevd')),
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
                    isRequired(i18n('TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved')),
                    isDatesNotTheSame(i18n('TidligereUtenlandsoppholdSteg.FomErLikTom'), tom),
                    (fomValue) => {
                        //TODO Del opp denne funksjonen
                        return validateFromDate(
                            i18n,
                            dayjs(fomValue).toDate(),
                            minDateFom,
                            maxDateFom,
                            dayjs(tom).toDate(),
                        );
                    },
                    (fomValue) => {
                        return validerPeriodeOverlapp(i18n, alleAndreUtenlandsopphold, fomValue, tom);
                    },
                ]}
                onChange={() => isSubmitted && trigger()}
            />
            <Datepicker
                name={`utenlandsoppholdSiste12Mnd.${index}.tom`}
                label={<FormattedMessage id="TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed" />}
                minDate={minDateTom}
                maxDate={maxDateTom}
                validate={[
                    isRequired(i18n('TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuHarBoddIPåkreved')),
                    isDatesNotTheSame(i18n('TidligereUtenlandsoppholdSteg.TomErLikFom'), fom),
                    (tomValue) => {
                        //TODO Del opp denne funksjonen
                        return validateToDate(
                            i18n,
                            dayjs(tomValue).toDate(),
                            minDateTom,
                            maxDateTom,
                            dayjs(fom).toDate(),
                        );
                    },
                    (tomValue) => {
                        return validerPeriodeOverlapp(i18n, alleAndreUtenlandsopphold, fom, tomValue);
                    },
                ]}
                onChange={() => isSubmitted && trigger()}
            />
            {index > 0 && (
                <Button
                    type="button"
                    variant="tertiary"
                    size="small"
                    icon={<TrashIcon aria-hidden />}
                    onClick={() => fjernOpphold(index)}
                >
                    <FormattedMessage id="TidligereUtenlandsoppholdSteg.Knapp.SlettOpphold" />
                </Button>
            )}
        </VStack>
    );
};

export default TidligereUtenlandsoppholdPanel;
