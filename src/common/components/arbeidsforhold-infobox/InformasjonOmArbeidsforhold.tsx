import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { Element, Normaltekst, EtikettLiten } from 'nav-frontend-typografi';

import Arbeidsforhold from '../../../app/types/Arbeidsforhold';

import { ISODateToPrettyDateFormat } from '../../../app/util/dates/dates';

import getMessage from 'common/util/i18nUtils';
import BEMHelper from 'common/util/bem';

import './arbeidsforhold.less';

interface InformasjonOmArbeidsforholdProps {
    arbeidsforhold: Arbeidsforhold;
}

const InformasjonOmArbeidsforhold: React.StatelessComponent<
    InformasjonOmArbeidsforholdProps & InjectedIntlProps
> = ({ arbeidsforhold, intl }) => {
    const cls = BEMHelper('arbeidsforholdInfoBox');
    return (
        <div className={cls.className}>
            <div className={cls.element('topRow')}>
                {arbeidsforhold.arbeidsgiverIdType === 'orgnr' && (
                    <EtikettLiten>
                        {getMessage(
                            intl,
                            'annenInntekt.arbeidsforhold.organisasjonsnummer',
                            {
                                organisasjonsnummer:
                                    arbeidsforhold.arbeidsgiverId
                            }
                        )}
                    </EtikettLiten>
                )}
                <EtikettLiten className={cls.element('stillingsprosent')}>
                    {getMessage(
                        intl,
                        'annenInntekt.arbeidsforhold.stillingsprosent',
                        { stillingsprosent: arbeidsforhold.stillingsprosent }
                    )}
                </EtikettLiten>
            </div>
            <Element>{arbeidsforhold.arbeidsgiverNavn}</Element>
            <Normaltekst>
                {getMessage(intl, 'annenInntekt.arbeidsforhold.periode', {
                    fom: ISODateToPrettyDateFormat(arbeidsforhold.fom),
                    tom: arbeidsforhold.tom
                        ? ISODateToPrettyDateFormat(arbeidsforhold.tom)
                        : getMessage(intl, 'pågående')
                })}
            </Normaltekst>
        </div>
    );
};
export default injectIntl(InformasjonOmArbeidsforhold);
