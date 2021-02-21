import * as React from 'react';
import { useIntl } from 'react-intl';

import { Element } from 'nav-frontend-typografi';

import Arbeidsforhold from '../../../types/Arbeidsforhold';

import ArbeidsforholdInfoBox from 'app/steg/andreInntekter/arbeidsforhold-infobox/InformasjonOmArbeidsforhold';
import getMessage from 'common/util/i18nUtils';

import './arbeidsforhold.less';

interface ArbeidsforholdInfoWrapperProps {
    arbeidsforhold: Arbeidsforhold[];
}
const InformasjonOmArbeidsforholdWrapper: React.FunctionComponent<ArbeidsforholdInfoWrapperProps> = ({
    arbeidsforhold,
}) => {
    const harArbeidsforhold = arbeidsforhold !== undefined && arbeidsforhold.length > 0;
    const intl = useIntl();

    return (
        <React.Fragment>
            {!harArbeidsforhold && (
                <div className="arbeidsforholdInfoBox" style={{ marginBottom: '1rem' }}>
                    <Element tag="h4">
                        {getMessage(intl, 'annenInntekt.arbeidsforhold.ingenRegistrerteArbeidsforhold')}
                    </Element>
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

export default InformasjonOmArbeidsforholdWrapper;
