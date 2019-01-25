import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Element, EtikettLiten, Normaltekst } from 'nav-frontend-typografi';

import Arbeidsforhold from '../../../app/types/Arbeidsforhold';
import { formatDate } from '../../../app/util/dates/dates';
import getMessage from 'common/util/i18nUtils';
import BEMHelper from 'common/util/bem';

import './arbeidsforhold.less';

interface InformasjonOmArbeidsforholdProps {
    arbeidsforhold: Arbeidsforhold;
}

type Props = InformasjonOmArbeidsforholdProps & InjectedIntlProps;
const InformasjonOmArbeidsforhold: React.StatelessComponent<Props> = ({ arbeidsforhold, intl }: Props) => {
    const cls = BEMHelper('arbeidsforholdInfoBox');
    return (
        <div className={cls.className}>
            <div className={cls.element('topRow')}>
                {arbeidsforhold.arbeidsgiverIdType === 'orgnr' && (
                    <EtikettLiten>
                        {getMessage(intl, 'annenInntekt.arbeidsforhold.organisasjonsnummer', {
                            organisasjonsnummer: arbeidsforhold.arbeidsgiverId
                        })}
                    </EtikettLiten>
                )}
                <EtikettLiten className={cls.element('stillingsprosent')}>
                    {getMessage(intl, 'annenInntekt.arbeidsforhold.stillingsprosent', {
                        stillingsprosent: arbeidsforhold.stillingsprosent
                    })}
                </EtikettLiten>
            </div>
            <Element>
                {arbeidsforhold.arbeidsgiverIdType === 'orgnr'
                    ? arbeidsforhold.arbeidsgiverNavn
                    : getMessage(intl, 'arbeidsgiver')}
            </Element>
            <Normaltekst>
                {getMessage(intl, 'annenInntekt.arbeidsforhold.periode', {
                    fom: formatDate(arbeidsforhold.fom),
                    tom: arbeidsforhold.tom ? formatDate(arbeidsforhold.tom) : getMessage(intl, 'pågående')
                })}
            </Normaltekst>
        </div>
    );
};
export default injectIntl(InformasjonOmArbeidsforhold);
