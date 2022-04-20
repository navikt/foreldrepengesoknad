import React, { FunctionComponent, ReactNode } from 'react';
import EkspanderbartPanel from 'nav-frontend-ekspanderbartpanel';

import './oppsummeringsPanel.less';
import { bemUtils } from '@navikt/fp-common';

interface Props {
    title: string;
    children: ReactNode;
}

const OppsummeringsPanel: FunctionComponent<Props> = ({ title, children }) => {
    const bem = bemUtils('oppsummeringsPanel');

    return (
        <EkspanderbartPanel className={bem.block} tittel={title}>
            <div className={bem.element('content')}>{children}</div>
        </EkspanderbartPanel>
    );
};

export default OppsummeringsPanel;
