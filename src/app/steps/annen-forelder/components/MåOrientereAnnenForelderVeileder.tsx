import React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { FormattedMessage } from 'react-intl';

import './annenForelderVeileder.less';
import VeilederNormal from 'app/assets/VeilederNormal';

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
            <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                <FormattedMessage
                    id="erAnnenForelderInformert.veilederIkkeInformert"
                    values={{ navn: annenForelderNavn }}
                />
            </Veilederpanel>
        </div>
    );
};

export default MåOrientereAnnenForelderVeileder;
