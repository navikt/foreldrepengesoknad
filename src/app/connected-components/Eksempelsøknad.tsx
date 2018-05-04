import * as React from 'react';
import { connect } from 'react-redux';
import MedmorBolk from '../skjemabolker/MedmorBolk';
import { Søker, SøkerRolle } from '../types/søknad/Søknad';
import { DispatchProps } from '../redux/types/index';
import søknadActions from './../redux/actions/søknad/søknadActionCreators';

interface Props {
    søker: Søker;
}

class Eksempelsøknad extends React.Component<Props & DispatchProps> {
    componentWillMount() {
        this.updateSøkerrolle = this.updateSøkerrolle.bind(this);
    }

    updateSøkerrolle(rolle: SøkerRolle) {
        const { dispatch } = this.props;
        dispatch(søknadActions.updateSøker({ rolle }));
    }

    render() {
        const { søker } = this.props;
        return (
            <React.Fragment>
                <MedmorBolk
                    checked={søker.rolle}
                    onChange={(
                        e: React.ChangeEvent<HTMLInputElement>,
                        rolleValue: SøkerRolle
                    ) => this.updateSøkerrolle(rolleValue)}
                />
            </React.Fragment>
        );
    }
}

export default connect<Props>((state: any) => ({
    søker: state.søknad.søker
}))(Eksempelsøknad);
