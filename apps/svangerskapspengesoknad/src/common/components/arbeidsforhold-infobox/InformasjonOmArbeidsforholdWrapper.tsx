import React from 'react';
import { useIntl } from 'react-intl';

import Arbeidsforhold from '../../../app/types/Arbeidsforhold';

import ArbeidsforholdInfoBox from 'common/components/arbeidsforhold-infobox/InformasjonOmArbeidsforhold';
import getMessage from 'common/util/i18nUtils';

import './arbeidsforhold.less';
import { guid } from 'nav-frontend-js-utils';
import { BodyShort } from '@navikt/ds-react';

interface ArbeidsforholdInfoWrapperProps {
    arbeidsforhold: Arbeidsforhold[] | undefined;
}
const InformasjonOmArbeidsforholdWrapper: React.FunctionComponent<ArbeidsforholdInfoWrapperProps> = ({
    arbeidsforhold,
}) => {
    const intl = useIntl();
    const harArbeidsforhold = arbeidsforhold !== undefined && arbeidsforhold.length > 0;

    return (
        <React.Fragment>
            {!harArbeidsforhold && (
                <div className="arbeidsforholdInfoBox">
                    <BodyShort>
                        {getMessage(intl, 'annenInntekt.arbeidsforhold.ingenRegistrerteArbeidsforhold')}
                    </BodyShort>
                </div>
            )}
            {harArbeidsforhold && (
                <ul className="arbeidsforholdList">
                    {arbeidsforhold!.map((arbeidsforholdElement: Arbeidsforhold) => (
                        <li key={guid()}>
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
