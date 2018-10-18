import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Arbeidsform, StønadskontoType, UttaksperiodeBase } from '../../../../../app/types/uttaksplan/periodetyper';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';
import { Forelder } from 'common/types';
import MorsAktivitetDetaljer from 'common/components/oppsummering/oppsummeringer/detaljer/MorsAktivitetDetaljer';

interface UttaksperiodedetaljerProps {
    periode: UttaksperiodeBase;
}

type Props = UttaksperiodedetaljerProps & InjectedIntlProps;

const Uttaksperiodedetaljer: React.StatelessComponent<Props> = ({ periode, intl }) => {
    const {
        konto,
        forelder,
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
            <Feltoppsummering feltnavn="Konto" verdi={konto} />
            {/*gradert === true &&
                trekkdager !== undefined && (
                    <Feltoppsummering feltnavn={`Antall dager som trekkes fra ${konto}`} verdi={`${trekkdager}`} />
                )*/}
            {ønskerSamtidigUttak !== undefined && (
                <Feltoppsummering feltnavn="Skal ha samtidig uttak" verdi={ønskerSamtidigUttak ? 'Ja' : 'Nei'} />
            )}
            <Feltoppsummering feltnavn="Uttaket er gradert" verdi={gradert ? 'Ja' : 'Nei'} />
            {gradert === true &&
                stillingsprosent && <Feltoppsummering feltnavn="Stillingsprosent" verdi={stillingsprosent} />}
            {arbeidsform && <Feltoppsummering feltnavn="Arbeidstaker" verdi={arbeidsformTekst} />}
            {forelder === Forelder.FARMEDMOR &&
                konto === StønadskontoType.Fellesperiode &&
                morsAktivitetIPerioden && (
                    <MorsAktivitetDetaljer
                        morsAktivitet={morsAktivitetIPerioden}
                        dokumentasjonAvMorsAktivitet={vedlegg || []}
                    />
                )}
        </>
    );
};

export default injectIntl(Uttaksperiodedetaljer);
