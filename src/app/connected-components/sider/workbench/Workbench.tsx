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
        dagerGjennstående: 10
    },
    {
        konto: StønadskontoType.Mødrekvote,
        dagerGjennstående: 0,
        forelder: 'forelder1'
    },
    {
        konto: StønadskontoType.Fellesperiode,
        dagerGjennstående: 0
    },
    {
        konto: StønadskontoType.Fedrekvote,
        dagerGjennstående: 10,
        forelder: 'forelder2'
    }
];

class Workbench extends React.Component<StateProps & DispatchProps> {
    render() {
        const navn = {
            navnForelder1: 'Amalie',
            navnForelder2: 'Henrik'
        };
        return (
            <Applikasjonsside visSpråkvelger={true} margin={false}>
                <DocumentTitle title="Workbench" />
                <div className="m-gray-block">
                    <div className="blokk-l">
                        <Periodeliste perioder={perioder} {...navn} />
                    </div>
                    <div className="blokk-l">
                        <Uttaksoppsummering uttak={mockUttak} {...navn} />
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
