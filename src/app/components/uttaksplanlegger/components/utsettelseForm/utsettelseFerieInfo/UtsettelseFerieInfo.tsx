import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { getVarighetString } from 'common/util/intlUtils';
import uttaksConstants from 'app/constants';
import VeilederInfo from 'app/components/veilederInfo/VeilederInfo';

export interface Props {
    feriedager: number;
}

const Ferieinfo: React.StatelessComponent<Props & InjectedIntlProps> = ({ feriedager, intl }) => {
    if (feriedager <= uttaksConstants.MAKS_FERIEDAGER_ETT_ÅR) {
        return (
            <VeilederInfo
                messages={[
                    {
                        type: 'normal',
                        contentIntlKey: 'utsettelseskjema.veiledning.ferie',
                        formatContentAsHTML: true
                    }
                ]}
            />
        );
    }
    const ukerOgDager = getVarighetString(feriedager, intl);
    if (feriedager > uttaksConstants.MAKS_FERIEDAGER_MED_OVERFØRING) {
        return (
            <VeilederInfo
                messages={[
                    {
                        type: 'normal',
                        contentIntlKey: 'utsettelseskjema.ferievarsel.ulovlig',
                        values: { ukerOgDager }
                    }
                ]}
            />
        );
    } else if (feriedager > uttaksConstants.MAKS_FERIEDAGER_ETT_ÅR) {
        return (
            <VeilederInfo
                messages={[
                    {
                        type: 'normal',
                        contentIntlKey: 'utsettelseskjema.ferievarsel.kreveroverforing',
                        values: { ukerOgDager }
                    }
                ]}
            />
        );
    }
    return null;
};

export default injectIntl(Ferieinfo);
