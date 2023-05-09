import React from 'react';
import { guid } from './../../utils/guid';
import { ReadMore } from '@navikt/ds-react';
import './utvidetInformasjon.less';

export interface UtvidetInformasjonProps {
    children: React.ReactNode;
    erApen?: boolean;
    apneLabel?: React.ReactNode;
}

const UtvidetInformasjon: React.FunctionComponent<UtvidetInformasjonProps> = ({ children, apneLabel }) => {
    const innholdId = guid();

    return (
        <div className="utvidetInformasjon">
            <div className="utvidetInformasjon__innhold" id={innholdId}>
                <ReadMore header={apneLabel}>{children}</ReadMore>

                <div className="print-only">{children}</div>
            </div>
        </div>
    );
};
export default UtvidetInformasjon;
