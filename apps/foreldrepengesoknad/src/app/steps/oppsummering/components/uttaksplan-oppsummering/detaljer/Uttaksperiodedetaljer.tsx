import { AnnenForelder, StønadskontoType, UttaksperiodeBase, isAnnenForelderOppgitt } from '@navikt/fp-common';
import * as React from 'react';
import { useIntl } from 'react-intl';
import Feltoppsummering from '../feltoppsummering/Feltoppsummering';
import MorsAktivitetDetaljer from './MorsaktiviteterDetaljer';
import { getArbeidsformTekst } from '../OppsummeringUtils';
import { Arbeidsforhold } from '@navikt/fp-types';

interface UttaksperiodedetaljerProps {
    periode: UttaksperiodeBase;
    registrerteArbeidsforhold: Arbeidsforhold[] | undefined;
    periodeErNyEllerEndret: boolean;
    søkerErFarEllerMedmor: boolean;
    annenForelder: AnnenForelder;
}

type Props = UttaksperiodedetaljerProps;

const Uttaksperiodedetaljer: React.FunctionComponent<Props> = ({
    periode,
    registrerteArbeidsforhold,
    annenForelder,
}) => {
    const {
        konto,
        morsAktivitetIPerioden,
        ønskerSamtidigUttak,
        gradert,
        stillingsprosent,
        orgnumre,
        arbeidsformer,
        ønskerFlerbarnsdager,
    } = periode;
    const intl = useIntl();

    let arbeidsformTekst = '';
    if (arbeidsformer) {
        arbeidsformTekst = getArbeidsformTekst(intl, arbeidsformer, orgnumre, registrerteArbeidsforhold).join('\r\n');
    }

    const erDeltUttakINorge = isAnnenForelderOppgitt(annenForelder) && annenForelder.harRettPåForeldrepengerINorge;

    return (
        <>
            {ønskerFlerbarnsdager !== undefined && erDeltUttakINorge && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.ønskerFlerbarnsdager' })}
                    verdi={ønskerFlerbarnsdager ? intl.formatMessage({ id: 'ja' }) : intl.formatMessage({ id: 'nei' })}
                />
            )}
            {ønskerSamtidigUttak !== undefined && erDeltUttakINorge && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.samtidigUttak' })}
                    verdi={ønskerSamtidigUttak ? intl.formatMessage({ id: 'ja' }) : intl.formatMessage({ id: 'nei' })}
                />
            )}
            {konto !== StønadskontoType.ForeldrepengerFørFødsel && ønskerSamtidigUttak !== true && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.kombineresMedarbeid' })}
                    verdi={gradert ? intl.formatMessage({ id: 'ja' }) : intl.formatMessage({ id: 'nei' })}
                />
            )}

            {gradert === true && stillingsprosent && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.stillingsprosent' })}
                    verdi={stillingsprosent}
                />
            )}

            {arbeidsformer && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.arbeidstaker.label' })}
                    verdi={arbeidsformTekst}
                />
            )}
            {morsAktivitetIPerioden && <MorsAktivitetDetaljer morsAktivitet={morsAktivitetIPerioden} />}
        </>
    );
};

export default Uttaksperiodedetaljer;
