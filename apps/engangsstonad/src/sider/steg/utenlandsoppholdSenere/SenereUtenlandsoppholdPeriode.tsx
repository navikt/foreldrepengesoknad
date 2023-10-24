import { FormattedMessage } from 'react-intl';
import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { TrashIcon } from '@navikt/aksel-icons';
import { Button, VStack } from '@navikt/ds-react';
import { date1YearFromNow, dateToday } from '@navikt/fp-common';
import { createCountryOptions } from '@navikt/fp-utils';
import { Datepicker, Select } from '@navikt/fp-form-hooks';
import {
    isAfterOrSame,
    isBeforeOrSame,
    isDateWithinRange,
    isDatesNotTheSame,
    isPeriodNotOverlappingOthers,
    isRequired,
    isValidDate,
} from '@navikt/fp-validation';
import { useCustomIntl } from '@navikt/fp-ui';

import { UtenlandsoppholdPeriode } from 'types/Utenlandsopphold';

interface OwnProps {
    index: number;
    fjernOpphold: (index: number) => void;
}

const SenereUtenlandsoppholdPanel: React.FunctionComponent<OwnProps> = ({ index, fjernOpphold }) => {
    const { i18n } = useCustomIntl();

    const {
        watch,
        trigger,
        formState: { isSubmitted },
    } = useFormContext<{ utenlandsoppholdNeste12Mnd: UtenlandsoppholdPeriode[] }>();

    const alleAndreUtenlandsopphold = watch(`utenlandsoppholdNeste12Mnd`).filter((_u, i) => i !== index);
    const fom = watch(`utenlandsoppholdNeste12Mnd.${index}.fom`);
    const tom = watch(`utenlandsoppholdNeste12Mnd.${index}.tom`);

    const minDateFom = dayjs(dateToday).toDate();
    const maxDateFom = tom ? dayjs(tom).toDate() : dayjs(date1YearFromNow).toDate();

    const minDateTom = dayjs(fom || dateToday).toDate();
    const maxDateTom = dayjs(date1YearFromNow).toDate();

    return (
        <VStack gap="5" align="start">
            <Select
                name={`utenlandsoppholdNeste12Mnd.${index}.landkode`}
                label={
                    <FormattedMessage
                        id={'SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI'}
                    />
                }
                validate={[
                    isRequired(i18n('SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuSkalBoIPåkreved')),
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
                label={<FormattedMessage id="SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed" />}
                minDate={dayjs(dateToday).toDate()}
                maxDate={tom ? dayjs(tom).toDate() : dayjs(date1YearFromNow).toDate()}
                validate={[
                    isRequired(i18n('SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved')),
                    isValidDate(i18n('SenereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato')),
                    isDatesNotTheSame(i18n('SenereUtenlandsoppholdSteg.FomErLikTom'), tom),
                    isBeforeOrSame(i18n('SenereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato'), tom),
                    isDateWithinRange(i18n('SenereUtenlandsoppholdSteg.DateOutsideRange'), minDateFom, maxDateFom),
                    isPeriodNotOverlappingOthers(
                        i18n('SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp'),
                        { date: tom, isStartDate: false },
                        alleAndreUtenlandsopphold,
                    ),
                ]}
                onChange={() => isSubmitted && trigger()}
            />
            <Datepicker
                name={`utenlandsoppholdNeste12Mnd.${index}.tom`}
                label={<FormattedMessage id="SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed" />}
                minDate={minDateTom}
                maxDate={maxDateTom}
                validate={[
                    isRequired(i18n('SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuSkalBoIPåkreved')),
                    isValidDate(i18n('SenereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato')),
                    isDatesNotTheSame(i18n('SenereUtenlandsoppholdSteg.TomErLikFom'), fom),
                    isAfterOrSame(i18n('SenereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato'), fom),
                    isDateWithinRange(i18n('SenereUtenlandsoppholdSteg.DateOutsideRange'), minDateTom, maxDateTom),
                    isPeriodNotOverlappingOthers(
                        i18n('SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp'),
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
                    icon={<TrashIcon aria-hidden />}
                    onClick={() => fjernOpphold(index)}
                >
                    <FormattedMessage id="SenereUtenlandsoppholdSteg.Knapp.SlettOpphold" />
                </Button>
            )}
        </VStack>
    );
};

export default SenereUtenlandsoppholdPanel;
