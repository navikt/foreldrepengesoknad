import { useIntl } from 'react-intl';

import Arbeidsforhold from '../../../app/types/Arbeidsforhold';

import ArbeidsforholdInfoBox from 'common/components/arbeidsforhold-infobox/InformasjonOmArbeidsforhold';
import getMessage from 'common/util/i18nUtils';
import { BodyShort } from '@navikt/ds-react';
import { guid } from '@navikt/fp-common';

import './arbeidsforhold.less';
import { FunctionComponent } from 'react';

interface ArbeidsforholdInfoWrapperProps {
    arbeidsforhold: Arbeidsforhold[] | undefined;
}
const InformasjonOmArbeidsforholdWrapper: FunctionComponent<ArbeidsforholdInfoWrapperProps> = ({ arbeidsforhold }) => {
    const intl = useIntl();
    const harArbeidsforhold = arbeidsforhold !== undefined && arbeidsforhold.length > 0;

    return (
        <>
            {!harArbeidsforhold && (
                <div className="arbeidsforholdInfoBox">
                    <BodyShort>
                        {getMessage(intl, 'annenInntekt.arbeidsforhold.ingenRegistrerteArbeidsforhold')}
                    </BodyShort>
                </div>
            )}
            {harArbeidsforhold && (
                <ul className="arbeidsforholdList">
                    {arbeidsforhold.map((arbeidsforholdElement: Arbeidsforhold) => (
                        <li key={guid()}>
                            <ArbeidsforholdInfoBox
                                key={arbeidsforholdElement.arbeidsgiverId}
                                arbeidsforhold={arbeidsforholdElement}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default InformasjonOmArbeidsforholdWrapper;
