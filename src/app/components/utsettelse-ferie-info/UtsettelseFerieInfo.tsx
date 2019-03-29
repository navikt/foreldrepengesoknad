import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { getVarighetString } from 'common/util/intlUtils';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veileder from 'common/components/veileder/Veileder';
import VeilederpanelInnhold from '../veilederpanel-innhold/VeilederpanelInnhold';
import uttaksConstants from 'app/constants';

export interface Props {
    feriedager: number;
}

const Ferieinfo: React.StatelessComponent<Props & InjectedIntlProps> = ({ feriedager, intl }) => {
    if (feriedager <= uttaksConstants.MAKS_FERIEDAGER_ETT_ÅR) {
        return (
            <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
                <VeilederpanelInnhold
                    messages={[
                        {
                            type: 'normal',
                            contentIntlKey: 'utsettelseskjema.veiledning.ferie',
                            formatContentAsHTML: true
                        }
                    ]}
                />
            </Veilederpanel>
        );
    }
    const ukerOgDager = getVarighetString(feriedager, intl);
    if (feriedager > uttaksConstants.MAKS_FERIEDAGER_MED_OVERFØRING) {
        return (
            <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
                <VeilederpanelInnhold
                    messages={[
                        {
                            type: 'normal',
                            contentIntlKey: 'utsettelseskjema.ferievarsel.ulovlig',
                            values: { ukerOgDager }
                        }
                    ]}
                />
            </Veilederpanel>
        );
    } else if (feriedager > uttaksConstants.MAKS_FERIEDAGER_ETT_ÅR) {
        return (
            <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
                <VeilederpanelInnhold
                    messages={[
                        {
                            type: 'normal',
                            contentIntlKey: 'utsettelseskjema.ferievarsel.kreveroverforing',
                            values: { ukerOgDager }
                        }
                    ]}
                />
            </Veilederpanel>
        );
    }
    return null;
};

export default injectIntl(Ferieinfo);
