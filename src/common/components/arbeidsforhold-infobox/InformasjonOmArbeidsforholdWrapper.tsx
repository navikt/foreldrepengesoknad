import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { Normaltekst } from 'nav-frontend-typografi';

import Arbeidsforhold from '../../../app/types/Arbeidsforhold';

import ArbeidsforholdInfoBox from 'common/components/arbeidsforhold-infobox/InformasjonOmArbeidsforhold';
import getMessage from 'common/util/i18nUtils';

import './arbeidsforhold.less';

interface ArbeidsforholdInfoWrapperProps {
    arbeidsforhold: Arbeidsforhold[];
}
const InformasjonOmArbeidsforholdWrapper: React.StatelessComponent<
    ArbeidsforholdInfoWrapperProps & InjectedIntlProps
> = ({ arbeidsforhold, intl }) => {
    const harArbeidsforhold = arbeidsforhold !== undefined && arbeidsforhold.length > 0;

    return (
        <React.Fragment>
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
                            />
                        </li>
                    ))}
                </ul>
            )}
        </React.Fragment>
    );
};

export default injectIntl(InformasjonOmArbeidsforholdWrapper);
