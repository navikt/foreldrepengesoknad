import { intlUtils } from '@navikt/fp-common';
import HarArbeidsforhold from 'app/steps/inntektsinformasjon/components/arbeidsforhold-informasjon/HarArbeidsforhold';
import HarIkkeArbeidsforhold from 'app/steps/inntektsinformasjon/components/arbeidsforhold-informasjon/HarIkkeArbeidsforhold';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import AndreInntekterOppsummering from './AndreInntekterOppsummering';
import FrilansOppsummering from './FrilansOppsummering';
import SelvstendigNæringsdrivendeOppsummering from './SelvstendigNæringsdrivendeOppsummering';
import useSøknad from 'app/utils/hooks/useSøknad';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { getAktiveArbeidsforhold } from 'app/utils/arbeidsforholdUtils';
import { ISOStringToDate } from 'app/utils/dateUtils';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';

const ArbeidsforholdOgAndreInntekterOppsummering: FunctionComponent = () => {
    const intl = useIntl();
    const { arbeidsforhold } = useSøkerinfo();
    const { barn, søkersituasjon } = useSøknad();
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const aktiveArbeidsForhold = getAktiveArbeidsforhold(
        arbeidsforhold,
        erAdopsjon,
        erFarEllerMedmor,
        ISOStringToDate(familiehendelsesdato)
    );
    const harArbeidsforhold = aktiveArbeidsForhold !== undefined && aktiveArbeidsForhold.length > 0;

    return (
        <>
            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.inntekt.registrerteArbeidsforhold')}>
                <HarIkkeArbeidsforhold harArbeidsforhold={harArbeidsforhold} />
                <HarArbeidsforhold harArbeidsforhold={harArbeidsforhold} arbeidsforhold={aktiveArbeidsForhold} />
            </OppsummeringsPunkt>
            <FrilansOppsummering />
            <SelvstendigNæringsdrivendeOppsummering />
            <AndreInntekterOppsummering />
        </>
    );
};

export default ArbeidsforholdOgAndreInntekterOppsummering;
