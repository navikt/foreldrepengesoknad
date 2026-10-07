import { MinusCircleFillIcon, PlusCircleFillIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, HStack, Heading, TextField, VStack } from '@navikt/ds-react';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { RhfDatepicker } from '@navikt/fp-form-hooks';
import { Uttaksdagen } from '@navikt/fp-utils';
import { isBeforeOrSame, isRequired, isValidDate, isValidInteger, isWeekday } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { countWeekdaysBetween } from '../../utils/dateUtils';
import { FormValues } from './LeggTilEllerEndrePeriodeListPanel';

export const TidsperiodeSpørsmål = () => {
    const intl = useIntl();

    const { familiehendelsedato } = useUttaksplanData();

    const { watch, control, setValue, trigger, clearErrors } = useFormContext<FormValues>();

    const { tom, fom } = watch();

    const maxDate = dayjs(familiehendelsedato).add(3, 'years').format(ISO_DATE_FORMAT);

    const antallDager = finnAntallDager(fom, tom);
    const uker = Math.floor(antallDager / 5);
    const dager = antallDager % 5;
    const maksAntallDager = useMemo(() => finnAntallDager(fom, maxDate), [fom, maxDate]);

    const oppdaterAntall = useCallback(
        (nyFom?: string, nyTom?: string) => {
            const antall = finnAntallDager(nyFom, nyTom);
            setValue('antallUker', Math.floor(antall / 5).toString());
            setValue('antallDager', (antall % 5).toString());
            clearErrors(['antallUker', 'antallDager']);
        },
        [clearErrors, setValue],
    );

    const oppdaterTomDato = useCallback(
        (nyeUker: number, nyeDager: number): boolean => {
            if (!fom) {
                return false;
            }
            const totaltUttaksdager = nyeUker * 5 + nyeDager;
            if (
                !Number.isSafeInteger(totaltUttaksdager) ||
                totaltUttaksdager < 1 ||
                totaltUttaksdager > maksAntallDager
            ) {
                return false;
            }
            const nyTom = Uttaksdagen.denneEllerNeste(fom).getDatoAntallUttaksdagerSenere(totaltUttaksdager - 1);
            setValue('tom', nyTom, { shouldDirty: true });
            oppdaterAntall(fom, nyTom);
            void trigger(['tom', 'fom']);
            return true;
        },
        [fom, maksAntallDager, oppdaterAntall, setValue, trigger],
    );

    const harGyldigFomOgTom = erGyldigDato(fom) && erGyldigDato(tom);

    return (
        <VStack gap="space-16">
            <Heading size="medium">
                <FormattedMessage id="uttaksplan.tidsperiodeSpørsmål.heading" />
            </Heading>
            <HStack gap="space-16" align="start">
                <RhfDatepicker
                    name="fom"
                    control={control}
                    onChange={(nyFom) => oppdaterAntall(nyFom, tom)}
                    showMonthAndYearDropdowns
                    minDate={Uttaksdagen.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerTidligere(60)}
                    maxDate={maxDate}
                    label={intl.formatMessage({ id: 'TidsperiodeSpørsmål.fom' })}
                    disableWeekends={true}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'endreTidsPeriodeModal.fom.påkrevd' })),
                        isValidDate(intl.formatMessage({ id: 'endreTidsPeriodeModal.fom.gyldigDato' })),
                        isBeforeOrSame(intl.formatMessage({ id: 'endreTidsPeriodeModal.fom.førTilDato' }), tom),
                        isWeekday(intl.formatMessage({ id: 'endreTidsPeriodeModal.fom.måVæreUkedag' })),
                    ]}
                />
                <RhfDatepicker
                    name="tom"
                    control={control}
                    onChange={(nyTom) => oppdaterAntall(fom, nyTom)}
                    showMonthAndYearDropdowns
                    validate={[
                        isRequired(intl.formatMessage({ id: 'endreTidsPeriodeModal.tom.påkrevd' })),
                        isValidDate(intl.formatMessage({ id: 'endreTidsPeriodeModal.tom.gyldigDato' })),
                        isWeekday(intl.formatMessage({ id: 'endreTidsPeriodeModal.tom.måVæreUkedag' })),
                    ]}
                    label={intl.formatMessage({ id: 'TidsperiodeSpørsmål.tom' })}
                    disableWeekends={true}
                    minDate={fom}
                    maxDate={maxDate}
                />
                {harGyldigFomOgTom && (
                    <HStack gap="space-16" align="start">
                        <AntallVelger
                            name="antallUker"
                            label={intl.formatMessage({ id: 'TidsperiodeSpørsmål.uker' })}
                            verdi={uker}
                            minusLabel={intl.formatMessage({ id: 'TidsperiodeSpørsmål.minusUke' })}
                            plussLabel={intl.formatMessage({ id: 'TidsperiodeSpørsmål.plussUke' })}
                            minVerdi={dager === 0 ? 1 : 0}
                            maksVerdi={Math.floor((maksAntallDager - dager) / 5)}
                            maksDato={maxDate}
                            minusDisabled={antallDager <= 5}
                            plussDisabled={antallDager + 5 > maksAntallDager}
                            oppdater={(nyeUker) => oppdaterTomDato(nyeUker, dager)}
                        />
                        <AntallVelger
                            name="antallDager"
                            label={intl.formatMessage({ id: 'TidsperiodeSpørsmål.dager' })}
                            verdi={dager}
                            minusLabel={intl.formatMessage({ id: 'TidsperiodeSpørsmål.minusDag' })}
                            plussLabel={intl.formatMessage({ id: 'TidsperiodeSpørsmål.plussDag' })}
                            minusDisabled={antallDager <= 1}
                            plussDisabled={antallDager >= maksAntallDager}
                            oppdater={(nyeDager) => oppdaterTomDato(uker, nyeDager)}
                            minVerdi={uker === 0 ? 1 : 0}
                            maksVerdi={maksAntallDager - uker * 5}
                            maksDato={maxDate}
                        />
                    </HStack>
                )}
            </HStack>
        </VStack>
    );
};

