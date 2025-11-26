import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';
import { Sak } from 'types/Sak.ts';

import { Familiehendelse_fpoversikt } from '@navikt/fp-types';

import { BarnGruppering } from '../types/BarnGruppering.ts';
import { Tidslinjehendelse } from '../types/Tidslinjehendelse.ts';
import { getNavnPåBarna } from './sakerUtils.ts';

type TidslinjeTittelForFamiliehendelseProps = {
    sak: Sak;
    barnFraSak: BarnGruppering;
    intl: IntlShape;
};
export const tidslinjeTittelForFamiliehendelse = ({
    sak,
    barnFraSak,
    intl,
}: TidslinjeTittelForFamiliehendelseProps): string => {
    const { ytelse, familiehendelse } = sak;
    const gjelderAdopsjon = ('gjelderAdopsjon' in sak ? sak.gjelderAdopsjon : undefined) ?? false;

    // TODO: trengs ytelse her?
    if (ytelse === 'FORELDREPENGER') {
        const brukGeneriskNavn =
            barnFraSak.fornavn === undefined || barnFraSak.fornavn.length === 0 || !barnFraSak.alleBarnaLever;
        const navn = brukGeneriskNavn
            ? getTidslinjetekstForAntallBarn(familiehendelse.antallBarn, intl, gjelderAdopsjon)
            : getNavnPåBarna(barnFraSak.fornavn ?? []);

        if (gjelderAdopsjon && familiehendelse.omsorgsovertakelse) {
            return getTidslinjeTittelForAdopsjon(navn, familiehendelse.omsorgsovertakelse, intl);
        } else if (familiehendelse.fødselsdato) {
            return intl.formatMessage({ id: 'tidslinje.tittel.FAMILIEHENDELSE.fødsel' }, { navn });
        } else {
            return intl.formatMessage({ id: 'tidslinje.tittel.FAMILIEHENDELSE.termindato' });
        }
    } else if (familiehendelse.omsorgsovertakelse) {
        return 'Adopsjonsdato'; // TODO: intl
    } else if (familiehendelse.fødselsdato) {
        return 'Barnet ble født'; // TODO: intl
    } else {
        return intl.formatMessage({ id: 'tidslinje.tittel.FAMILIEHENDELSE.termindato' });
    }
};

const getTidslinjetekstForAntallBarn = (antallBarn: number, intl: IntlShape, gjelderAdopsjon: boolean): string => {
    if (antallBarn === 1 || antallBarn === 0) {
        return intl.formatMessage({ id: 'barnet' });
    } else if (antallBarn > 1 && gjelderAdopsjon) {
        return intl.formatMessage({ id: 'barna' });
    } else if (antallBarn === 2) {
        return intl.formatMessage({ id: 'tvillingene' });
    } else if (antallBarn === 3) {
        return intl.formatMessage({ id: 'trillingene' });
    }
    return intl.formatMessage({ id: 'flerlingene' });
};

const getTidslinjeTittelForAdopsjon = (navn: string, omsorgsovertakelse: string, intl: IntlShape) => {
    if (dayjs(omsorgsovertakelse).isSameOrBefore(dayjs(), 'd')) {
        return intl.formatMessage(
            { id: 'tidslinje.tittel.FAMILIEHENDELSE.omsorgsovertakelse.tilbakeITid' },
            {
                navn,
            },
        );
    } else {
        return intl.formatMessage(
            { id: 'tidslinje.tittel.FAMILIEHENDELSE.omsorgsovertakelse.fremITid' },
            {
                navn,
            },
        );
    }
};

// TODO: forenkles??
export const getTidslinjeTittelForBarnTreÅr = ({
    barnFraSak,
    familiehendelse,
    intl,
}: {
    barnFraSak: BarnGruppering;
    familiehendelse: Familiehendelse_fpoversikt;
    intl: IntlShape;
}) => {
    const { omsorgsovertakelse, antallBarn } = familiehendelse;
    let barnNavnTekst = '';
    if (omsorgsovertakelse) {
        return intl.formatMessage(
            { id: 'tidslinje.tittel.BARNET_TRE_ÅR.adopsjon' },
            {
                navn: barnNavnTekst,
            },
        );
    }
    if (barnFraSak.fornavn === undefined || barnFraSak.fornavn.length === 0 || !barnFraSak.alleBarnaLever) {
        barnNavnTekst = getTidslinjetekstForAntallBarn(antallBarn, intl, false);
    } else {
        barnNavnTekst = getNavnPåBarna(barnFraSak.fornavn);
    }
    return intl.formatMessage(
        { id: 'tidslinje.tittel.BARNET_TRE_ÅR.fødsel' },
        {
            navn: barnNavnTekst,
        },
    );
};

export const tittelSvarPåSøknad = (hendelse: Tidslinjehendelse, intl: IntlShape) => {
    const dokumenter = hendelse.dokumenter;
    if (dokumenter.length > 0) {
        if (dokumenter.some((d) => d.tittel.includes('Avslagsbrev'))) {
            return intl.formatMessage({ id: 'tidslinje.tittel.VEDTAK.avslått' });
        }
        if (dokumenter.some((d) => d.tittel.includes('Innvilgelsesbrev'))) {
            return intl.formatMessage({ id: 'tidslinje.tittel.VEDTAK.innvilget' });
        }
    }
    return intl.formatMessage({ id: 'tidslinje.tittel.VEDTAK' });
};
