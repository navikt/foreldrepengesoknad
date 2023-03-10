import VeilederNormal from 'app/assets/VeilederNormal';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import './annenForelderVeileder.less';

interface Props {
    visible: boolean;
    annenForelderNavn: string;
}

const AvtaleAtFarTarUtForeldrepengerVeileder: React.FunctionComponent<Props> = ({ visible, annenForelderNavn }) => {
    if (!visible) {
        return null;
    }

    return (
        <div className="annenForelderVeileder">
            <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                <FormattedMessage
                    id="annenForelder.veileder.aleneOmsorg.forBarnet"
                    values={{ navn: annenForelderNavn }}
                />
            </Veilederpanel>
        </div>
    );
};

export default AvtaleAtFarTarUtForeldrepengerVeileder;
