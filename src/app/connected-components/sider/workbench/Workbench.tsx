import * as React from 'react';
import DocumentTitle from 'react-document-title';
import Applikasjonsside from '../Applikasjonsside';
import Periodeliste from '../../../components/periodeliste/Periodeliste';
import { opprettUttaksperioderToForeldreEttBarn } from '../../../util/uttaksplan/forslag/toForeldreEttBarn';
import { getPermisjonsregler } from '../../../util/uttaksplan/permisjonsregler';

import { AppState } from '../../../redux/reducers';
import Søknad from '../../../types/s\u00F8knad/S\u00F8knad';
import { connect } from 'react-redux';
import { DispatchProps } from 'common/redux/types';
import { StønadskontoType } from '../../../types/uttaksplan/periodetyper';
import Uttaksoppsummering, { Stønadskontouttak } from '../../../components/uttaksoppsummering/Uttaksoppsummering';

interface StateProps {
    søknad: Søknad;
}

const perioder = opprettUttaksperioderToForeldreEttBarn(new Date(), '100%', 13, 13, getPermisjonsregler());

const mockUttak: Stønadskontouttak[] = [
    {
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        dager: 10
    },
    {
        konto: StønadskontoType.Mødrekvote,
        dager: 0
    },
    {
        konto: StønadskontoType.Fellesperiode,
        dager: 0
    },
    {
        konto: StønadskontoType.Fedrekvote,
        dager: 10
    },
    {
        konto: StønadskontoType.Foreldrepenger,
        dager: -7
    }
];

class Workbench extends React.Component<StateProps & DispatchProps> {
    render() {
        return (
            <Applikasjonsside visSpråkvelger={true} margin={false}>
                <DocumentTitle title="Workbench" />
                <div className="m-gray-block">
                    <div className="blokk-l">
                        <Periodeliste perioder={perioder} navnForelder1="Snøhvit" navnForelder2="Hiawatta" />
                    </div>
                    <div className="blokk-l">
                        <Uttaksoppsummering uttak={mockUttak} />
                    </div>
                </div>
            </Applikasjonsside>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    søknad: state.søknad
});

export default connect(mapStateToProps)(Workbench);
