import * as React from 'react';
import UtsettelseFerieInfo from './utsettelseFerieInfo/UtsettelseFerieInfo';
import { Forelder } from 'common/types';
import Block from 'common/components/block/Block';
import VeilederInfo from 'app/components/veilederInfo/VeilederInfo';

export interface Props {
    antallFeriedager: number;
    forelder: Forelder;
    aktivtArbeidsforhold: boolean;
}

class UtsettelsePgaFerieInfo extends React.Component<Props> {
    render() {
        const { antallFeriedager, aktivtArbeidsforhold } = this.props;

        if (!aktivtArbeidsforhold) {
            return (
                <VeilederInfo
                    messages={[
                        {
                            type: 'normal',
                            contentIntlKey: 'utsettelseskjema.ferie.utenArbeidsforhold',
                        },
                    ]}
                />
            );
        }

        return antallFeriedager !== undefined ? (
            <Block margin="s">
                <UtsettelseFerieInfo feriedager={antallFeriedager} />
            </Block>
        ) : null;
    }
}
export default UtsettelsePgaFerieInfo;
