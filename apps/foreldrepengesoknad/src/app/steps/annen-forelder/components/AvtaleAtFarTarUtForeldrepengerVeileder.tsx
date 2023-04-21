import React from 'react';
import { FormattedMessage } from 'react-intl';
import { GuidePanel } from '@navikt/ds-react';

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
            <GuidePanel>
                <FormattedMessage
                    id="annenForelder.veileder.aleneOmsorg.forBarnet"
                    values={{ navn: annenForelderNavn }}
                />
            </GuidePanel>
        </div>
    );
};

export default AvtaleAtFarTarUtForeldrepengerVeileder;
