import React from 'react';
import VeilederInfo from 'app/components/veilederInfo/VeilederInfo';

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
            <VeilederInfo
                messages={[
                    {
                        type: 'normal',
                        contentIntlKey: 'annenForelder.veileder.aleneOmsorg.forBarnet',
                        values: {
                            navn: annenForelderNavn
                        }
                    }
                ]}
            />
        </div>
    );
};

export default AvtaleAtFarTarUtForeldrepengerVeileder;
