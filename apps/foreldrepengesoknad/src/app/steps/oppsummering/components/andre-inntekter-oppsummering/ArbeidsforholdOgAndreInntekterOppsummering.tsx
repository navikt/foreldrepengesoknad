import { Barn, ISOStringToDate, getAktiveArbeidsforhold, isFarEllerMedmor } from '@navikt/fp-common';
import HarArbeidsforhold from 'app/steps/inntektsinformasjon/components/arbeidsforhold-informasjon/HarArbeidsforhold';
import HarIkkeArbeidsforhold from 'app/steps/inntektsinformasjon/components/arbeidsforhold-informasjon/HarIkkeArbeidsforhold';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import AndreInntekterOppsummering from './AndreInntekterOppsummering';
import FrilansOppsummering from './FrilansOppsummering';
import SelvstendigNæringsdrivendeOppsummering from './SelvstendigNæringsdrivendeOppsummering';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { Arbeidsforhold, SøkersituasjonFp } from '@navikt/fp-types';
import Søker from 'app/context/types/Søker';
import { VStack } from '@navikt/ds-react';

interface Props {
    arbeidsforhold: Arbeidsforhold[];
    barn: Barn;
    søkersituasjon: SøkersituasjonFp;
    søker: Søker;
}

const ArbeidsforholdOgAndreInntekterOppsummering: FunctionComponent<Props> = ({
    arbeidsforhold,
    barn,
    søkersituasjon,
    søker,
}) => {
    const intl = useIntl();
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const aktiveArbeidsForhold = getAktiveArbeidsforhold(
        arbeidsforhold,
        erAdopsjon,
        erFarEllerMedmor,
        ISOStringToDate(familiehendelsesdato),
    );
    const harArbeidsforhold = aktiveArbeidsForhold !== undefined && aktiveArbeidsForhold.length > 0;

    return (
        <>
            <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.inntekt.registrerteArbeidsforhold' })}>
                <HarIkkeArbeidsforhold harArbeidsforhold={harArbeidsforhold} />
                <HarArbeidsforhold harArbeidsforhold={harArbeidsforhold} arbeidsforhold={aktiveArbeidsForhold} />
            </OppsummeringsPunkt>
            <VStack gap="4">
                <FrilansOppsummering søker={søker} />
                <SelvstendigNæringsdrivendeOppsummering søker={søker} />
                <AndreInntekterOppsummering søker={søker} />
            </VStack>
        </>
    );
};

export default ArbeidsforholdOgAndreInntekterOppsummering;
