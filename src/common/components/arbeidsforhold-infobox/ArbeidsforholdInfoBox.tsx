import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import Arbeidsforhold from '../../../app/types/Arbeidsforhold';

import EtikettLiten from 'nav-frontend-typografi/lib/etikett-liten';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { ISODateToPrettyDateFormat } from '../../../app/util/dates/dates';

import './arbeidsforhold.less';
import getMessage from 'common/util/i18nUtils';
import BEMHelper from 'common/util/bem';

interface ArbeidsforholdInfoBoxProps {
    arbeidsforhold: Arbeidsforhold;
}

const ArbeidsforholdInfoBox: React.StatelessComponent<
    ArbeidsforholdInfoBoxProps & InjectedIntlProps
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
export default injectIntl(ArbeidsforholdInfoBox);
