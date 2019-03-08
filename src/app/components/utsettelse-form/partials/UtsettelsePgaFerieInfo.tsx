import * as React from 'react';
import UtsettelseFerieInfo from '../../utsettelse-ferie-info/UtsettelseFerieInfo';
import { getPermisjonsregler } from '../../../util/uttaksplan/permisjonsregler';
import { Forelder } from 'common/types';
import Block from 'common/components/block/Block';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veileder from 'common/components/veileder/Veileder';
import VeilederpanelInnhold from 'app/components/veilederpanel-innhold/VeilederpanelInnhold';

export interface Props {
    antallFeriedager: number;
    forelder: Forelder;
    aktivtArbeidsforhold: boolean;
}

class UtsettelsePgaFerieInfo extends React.Component<Props, {}> {
    render() {
        const { antallFeriedager, aktivtArbeidsforhold } = this.props;

        if (!aktivtArbeidsforhold) {
            return (
                <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
                    <VeilederpanelInnhold
                        messages={[
                            {
                                type: 'normal',
                                contentIntlKey: 'utsettelseskjema.ferie.utenArbeidsforhold'
                            }
                        ]}
                    />
                </Veilederpanel>
            );
        }

        return antallFeriedager !== undefined ? (
            <Block margin="s">
                <UtsettelseFerieInfo feriedager={antallFeriedager} permisjonsregler={getPermisjonsregler()} />
            </Block>
        ) : null;
    }
}
export default UtsettelsePgaFerieInfo;
