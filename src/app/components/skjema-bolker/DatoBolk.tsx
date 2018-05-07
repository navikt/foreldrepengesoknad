import * as React from 'react';
import Datovelger, { Props as DatovelgerProps } from 'nav-datovelger';
import Bolk from '../layout/Bolk';

interface Props extends DatovelgerProps {
    tittel: string;
}

const DatoBolk: React.StatelessComponent<Props> = (props: Props) => {
    return (
        <Bolk
            tittel={props.tittel}
            render={() => (
                <Datovelger id={props.id} onChange={props.onChange} />
            )}
        />
    );
};
export default DatoBolk;
