import React, { useState } from 'react';
import InfoToggler from './InfoToggler';
import { guid } from './../../utils/guid';
import EkspanderbartInnhold from './EkspanderbartInnhold';
import { useIntl } from 'react-intl';
import intlHelper from './../../utils/intlUtils';
import { BodyLong } from '@navikt/ds-react';
import './utvidetInformasjon.less';

export interface UtvidetInformasjonProps {
    children: React.ReactNode;
    erApen?: boolean;
    apneLabel?: React.ReactNode;
    lukkLabel?: React.ReactNode;
}

const UtvidetInformasjon: React.FunctionComponent<UtvidetInformasjonProps> = ({ children, erApen, apneLabel }) => {
    const intl = useIntl();
    const innholdId = guid();
    const [apen, setApen] = useState<boolean>(erApen || false);
    const lukkLabel = intlHelper(intl, 'utvidetInformasjon.lukkTekst');

    return (
        <div className="utvidetInformasjon">
            <div className="utvidetInformasjon__toggler no-print">
                <InfoToggler onToggle={() => setApen(!apen)} apen={apen}>
                    <BodyLong>{apen ? lukkLabel : apneLabel}</BodyLong>
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
