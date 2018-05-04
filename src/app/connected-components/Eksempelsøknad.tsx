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
    render() {
        const { dispatch, søker } = this.props;
        return (
            <React.Fragment>
                <MedmorBolk
                    checked={søker.rolle}
                    onChange={(
                        e: React.ChangeEvent<HTMLInputElement>,
                        rolle: SøkerRolle
                    ) => dispatch(søknadActions.updateSøker({ rolle }))}
                />
            </React.Fragment>
        );
    }
}

export default connect<Props>((state: any) => ({
    søker: state.søknad.søker
}))(Eksempelsøknad);
