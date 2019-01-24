import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { Normaltekst } from 'nav-frontend-typografi';

import Arbeidsforhold from '../../../app/types/Arbeidsforhold';
import ArbeidsforholdInfoBox from 'common/components/arbeidsforhold-infobox/InformasjonOmArbeidsforhold';
import getMessage from 'common/util/i18nUtils';
import Sak, { FagsakStatus } from '../../../app/types/søknad/Sak';
import { erInfotrygdSak, finnNyesteBehandling } from '../../../app/util/saker/sakerUtils';

import './arbeidsforhold.less';

interface ArbeidsforholdInfoWrapperProps {
    arbeidsforhold: Arbeidsforhold[];
    nyesteSak?: Sak;
}

export const kanViseEtikettOmMotattInntektsmelding = (arbeidsforhold: Arbeidsforhold[], sak?: Sak): boolean => {
    return (
        sak === undefined ||
        (sak !== undefined &&
            !erInfotrygdSak(sak) &&
            (arbeidsforhold.length === 1 || !harInntektsmeldingBlittMottatt(sak)))
    );
};

export const harInntektsmeldingBlittMottatt = (sak?: Sak): boolean => {
    return (
        sak !== undefined &&
        sak.status === FagsakStatus.OPPRETTET &&
        sak.behandlinger !== undefined &&
        finnNyesteBehandling(sak.behandlinger).inntektsmeldinger.length > 0
    );
};

const InformasjonOmArbeidsforholdWrapper: React.StatelessComponent<
    ArbeidsforholdInfoWrapperProps & InjectedIntlProps
> = ({ arbeidsforhold, nyesteSak, intl }) => {
    const harArbeidsforhold = arbeidsforhold !== undefined && arbeidsforhold.length > 0;

    return (
        <>
            {!harArbeidsforhold && (
                <div className="arbeidsforholdInfoBox">
                    <Normaltekst>
                        {getMessage(intl, 'annenInntekt.arbeidsforhold.ingenRegistrerteArbeidsforhold')}
                    </Normaltekst>
                </div>
            )}
            {harArbeidsforhold && (
                <ul className="arbeidsforholdList">
                    {arbeidsforhold.map((arbeidsforholdElement: Arbeidsforhold) => (
                        <li key={arbeidsforholdElement.arbeidsgiverId}>
                            <ArbeidsforholdInfoBox
                                key={arbeidsforholdElement.arbeidsgiverId}
                                arbeidsforhold={arbeidsforholdElement}
                                kanViseEtikettOmMotattInntektsmelding={kanViseEtikettOmMotattInntektsmelding(
                                    arbeidsforhold,
                                    nyesteSak
                                )}
                                motattInnteksmelding={nyesteSak ? harInntektsmeldingBlittMottatt(nyesteSak) : false}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default injectIntl(InformasjonOmArbeidsforholdWrapper);
