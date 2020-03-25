import React from 'react';
import VeilederInfo from 'app/components/veilederInfo/VeilederInfo';

import './annenForelderVeileder.less';

interface Props {
    visible: boolean;
    annenForelderNavn: string;
}

const MåOrientereAnnenForelderVeileder: React.FunctionComponent<Props> = ({ visible, annenForelderNavn }) => {
    if (!visible) {
        return null;
    }

    return (
        <div className="annenForelderVeileder">
            <VeilederInfo
                messages={[
                    {
                        type: 'normal',
                        contentIntlKey: 'erAnnenForelderInformert.veilederIkkeInformert',
                        values: { navn: annenForelderNavn }
                    }
                ]}
            />
        </div>
    );
};

export default MåOrientereAnnenForelderVeileder;
