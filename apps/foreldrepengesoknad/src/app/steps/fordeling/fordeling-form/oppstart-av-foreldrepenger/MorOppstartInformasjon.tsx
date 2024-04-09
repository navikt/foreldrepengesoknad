import { getFørsteUttaksdagForeldrepengerFørFødsel } from '@navikt/uttaksplan';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { Tidsperioden, Uttaksdagen, getValidTidsperiode, getVarighetString, isFødtBarn } from '@navikt/fp-common';
import { ISOStringToDate } from '@navikt/fp-formik';
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
        dayjs(oppstartsdato).isSameOrBefore(førsteUttaksdagForeldrepengerFørFødsel, 'd')
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
        dayjs(oppstartsdato).isSameOrAfter(førsteUttaksdagForeldrepengerFørFødsel, 'd')
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

const getStarterPåUttaksdagEtterFamiliehendelse = (familiehendelsesdato: Date, oppstartDato: string | undefined) => {
    const førsteUttaksdagPåEllerEtterFamHendelse = Uttaksdagen(familiehendelsesdato).denneEllerNeste();

    return (
        oppstartDato &&
        dayjs(oppstartDato).isAfter(familiehendelsesdato, 'd') &&
        dayjs(oppstartDato).isSame(førsteUttaksdagPåEllerEtterFamHendelse, 'd')
    );
};

const MorOppstartInformasjon: React.FunctionComponent<Props> = ({ oppstartDato }) => {
    const intl = useIntl();
    const bem = bemUtils('mor-oppstartinformasjon');
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const familiehendelsesdato = ISOStringToDate(getFamiliehendelsedato(barn))!;
    const førsteUttaksdagMorFødsel = getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato);

    const starterPåUttaksdagEtterFamiliehendelse = getStarterPåUttaksdagEtterFamiliehendelse(
        familiehendelsesdato,
        oppstartDato,
    );
    const starterFørFamiliehendelse = dayjs(oppstartDato).isBefore(familiehendelsesdato, 'd');
    const starterPåFamiliehendelse = dayjs(oppstartDato).isSame(familiehendelsesdato, 'd');
    const morInfoMistetDagerFørFødsel = getMorInfoMistetDagerFørFødsel(oppstartDato, førsteUttaksdagMorFødsel, intl);
    const morInfoFellesperiodeFørFødsel = getMorInfoFellesperiodeFørFødsel(
        oppstartDato,
        førsteUttaksdagMorFødsel,
        intl,
    );

    const varighetString = getVarighetFørFamiliehendelse(familiehendelsesdato, oppstartDato, intl);
    const fødselEllerTermin = isFødtBarn(barn)
        ? intl.formatMessage({ id: 'fødsel' })
        : intl.formatMessage({ id: 'termin' });
    const fødselEllerTerminDato = isFødtBarn(barn)
        ? intl.formatMessage({ id: 'fødselsdato' })
        : intl.formatMessage({ id: 'termindato' });

    return (
        <div className={bem.block}>
            {starterPåUttaksdagEtterFamiliehendelse && (
                <BodyShort size="small" className={classNames(bem.modifier('bold'))}>
                    <FormattedMessage
                        id="fordeling.oppstartValg.førsteUkedagEtterTerminFødsel"
                        values={{ fødselEllerTerminDato }}
                    />
                </BodyShort>
            )}
            {starterFørFamiliehendelse && (
                <BodyShort size="small" className={classNames(bem.modifier('bold'))}>
                    <FormattedMessage
                        id="fordeling.oppstartValg.førFødselEllerTerminInfo"
                        values={{ varighetString, fødselEllerTermin }}
                    />
                </BodyShort>
            )}
            {starterPåFamiliehendelse && (
                <BodyShort size="small" className={classNames(bem.modifier('bold'))}>
                    <FormattedMessage
                        id="fordeling.oppstartValg.påFødselEllerTermin"
                        values={{ fødselEllerTerminDato }}
                    />
                </BodyShort>
            )}
            {morInfoMistetDagerFørFødsel && (
                <BodyShort size="small">
                    <FormattedMessage
                        id="fordeling.oppstartValg.misterDagerInfo"
                        values={{ varighetString: morInfoMistetDagerFørFødsel }}
                    />
                </BodyShort>
            )}
            {morInfoFellesperiodeFørFødsel && (
                <BodyShort size="small">
                    <FormattedMessage
                        id="fordeling.oppstartValg.taFraFellesperioden"
                        values={{ varighetString: morInfoFellesperiodeFørFødsel }}
                    />
                </BodyShort>
            )}
        </div>
    );
};

export default MorOppstartInformasjon;
