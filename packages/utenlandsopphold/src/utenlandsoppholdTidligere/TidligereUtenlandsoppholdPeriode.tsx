import { FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { TrashIcon } from '@navikt/aksel-icons';
import { Button, VStack } from '@navikt/ds-react';
import { createCountryOptions, formatDate, isDateAAfterDateB, isSameOrBeforeToday } from '@navikt/fp-utils';
import { Datepicker, Select } from '@navikt/fp-form-hooks';
import { DATE_TODAY, DATE_1_YEAR_AGO } from '@navikt/fp-constants';
import {
    isAfterOrSame,
    isBeforeOrSame,
    isDateWithinRange,
    isDatesNotTheSame,
    isPeriodNotOverlappingOthers,
    isRequired,
    isValidDate,
} from '@navikt/fp-validation';
import { UtenlandsoppholdPeriode } from '@navikt/fp-types';
import useUtenlandsoppholdIntl from '../intl/useUtenlandsoppholdIntl';

interface OwnProps {
    index: number;
    fjernOpphold: (index: number) => void;
}

const TidligereUtenlandsoppholdPanel: React.FunctionComponent<OwnProps> = ({ index, fjernOpphold }) => {
    const { i18n } = useUtenlandsoppholdIntl();

    const {
        watch,
        trigger,
        formState: { isSubmitted },
    } = useFormContext<{ utenlandsoppholdSiste12Mnd: UtenlandsoppholdPeriode[] }>();

    const alleAndreUtenlandsopphold = watch(`utenlandsoppholdSiste12Mnd`).filter((_u, i) => i !== index);
    const fom = watch(`utenlandsoppholdSiste12Mnd.${index}.fom`);
    const tom = watch(`utenlandsoppholdSiste12Mnd.${index}.tom`);

    const minDateFom = dayjs(DATE_1_YEAR_AGO).toDate();
    const maxDateFom =
        tom && isSameOrBeforeToday(tom) ? dayjs(tom).add(1, 'days').toDate() : dayjs(DATE_TODAY).toDate();

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
                    isValidDate(i18n('TidligereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato')),
                    isDatesNotTheSame(i18n('TidligereUtenlandsoppholdSteg.FomErLikTom'), tom),
                    isBeforeOrSame(i18n('TidligereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato'), tom),
                    isDateWithinRange(
                        i18n('TidligereUtenlandsoppholdSteg.DateOutsideRangeFom', {
                            min: formatDate(minDateFom),
                            max: formatDate(maxDateFom),
                        }),
                        minDateFom,
                        maxDateFom,
                    ),
                    isPeriodNotOverlappingOthers(
                        i18n('TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp'),
                        { date: tom, isStartDate: false },
                        alleAndreUtenlandsopphold,
                    ),
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
                    isValidDate(i18n('TidligereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato')),
                    isDatesNotTheSame(i18n('TidligereUtenlandsoppholdSteg.TomErLikFom'), fom),
                    isAfterOrSame(i18n('TidligereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato'), fom),
                    isDateWithinRange(
                        i18n('TidligereUtenlandsoppholdSteg.DateOutsideRangeTom', {
                            min: formatDate(minDateTom),
                            max: formatDate(maxDateTom),
                        }),
                        minDateTom,
                        maxDateTom,
                    ),
                    isPeriodNotOverlappingOthers(
                        i18n('TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp'),
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
                    <FormattedMessage id="TidligereUtenlandsoppholdSteg.Knapp.SlettOpphold" />
                </Button>
            )}
        </VStack>
    );
};

export default TidligereUtenlandsoppholdPanel;
