import * as React from 'react';
import Søker from '../../../../app/types/søknad/Søker';
import FrilansOppsummering from 'common/components/oppsummering/oppsummeringer/FrilansOppsummering';
import RegistrerteArbeidsforholdOppsummering from 'common/components/oppsummering/oppsummeringer/RegistrerteArbeidsforholdOppsummering';
import Arbeidsforhold from '../../../../app/types/Arbeidsforhold';
import SelvstendigNæringsdrivendeOppsummering from 'common/components/oppsummering/oppsummeringer/SelvstendigNæringsdrivendeOppsummering';
import AndreInntekterOppsummering from 'common/components/oppsummering/oppsummeringer/AndreInntekterOppsummering';

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
