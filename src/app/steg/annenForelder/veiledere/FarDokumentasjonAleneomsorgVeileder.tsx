import React from 'react';
import VeilederInfo from 'app/components/veilederInfo/VeilederInfo';

import './annenForelderVeileder.less';

const FarDokumentasjonAleneomsorgVeileder: React.FunctionComponent = () => {
    return (
        <div className="annenForelderVeileder">
            <VeilederInfo
                messages={[
                    {
                        type: 'normal',
                        contentIntlKey: 'far.dokumantasjonAvAleneomsorg.vedlegg.veileder'
                    }
                ]}
            />
        </div>
    );
};

export default FarDokumentasjonAleneomsorgVeileder;
