import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { DispatchProps } from 'common/redux/types';
import Applikasjonsside from '../Applikasjonsside';
import DocumentTitle from 'react-document-title';
import { Permisjonsregler, Periode } from '../../../../uttaksplan/types';
import { Tidslinjeinnslag } from 'uttaksplan/components/tidslinje/types';
import { getPermisjonsregler } from 'uttaksplan/data/permisjonsregler';
import Uttaksplan from 'uttaksplan/main/UttaksplanMain';
import { Kjønn } from '../../../types/common';

export interface StateProps {
    form: {
        navnForelder1: string;
        navnForelder2: string;
        permisjonsregler: Permisjonsregler;
        fellesperiodeukerForelder1: number;
        fellesperiodeukerForelder2: number;
    };
    innslag: Tidslinjeinnslag[];
}

export type Props = DispatchProps & StateProps & InjectedIntlProps;

export interface State {
    perioder: Periode[];
}

class UttaksplanSide extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            perioder: []
        };
    }
    render() {
        return (
            <Applikasjonsside visSpråkvelger={true}>
                <DocumentTitle title="Uttaksplan" />
                <Uttaksplan
                    forelder1={{
                        fornavn: 'Amalie',
                        erMyndig: true,
                        fnr: '1234123412',
                        mellomnavn: '',
                        etternavn: 'Skraam',
                        adresse: 'Drammensveien 2',
                        kjønn: Kjønn.KVINNE,
                        fødselsdato: new Date(1998, 1, 16).toDateString(),
                        ikkeNordiskEøsLand: false
                    }}
                    annenForelder={{
                        fnr: '1234123433',
                        navn: 'Henrik Ibsen',
                        utenlandskFnr: false,
                        bostedsland: 'NO',
                        erForSyk: false,
                        erInformertOmSøknaden: false,
                        erUfør: false,
                        harRettPåForeldrepenger: true,
                        skalHaForeldrepenger: true,
                        kanIkkeOppgis: false
                    }}
                    termindato={new Date()}
                    perioder={this.state.perioder}
                    onChange={(perioder) => this.setState({ perioder })}
                />
            </Applikasjonsside>
        );
    }
}

const mapStateToProps = (state: any): StateProps => {
    return {
        form: {
            navnForelder1: 'Kari',
            navnForelder2: 'Ola',
            fellesperiodeukerForelder1: 12,
            fellesperiodeukerForelder2: 12,
            permisjonsregler: getPermisjonsregler(new Date())
        },
        innslag: []
    };
};

export default injectIntl(connect(mapStateToProps)(UttaksplanSide));
