import React, { useState } from 'react';
import { guid } from 'nav-frontend-js-utils';
import InfoToggler from './InfoToggler';
import './utvidetInformasjon.less';
import EkspanderbartInnhold from './EkspanderbartInnhold';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { BodyShort } from '@navikt/ds-react';

interface Props {
    children: React.ReactNode;
    erApen?: boolean;
    apneLabel?: string;
    lukkLabel?: string;
}

const UtvidetInformasjon: React.FunctionComponent<Props> = ({ children, apneLabel }) => {
    const intl = useIntl();
    const innholdId = guid();
    const [apen, setApen] = useState<boolean>(false);

    const lukkLabel = getMessage(intl, 'utvidetInformasjon.lukkTekst');

    return (
        <div className="utvidetInformasjon">
            <div className="utvidetInformasjon__toggler no-print">
                <InfoToggler onToggle={() => setApen(!apen)} apen={apen}>
                    <BodyShort>{apen ? lukkLabel : apneLabel}</BodyShort>
                </InfoToggler>
            </div>
            <div className="utvidetInformasjon__innhold" id={innholdId}>
                <EkspanderbartInnhold erApen={apen}>{children}</EkspanderbartInnhold>

                <div className="print-only">{children}</div>
            </div>
        </div>
    );
};
export default UtvidetInformasjon;
