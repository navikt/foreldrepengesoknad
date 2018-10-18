import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Arbeidsform, UttaksperiodeBase } from '../../../../../app/types/uttaksplan/periodetyper';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';
import MorsAktivitetDetaljer from 'common/components/oppsummering/oppsummeringer/detaljer/MorsAktivitetDetaljer';

interface UttaksperiodedetaljerProps {
    periode: UttaksperiodeBase;
}

type Props = UttaksperiodedetaljerProps & InjectedIntlProps;

const Uttaksperiodedetaljer: React.StatelessComponent<Props> = ({ periode, intl }) => {
    const {
        morsAktivitetIPerioden,
        ønskerSamtidigUttak,
        gradert,
        stillingsprosent,
        orgnr,
        arbeidsform,
        vedlegg
    } = periode;

    let arbeidsformTekst = '';
    if (arbeidsform === Arbeidsform.arbeidstaker) {
        arbeidsformTekst = `Jeg skal jobbe for registrert arbeidstaker med organisasjonsnummer ${orgnr}`;
    } else if (arbeidsform === Arbeidsform.selvstendignæringsdrivende) {
        arbeidsformTekst = 'Jeg skal jobbe som selvstendig næringsdrivende eller frilans';
    } else if (arbeidsform === Arbeidsform.frilans) {
        arbeidsformTekst = 'Jeg skal jobbe som frilans';
    }

    return (
        <>
            {/*gradert === true &&
                trekkdager !== undefined && (
                    <Feltoppsummering feltnavn={`Antall dager som trekkes fra ${konto}`} verdi={`${trekkdager}`} />
                )*/}
            {ønskerSamtidigUttak !== undefined && (
                <Feltoppsummering feltnavn="Skal ha samtidig uttak" verdi={ønskerSamtidigUttak ? 'Ja' : 'Nei'} />
            )}
            <Feltoppsummering feltnavn="Jeg skal kombinere perioden med arbeid" verdi={gradert ? 'Ja' : 'Nei'} />
            {gradert === true &&
                stillingsprosent && <Feltoppsummering feltnavn="Stillingsprosent" verdi={stillingsprosent} />}
            {arbeidsform && <Feltoppsummering feltnavn="Arbeidstaker" verdi={arbeidsformTekst} />}
            {morsAktivitetIPerioden && (
                <MorsAktivitetDetaljer
                    morsAktivitet={morsAktivitetIPerioden}
                    dokumentasjonAvMorsAktivitet={vedlegg || []}
                />
            )}
        </>
    );
};

export default injectIntl(Uttaksperiodedetaljer);
