import React from 'react';
import { FormattedMessage } from 'react-intl';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederNormal from 'common/components/veileder/VeilederNormalSvg';

import './annenForelderVeileder.less';

const FarDokumentasjonAleneomsorgVeileder: React.FunctionComponent = () => {
    return (
        <div className="annenForelderVeileder">
            <Veilederpanel fargetema="normal" svg={<VeilederNormal />}>
                <FormattedMessage id="annenForelder.farMedmor.dokumentasjonAvAleneomsorg.veileder" />
            </Veilederpanel>
        </div>
    );
};

export default FarDokumentasjonAleneomsorgVeileder;
