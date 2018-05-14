import * as React from 'react';
import Datovelger, { Props as DatovelgerProps } from 'nav-datovelger';
import Bolk from '../components/layout/Bolk';

interface Props extends DatovelgerProps {
    language: string;
}

const DatoBolk: React.StatelessComponent<Props> = (props: Props) => {
    return (
        <Bolk
            tittel="Dato for omsorgsovertakelse"
            render={() => (
                <Datovelger
                    id={props.id}
                    onChange={props.onChange}
                    locale={props.language}
                    inputProps={{ placeholder: 'dd.mm.åååå' }}
                />
            )}
        />
    );
};
export default DatoBolk;
