import * as React from 'react';
import DocumentTitle from 'react-document-title';
import Søknad from '../../types/søknad/Søknad';
import { Periode, Periodetype } from '../../types/uttaksplan/periodetyper';
import { DispatchProps } from 'common/redux/types';
import Applikasjonsside from '../../connected-components/sider/Applikasjonsside';
import { AppState } from '../../redux/reducers';
import { connect } from 'react-redux';
import søknadActionCreators from '../../redux/actions/søknad/søknadActionCreators';

interface StateProps {
    søknad: Søknad;
}

type Props = StateProps & DispatchProps;

interface State {
    periodetype?: Periodetype;
}

class Workbench extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnSubmit(periode: Periode) {
        const { dispatch } = this.props;
        dispatch(søknadActionCreators.uttaksplanAddPeriode(periode));
    }

    render() {
        return (
            <Applikasjonsside visSpråkvelger={true} margin={false}>
                <DocumentTitle title="Workbench" />
            </Applikasjonsside>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    søknad: state.søknad
});

export default connect(mapStateToProps)(Workbench);
