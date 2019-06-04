import * as React from 'react';
import Søker from '../../../../../types/søknad/Søker';
import FrilansOppsummering from 'app/steg/oppsummering/components/oppsummering/oppsummeringer/FrilansOppsummering';
import RegistrerteArbeidsforholdOppsummering from 'app/steg/oppsummering/components/oppsummering/oppsummeringer/RegistrerteArbeidsforholdOppsummering';
import Arbeidsforhold from '../../../../../types/Arbeidsforhold';
import SelvstendigNæringsdrivendeOppsummering from 'app/steg/oppsummering/components/oppsummering/oppsummeringer/SelvstendigNæringsdrivendeOppsummering';
import AndreInntekterOppsummering from 'app/steg/oppsummering/components/oppsummering/oppsummeringer/AndreInntekterOppsummering';

interface InntektOppsummeringProps {
    søker: Søker;
    arbeidsforhold: Arbeidsforhold[];
}

const InntektOppsummering = ({ søker, arbeidsforhold }: InntektOppsummeringProps) => {
    return (
        <>
            <RegistrerteArbeidsforholdOppsummering arbeidsforhold={arbeidsforhold} />
            <FrilansOppsummering søker={søker} />
            <SelvstendigNæringsdrivendeOppsummering søker={søker} />
            <AndreInntekterOppsummering søker={søker} />
        </>
    );
};

export default InntektOppsummering;
