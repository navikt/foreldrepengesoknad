import * as React from 'react';
import Datovelger, { Props as DatovelgerProps } from 'nav-datovelger';
import Bolk from '../layout/Bolk';

interface Props extends DatovelgerProps {
    tittel: string;
}

const FødselsdatoBolk: React.StatelessComponent<Props> = (props: Props) => {
    return (
        <Bolk tittel={props.tittel}>
            <Datovelger id={props.id} onChange={props.onChange} />;
        </Bolk>
    );
};
export default FødselsdatoBolk;
