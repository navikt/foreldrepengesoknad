import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import dayjs from 'dayjs';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { getFamiliehendelsedato } from 'utils/barnUtils';
import { getVarighetString } from 'utils/dateUtils';

import { BodyShort } from '@navikt/ds-react';

import { isFødtBarn } from '@navikt/fp-types';
import { Tidsperioden, Uttaksdagen } from '@navikt/fp-utils';
import { isValidDateString as isValidDate, notEmpty } from '@navikt/fp-validation';

const ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL = 3;

interface Props {
    oppstartDato: string | undefined;
}

const getFørsteUttaksdagPåEllerEtterFødsel = (familiehendelsesdato: string) => {
    return Uttaksdagen.denneEllerNeste(familiehendelsesdato).getDato();
};

export const getFørsteUttaksdagForeldrepengerFørFødsel = (familiehendelsesdato: string | undefined): string => {
    if (!familiehendelsesdato) {
        throw new Error('Mangler informasjon om familiehendelsesdato.');
    }
    return Uttaksdagen.denne(
        getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato),
    ).getDatoAntallUttaksdagerTidligere(ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5);
};

const getMorInfoMistetDagerFørFødsel = (
    oppstartsdato: string | undefined,
    førsteUttaksdagForeldrepengerFørFødsel: string,
    intl: IntlShape,
): string | undefined => {
    if (
        !oppstartsdato ||
        !isValidDate(oppstartsdato) ||
        dayjs(oppstartsdato).isSameOrBefore(førsteUttaksdagForeldrepengerFørFødsel, 'd')
    ) {
        return undefined;
    }
    const uttaksdager = Uttaksdagen.denne(førsteUttaksdagForeldrepengerFørFødsel).getUttaksdagerFremTilDato(
        oppstartsdato,
    );
    return getVarighetString(uttaksdager, intl);
};

const getMorInfoFellesperiodeFørFødsel = (
    oppstartsdato: string | undefined,
    førsteUttaksdagForeldrepengerFørFødsel: string,
    intl: IntlShape,
): string | undefined => {
    if (
        !oppstartsdato ||
        !isValidDate(oppstartsdato) ||
        dayjs(oppstartsdato).isSameOrAfter(førsteUttaksdagForeldrepengerFørFødsel, 'd')
    ) {
        return undefined;
    }
    const uttaksdager = Uttaksdagen.denne(oppstartsdato).getUttaksdagerFremTilDato(
        førsteUttaksdagForeldrepengerFørFødsel,
    );
    return getVarighetString(uttaksdager, intl);
};
const getVarighetFørFamiliehendelse = (
    familiehendelsesdato: string,
    oppstartDato: string | undefined,
    intl: IntlShape,
): string => {
    if (!oppstartDato) {
        return '';
    }
    const sisteUttaksdagFørTermin = Uttaksdagen.forrige(familiehendelsesdato).getDato();
    const tidsperiode = Tidsperioden.forFomOgTom(oppstartDato, sisteUttaksdagFørTermin);
    const antallUttaksdager =
        Uttaksdagen.denneEllerNeste(oppstartDato).getUttaksdagerFremTilOgMedDato(sisteUttaksdagFørTermin);
    return tidsperiode.erGyldig() ? getVarighetString(antallUttaksdager, intl) : '';
};

const getStarterPåUttaksdagEtterFamiliehendelse = (familiehendelsesdato: string, oppstartDato: string | undefined) => {
    const førsteUttaksdagPåEllerEtterFamHendelse = Uttaksdagen.denneEllerNeste(familiehendelsesdato).getDato();

    return (
        oppstartDato &&
        dayjs(oppstartDato).isAfter(familiehendelsesdato, 'd') &&
        dayjs(oppstartDato).isSame(førsteUttaksdagPåEllerEtterFamHendelse, 'd')
    );
};

export const MorOppstartInformasjon = ({ oppstartDato }: Props) => {
    const intl = useIntl();
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const familiehendelsesdato = getFamiliehendelsedato(barn);
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
        <div
            className={
                'bg-ax-accent-200 mt-[3.2rem] -ml-[13rem] flex h-[3.5rem] w-[20rem] flex-col justify-center p-2 max-[768px]:mt-0 max-[768px]:ml-0'
            }
        >
            {starterPåUttaksdagEtterFamiliehendelse && (
                <BodyShort size="small" className="font-bold">
                    <FormattedMessage
                        id="fordeling.oppstartValg.førsteUkedagEtterTerminFødsel"
                        values={{ fødselEllerTerminDato }}
                    />
                </BodyShort>
            )}
            {starterFørFamiliehendelse && (
                <BodyShort size="small" className="font-bold">
                    <FormattedMessage
                        id="fordeling.oppstartValg.førFødselEllerTerminInfo"
                        values={{ varighetString, fødselEllerTermin }}
                    />
                </BodyShort>
            )}
            {starterPåFamiliehendelse && (
                <BodyShort size="small" className="font-bold">
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
