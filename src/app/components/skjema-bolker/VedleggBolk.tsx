import * as React from 'react';
import Bolk from '../layout/Bolk';

interface Props {
    tittel: string;
}

const VedleggBolk: React.StatelessComponent<Props> = (props: Props) => {
    return <Bolk tittel={props.tittel}>vedlegg</Bolk>;
};
export default VedleggBolk;
