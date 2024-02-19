import { Alert, BodyShort, HStack, VStack } from '@navikt/ds-react';
import { ISOStringToDate, Uttaksdagen, getVarighetString, intlUtils, isFødtBarn } from '@navikt/fp-common';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import OppstartDatoInput from './OppstartDatoInput';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import { isValidDate, notEmpty } from '@navikt/fp-validation';
import { getFørsteUttaksdagForeldrepengerFørFødsel } from '@navikt/uttaksplan/src/utils/uttaksdatoerUtils';
import { useFormContext } from 'react-hook-form';
import FordelingFormValues from '../FordelingFormValues';
import dayjs from 'dayjs';

const getMorInfoMistetDagerFørFødsel = (
    oppstartsdato: string | undefined,
    førsteUttaksdagForeldrepengerFørFødsel: Date,
    intl: IntlShape,
): string | undefined => {
    if (
        !oppstartsdato ||
        !isValidDate(oppstartsdato) ||
        dayjs(oppstartsdato).isBefore(førsteUttaksdagForeldrepengerFørFødsel, 'd')
    ) {
        return undefined;
    }
    const uttaksdager = Uttaksdagen(førsteUttaksdagForeldrepengerFørFødsel).getUttaksdagerFremTilDato(
        new Date(oppstartsdato),
    );
    return getVarighetString(uttaksdager, intl);
};

const getMorInfoFellesperiodeFørFødsel = (
    oppstartsdato: string | undefined,
    førsteUttaksdagForeldrepengerFørFødsel: Date,
    intl: IntlShape,
): string | undefined => {
    if (
        !oppstartsdato ||
        !isValidDate(oppstartsdato) ||
        dayjs(oppstartsdato).isAfter(førsteUttaksdagForeldrepengerFørFødsel, 'd')
    ) {
        return undefined;
    }
    const uttaksdager = Uttaksdagen(new Date(oppstartsdato)).getUttaksdagerFremTilDato(
        førsteUttaksdagForeldrepengerFørFødsel,
    );
    return getVarighetString(uttaksdager, intl);
};

const OppstartDatoMorFødsel = () => {
    const intl = useIntl();
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const familiehendelsesdato = ISOStringToDate(getFamiliehendelsedato(barn))!;
    const førsteUttaksdagMorFødsel = getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato);
    const { watch } = useFormContext<FordelingFormValues>();
    const oppstartDato = watch('oppstartDato');
    const morStarterIkkePå3UkerFørFødsel =
        oppstartDato !== undefined && !dayjs(oppstartDato).isSame(førsteUttaksdagMorFødsel, 'd');

    const fødselEllerTermin = isFødtBarn(barn) ? intlUtils(intl, 'fødsel') : intlUtils(intl, 'termin');
    const varighetString = getVarighetString(dayjs(oppstartDato).diff(familiehendelsesdato, 'd'), intl);
    const morInfoMistetDagerFørFødsel = getMorInfoMistetDagerFørFødsel(oppstartDato, førsteUttaksdagMorFødsel, intl);
    const morVarighetFellesperiodeFørFødsel = getMorInfoFellesperiodeFørFødsel(
        oppstartDato,
        førsteUttaksdagMorFødsel,
        intl,
    );
    return (
        <div>
            <VStack gap="2">
                <HStack gap="1">
                    <OppstartDatoInput />
                    {morStarterIkkePå3UkerFørFødsel && (
                        <div
                            style={{
                                marginTop: '3.2rem',
                                marginLeft: '-5rem',
                                backgroundColor: 'lightblue',
                                padding: '0.5rem',
                            }}
                        >
                            <BodyShort>
                                {intlUtils(intl, 'fordeling.oppstartValg.førFødselEllerTerminInfo', {
                                    varighetString,
                                    fødselEllerTermin,
                                })}
                            </BodyShort>
                            {morInfoMistetDagerFørFødsel && (
                                <BodyShort>
                                    {intlUtils(intl, 'fordeling.oppstartValg.misterDagerInfo', {
                                        varighetString: morInfoMistetDagerFørFødsel,
                                    })}
                                </BodyShort>
                            )}
                            {morVarighetFellesperiodeFørFødsel && (
                                <BodyShort>
                                    {intlUtils(intl, 'fordeling.oppstartValg.taFraFellesperioden', {
                                        varighetString: morVarighetFellesperiodeFørFødsel,
                                    })}
                                </BodyShort>
                            )}
                        </div>
                    )}
                </HStack>
                <Alert variant="info">
                    <FormattedMessage id="fordeling.oppstartValg.morFødsel.info" />
                </Alert>
            </VStack>
        </div>
    );
};

export default OppstartDatoMorFødsel;