type AntallVelgerProps = {
    name: 'antallUker' | 'antallDager';
    label: string;
    verdi: number;
    minusLabel: string;
    plussLabel: string;
    minusDisabled: boolean;
    plussDisabled: boolean;
    oppdater: (nyVerdi: number) => boolean;
    minVerdi: number;
    maksVerdi: number;
    maksDato: string;
};

const AntallVelger = ({
    name,
    label,
    verdi,
    minusLabel,
    plussLabel,
    minusDisabled,
    plussDisabled,
    oppdater,
    minVerdi,
    maksVerdi,
    maksDato,
}: AntallVelgerProps) => {
    const intl = useIntl();
    const { control, setError } = useFormContext<FormValues>();
    const feilmelding = intl.formatMessage({ id: 'TidsperiodeSpørsmål.antall.ugyldig' }, { min: minVerdi });
    const forLangPeriode = intl.formatMessage(
        { id: 'TidsperiodeSpørsmål.antall.forLangPeriode' },
        { dato: intl.formatDate(maksDato, { day: '2-digit', month: '2-digit', year: 'numeric' }) },
    );
    const valider = (tekst: string | undefined) => {
        const formatfeil = isRequired(feilmelding)(tekst ?? '') || isValidInteger(feilmelding)(tekst ?? '');
        if (formatfeil) {
            return formatfeil;
        }
        const antall = Number(tekst);
        if (antall > maksVerdi) {
            return forLangPeriode;
        }
        return (Number.isSafeInteger(antall) && antall >= minVerdi) || feilmelding;
    };

    const { field, fieldState } = useController<FormValues, 'antallUker' | 'antallDager'>({
        name,
        control,
        defaultValue: verdi.toString(),
        shouldUnregister: true,
        rules: { validate: valider },
    });

    const bekreftVerdi = () => {
        field.onBlur();
        const resultat = valider(field.value);
        if (resultat !== true) {
            setError(name, { type: 'validate', message: resultat });
        } else if (!oppdater(Number(field.value))) {
            setError(name, { type: 'validate', message: forLangPeriode });
        }
    };

    return (
        <HStack gap="space-2" align="end">
            <Button
                type="button"
                variant="tertiary"
                size="medium"
                icon={<MinusCircleFillIcon aria-hidden fontSize="32" />}
                onClick={() => oppdater(verdi - 1)}
                disabled={minusDisabled}
                aria-label={minusLabel}
            />
            <TextField
                {...field}
                label={label}
                inputMode="numeric"
                htmlSize={3}
                autoComplete="off"
                value={field.value ?? ''}
                error={fieldState.error?.message}
                onBlur={bekreftVerdi}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        bekreftVerdi();
                    }
                }}
            />
            <Button
                type="button"
                variant="tertiary"
                size="medium"
                icon={<PlusCircleFillIcon aria-hidden fontSize="32" />}
                onClick={() => oppdater(verdi + 1)}
                disabled={plussDisabled}
                aria-label={plussLabel}
            />
        </HStack>
    );
};

const finnAntallDager = (fom?: string, tom?: string): number => {
    return erGyldigDato(fom) && erGyldigDato(tom) ? countWeekdaysBetween(dayjs(fom), dayjs(tom)) : 0;
};

const erGyldigDato = (dato?: string): boolean => !!dato && dayjs(dato, ISO_DATE_FORMAT, true).isValid();
