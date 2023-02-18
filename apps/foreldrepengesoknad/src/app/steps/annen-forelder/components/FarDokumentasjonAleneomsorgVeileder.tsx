import React from 'react';
import { FormattedMessage } from 'react-intl';
import Veilederpanel from 'nav-frontend-veilederpanel';

import './annenForelderVeileder.less';
import VeilederNormal from 'app/assets/VeilederNormal';

const FarDokumentasjonAleneomsorgVeileder: React.FunctionComponent = () => {
    return (
        <div className="annenForelderVeileder">
            <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                <FormattedMessage id="annenForelder.farMedmor.dokumentasjonAvAleneomsorg.veileder" />
            </Veilederpanel>
        </div>
    );
};

export default FarDokumentasjonAleneomsorgVeileder;
