import * as React from 'react';
import Block from 'common/components/block/Block';

export interface Props {
    visible?: boolean;
}

const UtsettelseEtterMor: React.FunctionComponent<Props> = ({ visible = false }) => (
    <Block visible={visible}>Skjema med utsettelse etter mor</Block>
);

export default UtsettelseEtterMor;
