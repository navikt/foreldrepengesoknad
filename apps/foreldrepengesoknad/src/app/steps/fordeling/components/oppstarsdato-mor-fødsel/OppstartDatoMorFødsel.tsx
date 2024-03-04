import { getFørsteUttaksdagForeldrepengerFørFødsel } from '@navikt/uttaksplan/src/utils/uttaksdatoerUtils';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { Alert, BodyShort, HStack, VStack } from '@navikt/ds-react';

import {
    ISOStringToDate,
    Tidsperioden,
    Uttaksdagen,
    bemUtils,
    getValidTidsperiode,
    getVarighetString,
    intlUtils,
    isFødtBarn,
} from '@navikt/fp-common';
import { isValidDate, notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import Fordeling from 'app/context/types/Fordeling';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';

import OppstartDatoInput from '../OppstartDatoInput';
import './oppstart-dato-mor-fødsel.css';

const getVarighetFørFamiliehendelse = (
    familiehendelsesdato: Date,
    oppstartDato: string | undefined,
    intl: IntlShape,
): string => {
    if (!oppstartDato) {
        return '';
    }
    const sisteUttaksdagFørTermin = Uttaksdagen(familiehendelsesdato).forrige();
    const tidsperiode = getValidTidsperiode({
        fom: ISOStringToDate(oppstartDato)!,
        tom: sisteUttaksdagFørTermin,
    });
    return tidsperiode ? getVarighetString(Tidsperioden(tidsperiode).getAntallUttaksdager(), intl) : '';
};

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
    const bem = bemUtils('oppstart-dato-mor-fødsel');
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const familiehendelsesdato = ISOStringToDate(getFamiliehendelsedato(barn))!;
    const førsteUttaksdagMorFødsel = getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato);
    const { watch } = useFormContext<Fordeling>();
    const oppstartDato = watch('oppstartDato');
    const morStarterIkkePå3UkerFørFødsel =
        oppstartDato !== undefined && !dayjs(oppstartDato).isSame(førsteUttaksdagMorFødsel, 'd');

    const fødselEllerTermin = isFødtBarn(barn) ? intlUtils(intl, 'fødsel') : intlUtils(intl, 'termin');
    const varighetString = getVarighetFørFamiliehendelse(familiehendelsesdato, oppstartDato, intl);
    const morInfoMistetDagerFørFødsel = getMorInfoMistetDagerFørFødsel(oppstartDato, førsteUttaksdagMorFødsel, intl);
    const morVarighetFellesperiodeFørFødsel = getMorInfoFellesperiodeFørFødsel(
        oppstartDato,
        førsteUttaksdagMorFødsel,
        intl,
    );
    const visMisterDagerFørFødsel = morStarterIkkePå3UkerFørFødsel && morInfoMistetDagerFørFødsel;
    const visBrukFellesperiode = morStarterIkkePå3UkerFørFødsel && morVarighetFellesperiodeFørFødsel;
    return (
        <div>
            <VStack gap="2">
                <HStack gap="1">
                    <OppstartDatoInput />
                    {oppstartDato && (
                        <div className={bem.element('div')}>
                            <BodyShort>
                                {intlUtils(intl, 'fordeling.oppstartValg.førFødselEllerTerminInfo', {
                                    varighetString,
                                    fødselEllerTermin,
                                })}
                            </BodyShort>
                            {visMisterDagerFørFødsel && (
                                <BodyShort>
                                    {intlUtils(intl, 'fordeling.oppstartValg.misterDagerInfo', {
                                        varighetString: morInfoMistetDagerFørFødsel,
                                    })}
                                </BodyShort>
                            )}
                            {visBrukFellesperiode && (
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
