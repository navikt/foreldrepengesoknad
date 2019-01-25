import * as React from 'react';
import UtsettelseFerieInfo from '../../utsettelse-ferie-info/UtsettelseFerieInfo';
import { getPermisjonsregler } from '../../../util/uttaksplan/permisjonsregler';
import { Forelder } from 'common/types';
import Block from 'common/components/block/Block';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { FormattedMessage } from 'react-intl';

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
                <Veilederinfo>
                    <FormattedMessage id="utsettelseskjema.ferie.utenArbeidsforhold" />
                </Veilederinfo>
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
