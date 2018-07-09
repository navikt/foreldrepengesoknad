import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import CheckboxIkon from 'common/components/ikoner/CheckboxIkon';

import './ekspanderbartOppsumeringspanel.less';

interface EkspanderbartOppsummeringsPanelHeaderProps {
    tittel: string;
    checked: boolean;
}

const EkspanderbartOppsumeringspanelHeader = (
    props: EkspanderbartOppsummeringsPanelHeaderProps
) => {
    const { checked, tittel } = props;
    return (
        <div className="ekspanderbartOppsumeringspanelHeader">
            <CheckboxIkon checked={checked} />
            <Undertittel>{tittel}</Undertittel>
        </div>
    );
};
export default EkspanderbartOppsumeringspanelHeader;
