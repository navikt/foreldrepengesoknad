import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import { getVarighetString } from 'common/util/intlUtils';
import uttaksConstants from 'app/constants';
import VeilederInfo from 'app/components/veilederInfo/VeilederInfo';

export interface Props {
    feriedager: number;
    intl: IntlShape;
}

const Ferieinfo: React.StatelessComponent<Props> = ({ feriedager, intl }) => {
    if (feriedager <= uttaksConstants.MAKS_FERIEDAGER_ETT_ÅR) {
        return (
            <VeilederInfo
                messages={[
                    {
                        type: 'normal',
                        contentIntlKey: 'utsettelseskjema.veiledning.ferie'
                    }
                ]}
            />
        );
    }
    const ukerOgDager = getVarighetString(feriedager, intl);
    if (
        feriedager > uttaksConstants.MAKS_FERIEDAGER_ETT_ÅR &&
        feriedager < uttaksConstants.MAKS_FERIEDAGER_MED_OVERFØRING
    ) {
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
