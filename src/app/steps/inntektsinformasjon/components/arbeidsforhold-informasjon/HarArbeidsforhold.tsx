import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { bemUtils, formatDate, intlUtils } from '@navikt/fp-common';
import Arbeidsforhold from 'app/types/Arbeidsforhold';

interface Props {
    arbeidsforhold: Arbeidsforhold[];
    harArbeidsforhold: boolean;
}

const HarArbeidsforhold: FunctionComponent<Props> = ({ arbeidsforhold, harArbeidsforhold }: Props) => {
    if (!harArbeidsforhold) {
        return null;
    }

    const intl = useIntl();
    const bem = bemUtils('arbeidsforholdInfoBox');

    return (
        <ul className="arbeidsforholdList">
            {arbeidsforhold.map((arbforhold: Arbeidsforhold) => (
                <li key={arbforhold.arbeidsgiverId}>
                    <div className={bem.block}>
                        <div className={bem.element('topRow')}>
                            {arbforhold.arbeidsgiverIdType === 'orgnr' && (
                                <Normaltekst>
                                    {intlUtils(intl, 'inntektsinformasjon.arbeidsforhold.organisasjonsnummer', {
                                        organisasjonsnummer: arbforhold.arbeidsgiverId,
                                    })}
                                </Normaltekst>
                            )}
                            <Normaltekst className={bem.element('stillingsprosent')}>
                                {intlUtils(intl, 'inntektsinformasjon.arbeidsforhold.stillingsprosent', {
                                    stillingsprosent: arbforhold.stillingsprosent,
                                })}
                            </Normaltekst>
                        </div>
                        <Element>
                            {arbforhold.arbeidsgiverIdType === 'orgnr'
                                ? arbforhold.arbeidsgiverNavn
                                : intlUtils(intl, 'arbeidsgiver')}
                        </Element>
                        <Normaltekst>
                            {intlUtils(intl, 'inntektsinformasjon.arbeidsforhold.periode', {
                                fom: formatDate(arbforhold.fom),
                                tom: arbforhold.tom ? formatDate(arbforhold.tom) : intlUtils(intl, 'pågående'),
                            })}
                        </Normaltekst>
                    </div>
                </li>
            ))}
        </ul>
    );
};
export default HarArbeidsforhold;
