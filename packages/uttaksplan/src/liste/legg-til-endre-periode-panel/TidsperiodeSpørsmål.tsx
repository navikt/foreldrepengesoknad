import { MinusCircleFillIcon, PlusCircleFillIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Box, Button, HStack, Heading, Label, VStack } from '@navikt/ds-react';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { RhfDatepicker } from '@navikt/fp-form-hooks';
import { Uttaksdagen } from '@navikt/fp-utils';
import { isBeforeOrSame, isRequired, isValidDate, isWeekday } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { countWeekdaysBetween } from '../../utils/dateUtils';
import { FormValues } from './LeggTilEllerEndrePeriodeListPanel';

export const TidsperiodeSpørsmål = () => {
    const intl = useIntl();

    const { familiehendelsedato } = useUttaksplanData();

    const { watch, control, setValue, trigger } = useFormContext<FormValues>();

    const { tom, fom } = watch();

    const maxDate = dayjs(familiehendelsedato).add(3, 'years').format(ISO_DATE_FORMAT);

    const antallDager = finnAntallDager(fom, tom);
    const uker = Math.floor(antallDager / 5);
    const dager = antallDager % 5;

    const oppdaterTomDato = useCallback(
        (nyeUker: number, nyeDager: number) => {
            if (!fom) {
                return;
            }
            const totaltUttaksdager = nyeUker * 5 + nyeDager;
            if (totaltUttaksdager < 1) {
                return;
            }
            const nyTom = Uttaksdagen.denneEllerNeste(fom).getDatoAntallUttaksdagerSenere(totaltUttaksdager - 1);
            if (dayjs(nyTom).isAfter(dayjs(maxDate))) {
                return;
            }
            setValue('tom', nyTom, { shouldDirty: true });
            void trigger('tom');
            void trigger('fom');
        },
        [fom, maxDate, setValue, trigger],
    );

    const harGyldigFomOgTom =
        fom !== undefined &&
        fom !== '' &&
        dayjs(fom).isValid() &&
        tom !== undefined &&
        tom !== '' &&
        dayjs(tom).isValid();

    return (
        <VStack gap="space-16">
            <Heading size="medium">
                <FormattedMessage id="uttaksplan.tidsperiodeSpørsmål.heading" />
            </Heading>
            <HStack gap="space-16" align="start">
                <RhfDatepicker
                    name="fom"
                    control={control}
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
                        <VStack gap="space-4">
                            <Label size="medium">
                                <FormattedMessage id="TidsperiodeSpørsmål.uker" />
                            </Label>
                            <HStack gap="space-2" align="center" style={{ height: '3rem' }}>
                                <Button
                                    type="button"
                                    variant="tertiary"
                                    size="medium"
                                    icon={<MinusCircleFillIcon aria-hidden fontSize="32" />}
                                    onClick={() => oppdaterTomDato(uker - 1, dager)}
                                    disabled={uker <= 0}
                                    aria-label={intl.formatMessage({ id: 'TidsperiodeSpørsmål.minusUke' })}
                                />
                                <Box
                                    borderWidth="1"
                                    borderColor="neutral"
                                    borderRadius="8"
                                    paddingInline="space-24"
                                    height="100%"
                                    style={{ display: 'flex', alignItems: 'center' }}
                                >
                                    <BodyShort size="large">{uker}</BodyShort>
                                </Box>
                                <Button
                                    type="button"
                                    variant="tertiary"
                                    size="small"
                                    icon={<PlusCircleFillIcon aria-hidden fontSize="32" />}
                                    onClick={() => oppdaterTomDato(uker + 1, dager)}
                                    aria-label={intl.formatMessage({ id: 'TidsperiodeSpørsmål.plussUke' })}
                                />
                            </HStack>
                        </VStack>
                        <VStack gap="space-4">
                            <Label size="medium">
                                <FormattedMessage id="TidsperiodeSpørsmål.dager" />
                            </Label>
                            <HStack gap="space-2" align="center" style={{ height: '3rem' }}>
                                <Button
                                    type="button"
                                    variant="tertiary"
                                    size="medium"
                                    icon={<MinusCircleFillIcon aria-hidden fontSize="32" />}
                                    onClick={() => oppdaterTomDato(uker, dager - 1)}
                                    disabled={dager <= 0}
                                    aria-label={intl.formatMessage({ id: 'TidsperiodeSpørsmål.minusDag' })}
                                />
                                <Box
                                    borderWidth="1"
                                    borderColor="neutral"
                                    borderRadius="8"
                                    paddingInline="space-24"
                                    height="100%"
                                    style={{ display: 'flex', alignItems: 'center' }}
                                >
                                    <BodyShort size="large">{dager}</BodyShort>
                                </Box>
                                <Button
                                    type="button"
                                    variant="tertiary"
                                    size="small"
                                    icon={<PlusCircleFillIcon aria-hidden fontSize="32" />}
                                    onClick={() => oppdaterTomDato(uker, dager + 1)}
                                    disabled={dager >= 4}
                                    aria-label={intl.formatMessage({ id: 'TidsperiodeSpørsmål.plussDag' })}
                                />
                            </HStack>
                        </VStack>
                    </HStack>
                )}
            </HStack>
        </VStack>
    );
};

const finnAntallDager = (fom?: string, tom?: string): number => {
    return !fom || !tom ? 0 : countWeekdaysBetween(dayjs(fom), dayjs(tom));
};
