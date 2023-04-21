import React from 'react';
import { FormattedMessage } from 'react-intl';
import { GuidePanel } from '@navikt/ds-react';

import './annenForelderVeileder.less';

const FarDokumentasjonAleneomsorgVeileder: React.FunctionComponent = () => {
    return (
        <div className="annenForelderVeileder">
            <GuidePanel>
                <FormattedMessage id="annenForelder.farMedmor.dokumentasjonAvAleneomsorg.veileder" />
            </GuidePanel>
        </div>
    );
};

export default FarDokumentasjonAleneomsorgVeileder;
