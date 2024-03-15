import classNames from 'classnames';
import dayjs from 'dayjs';
import { IntlShape, useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import {
    ISOStringToDate,
    Tidsperioden,
    Uttaksdagen,
    getFørsteUttaksdagForeldrepengerFørFødsel,
    getValidTidsperiode,
    getVarighetString,
    intlUtils,
    isFødtBarn,
} from '@navikt/fp-common';
import { bemUtils, isValidDate } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';

import './mor-oppstartinformasjon.css';

interface Props {
    oppstartDato: string | undefined;
}

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

const MorOppstartInformasjon: React.FunctionComponent<Props> = ({ oppstartDato }) => {
    const intl = useIntl();
    const bem = bemUtils('mor-oppstartinformasjon');
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const familiehendelsesdato = ISOStringToDate(getFamiliehendelsedato(barn))!;
    const fødselEllerTermin = isFødtBarn(barn) ? intlUtils(intl, 'fødsel') : intlUtils(intl, 'termin');
    const fødselEllerTerminDato = isFødtBarn(barn) ? intlUtils(intl, 'fødselsdato') : intlUtils(intl, 'termindato');
    const varighetString = getVarighetFørFamiliehendelse(familiehendelsesdato, oppstartDato, intl);
    const førsteUttaksdagMorFødsel = getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato);
    const morInfoMistetDagerFørFødsel = getMorInfoMistetDagerFørFødsel(oppstartDato, førsteUttaksdagMorFødsel, intl);
    const morVarighetFellesperiodeFørFødsel = getMorInfoFellesperiodeFørFødsel(
        oppstartDato,
        førsteUttaksdagMorFødsel,
        intl,
    );

    const morStarterIkkePå3UkerFørFødsel =
        oppstartDato !== undefined && !dayjs(oppstartDato).isSame(førsteUttaksdagMorFødsel, 'd');
    const visMisterDagerFørFødsel = morStarterIkkePå3UkerFørFødsel && morInfoMistetDagerFørFødsel;
    const visBrukFellesperiode = morStarterIkkePå3UkerFørFødsel && morVarighetFellesperiodeFørFødsel;
    const førsteUttaksdagPåEllerEtterFamHendelse = Uttaksdagen(familiehendelsesdato).denneEllerNeste();

    const starterFørFamiliehendelse = dayjs(oppstartDato).isBefore(familiehendelsesdato, 'd');
    const starterPåFamiliehendelse = dayjs(oppstartDato).isSame(familiehendelsesdato, 'd');
    const starterPåUttaksdagEtterFamiliehendelse =
        dayjs(oppstartDato).isAfter(familiehendelsesdato, 'd') &&
        dayjs(oppstartDato).isSame(førsteUttaksdagPåEllerEtterFamHendelse, 'd');

    return (
        <div className={bem.block}>
            {starterPåUttaksdagEtterFamiliehendelse && (
                <BodyShort size="small" className={classNames(bem.modifier('bold'))}>
                    {intlUtils(intl, 'fordeling.oppstartValg.førsteUkedagEtterTerminFødsel', {
                        fødselEllerTerminDato,
                    })}
                </BodyShort>
            )}
            {starterFørFamiliehendelse && (
                <BodyShort size="small" className={classNames(bem.modifier('bold'))}>
                    {intlUtils(intl, 'fordeling.oppstartValg.førFødselEllerTerminInfo', {
                        varighetString,
                        fødselEllerTermin,
                    })}
                </BodyShort>
            )}
            {starterPåFamiliehendelse && (
                <BodyShort size="small" className={classNames(bem.modifier('bold'))}>
                    {intlUtils(intl, 'fordeling.oppstartValg.påFødselEllerTermin', {
                        fødselEllerTerminDato,
                    })}
                </BodyShort>
            )}
            {visMisterDagerFørFødsel && (
                <BodyShort size="small">
                    {intlUtils(intl, 'fordeling.oppstartValg.misterDagerInfo', {
                        varighetString: morInfoMistetDagerFørFødsel,
                    })}
                </BodyShort>
            )}
            {visBrukFellesperiode && (
                <BodyShort size="small">
                    {intlUtils(intl, 'fordeling.oppstartValg.taFraFellesperioden', {
                        varighetString: morVarighetFellesperiodeFørFødsel,
                    })}
                </BodyShort>
            )}
        </div>
    );
};

export default MorOppstartInformasjon;
