import * as React from 'react';
import DocumentTitle from 'react-document-title';
import Applikasjonsside from '../Applikasjonsside';
import Periodeliste from '../../../components/periodeliste/Periodeliste';
import { opprettUttaksperioderToForeldreEttBarn } from '../../../util/uttaksplan/forslag/toForeldreEttBarn';
import { getPermisjonsregler } from '../../../util/uttaksplan/permisjonsregler';

import actions from '../../../redux/actions/søknad/søknadActionCreators';

import { AppState } from '../../../redux/reducers';
import Søknad from '../../../types/s\u00F8knad/S\u00F8knad';
import { connect } from 'react-redux';
import { DispatchProps } from 'common/redux/types';
import { Periodetype, Uttaksperiode, StønadskontoType } from '../../../types/uttaksplan/periodetyper';

interface StateProps {
    søknad: Søknad;
}

const nyPeriode: Uttaksperiode = {
    type: Periodetype.Uttak,
    konto: StønadskontoType.Foreldrepenger,
    tidsperiode: { fom: new Date(), tom: new Date() },
    forelder: 'forelder1'
};

const perioder = opprettUttaksperioderToForeldreEttBarn(new Date(), '100%', 13, 13, getPermisjonsregler());

class Workbench extends React.Component<StateProps & DispatchProps> {
    render() {
        const { dispatch } = this.props;
        return (
            <Applikasjonsside visSpråkvelger={true} margin={false}>
                <DocumentTitle title="Workbench" />
                <Periodeliste perioder={perioder} navnForelder1="Snøhvit" navnForelder2="Hiawatta" />
                <button onClick={() => dispatch(actions.uttaksplanAddPeriode(nyPeriode))}>Legg til</button>
            </Applikasjonsside>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    søknad: state.søknad
});

export default connect(mapStateToProps)(Workbench);
