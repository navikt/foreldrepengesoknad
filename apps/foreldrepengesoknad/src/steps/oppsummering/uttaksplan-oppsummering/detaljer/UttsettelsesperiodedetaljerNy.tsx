import { IntlShape, useIntl } from 'react-intl';

import { AnnenForelder } from '@navikt/fp-common';
import { EksternArbeidsforholdDto_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { Feltoppsummering } from './Feltoppsummering';
import { MorsAktivitetDetaljer } from './MorsaktiviteterDetaljer';

interface Props {
    periode: UttakPeriode_fpoversikt;
    registrerteArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    søkerErFarEllerMedmor: boolean;
    annenForelder: AnnenForelder;
    periodeErNyEllerEndret: boolean;
}

export const UtsettelsesperiodedetaljerNy = ({ periode }: Props) => {
    const { morsAktivitet } = periode;
    const intl = useIntl();

    //FIXME (TOR) Kor får ein bekrefterArbeidIPerioden fra?
    // const bekreftErIArbeidSvar =
    //     bekrefterArbeidIPerioden === true ? intl.formatMessage({ id: 'ja' }) : intl.formatMessage({ id: 'nei' });

    return (
        <>
            <Feltoppsummering
                feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.årsak' })}
                verdi={getÅrsakTekst(intl, periode)}
            />
            {/* {utsettelseÅrsak === 'ARBEID' && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.bekreft100ProsentIArbeid.label' })}
                    verdi={bekreftErIArbeidSvar}
                />
            )} */}
            {morsAktivitet && <MorsAktivitetDetaljer morsAktivitet={morsAktivitet} />}
        </>
    );
};

const getÅrsakTekst = (intl: IntlShape, periode: UttakPeriode_fpoversikt) => {
    //@ts-expect-error Fiks dynamisk id
    return intl.formatMessage({ id: `uttaksplan.utsettelsesårsak.${periode.utsettelseÅrsak}` });
};
