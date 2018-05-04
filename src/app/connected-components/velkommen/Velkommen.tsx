import * as React from 'react';
import { History } from 'history';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Ingress } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';

interface Props {
    history: History;
}

interface State {
    harGodkjentVilkår: boolean;
}

class Velkommen extends React.Component<Props, State> {
    componentWillMount() {
        this.setState({
            harGodkjentVilkår: false
        });
    }

    render() {
        const { harGodkjentVilkår } = this.state;
        const { history } = this.props;

        return (
            <div className="velkommenSide">
                <Ingress>Velkommen til foreldrepengesøknaden</Ingress>
                <BekreftCheckboksPanel
                    checked={harGodkjentVilkår}
                    label="Jeg bekrefter at jeg har lest og forstått mine rettigheter og plikter"
                    onChange={() => {
                        this.setState({
                            harGodkjentVilkår: !harGodkjentVilkår
                        });
                    }}
                />
                <Hovedknapp
                    onClick={() =>
                        harGodkjentVilkår &&
                        history.push('/foreldrepengesoknad/eksempel')
                    }>
                    Gå videre
                </Hovedknapp>
            </div>
        );
    }
}

export default Velkommen;
