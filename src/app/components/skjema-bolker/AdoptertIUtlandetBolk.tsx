import * as React from 'react';
import Bolk from '../layout/Bolk';

interface Props {
    tittel: string;
}

const AdoptertIUtlandetBolk: React.StatelessComponent<Props> = (
    props: Props
) => {
    return (
        <Bolk
            tittel={props.tittel}
            render={() => <p>AdoptertIUtlandetBolk</p>}
        />
    );
};
export default AdoptertIUtlandetBolk;
