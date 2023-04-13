import React from 'react';
import { FormattedMessage } from 'react-intl';

import './annenForelderVeileder.less';
import { GuidePanel } from '@navikt/ds-react';

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
            <GuidePanel>
                <FormattedMessage
                    id="annenForelder.erAnnenForelderInformert.veileder"
                    values={{ navn: annenForelderNavn }}
                />
            </GuidePanel>
        </div>
    );
};

export default MåOrientereAnnenForelderVeileder;
