import React, { FunctionComponent } from 'react';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { Søknadsgrunnlag } from 'app/types/Søknad';
import InformasjonOmArbeidsforholdWrapper from 'common/components/arbeidsforhold-infobox/InformasjonOmArbeidsforholdWrapper';
import InformasjonOmFrilans from './components/InformasjonOmFrilans';
import { FrilansInformasjon } from 'app/types/FrilansInformasjon';
import { Næring } from 'app/types/SelvstendigNæringsdrivende';
import InformasjonOmSelvstendig from './components/InformasjonOmSelvstendig';
import InformasjonOmAndreInntekter from './components/InformasjonOmAndreInntekter';
import DuHarSvartNeiListe from './DuHarSvartNeiListe';
import { AnnenInntekt } from 'app/types/AnnenInntekt';
import { guid } from 'nav-frontend-js-utils';

interface Props {
    arbeidsforhold: Arbeidsforhold[];
    søknadsgrunnlag: Søknadsgrunnlag[];
    harJobbetSomSelvstendigNæringsdrivende: boolean;
    harJobbetFrilans: boolean;
    harHattAndreInntektskilder: boolean;
    frilansInformasjon: Partial<FrilansInformasjon> | undefined;
    selvstendigInformasjon: Næring[] | undefined;
    andreInntekter?: AnnenInntekt[];
}

const ArbeidsforholdOppsummering: FunctionComponent<Props> = ({
    arbeidsforhold,
    harJobbetSomSelvstendigNæringsdrivende,
    harJobbetFrilans,
    harHattAndreInntektskilder,
    frilansInformasjon,
    selvstendigInformasjon,
    andreInntekter,
}) => {
    return (
        <>
            <InformasjonOmArbeidsforholdWrapper arbeidsforhold={arbeidsforhold} />

            {harJobbetFrilans && <InformasjonOmFrilans frilansInformasjon={frilansInformasjon!} />}

            {harJobbetSomSelvstendigNæringsdrivende &&
                selvstendigInformasjon!.map((info) => (
                    <InformasjonOmSelvstendig
                        key={`${info.navnPåNæringen}${info.organisasjonsnummer}`}
                        selvstendigInformasjon={info}
                    />
                ))}

            {harHattAndreInntektskilder &&
                andreInntekter !== undefined &&
                andreInntekter.length > 0 &&
                andreInntekter.map((annenInn) => <InformasjonOmAndreInntekter key={guid()} annenInntekt={annenInn} />)}

            {(!harJobbetSomSelvstendigNæringsdrivende || !harJobbetFrilans || !harHattAndreInntektskilder) && (
                <DuHarSvartNeiListe
                    arbeidsforholdOppsummering={true}
                    harHattAndreInntektskilder={harHattAndreInntektskilder}
                    harJobbetFrilans={harJobbetFrilans}
                    harJobbetSomSelvstendigNæringsdrivende={harJobbetSomSelvstendigNæringsdrivende}
                />
            )}
        </>
    );
};

export default ArbeidsforholdOppsummering;
