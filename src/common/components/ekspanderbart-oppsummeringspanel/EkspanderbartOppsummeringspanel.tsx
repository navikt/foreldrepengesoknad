import * as React from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { StegID } from '../../../app/util/routing/stegConfig';
import EkspanderbartOppsumeringspanelHeader from 'common/components/ekspanderbart-oppsummeringspanel/EkspanderbartOppsummeringspanelHeader';

import './ekspanderbartOppsumeringspanel.less';

interface OppsummeringsBolkProps {
    steg: StegID;
    tittel: string;
    checked: boolean;
    render?: () => React.ReactNode;
    onClick: (type: string) => void;
}

class EkspanderbartOppsummeringsPanel extends React.Component<
    OppsummeringsBolkProps
> {
    render() {
        const { steg, tittel, checked, render, onClick } = this.props;
        return (
            <div className="ekspanderbartOppsumeringspanel">
                <EkspanderbartpanelBase
                    ariaTittel={tittel}
                    heading={
                        <EkspanderbartOppsumeringspanelHeader
                            tittel={tittel}
                            checked={checked}
                        />
                    }
                    onClick={() => onClick(steg)}>
                    <div className="ekspanderbartOppsumeringspanel__content">
                        {render && render()}
                    </div>
                </EkspanderbartpanelBase>
            </div>
        );
    }
}
export default EkspanderbartOppsummeringsPanel;
