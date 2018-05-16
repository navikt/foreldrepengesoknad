import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { DispatchProps } from '../../../redux/types';
import Applikasjonsside from '../Applikasjonsside';
import DocumentTitle from 'react-document-title';
import { Permisjonsregler } from '../../../../uttaksplan/types';
import { Tidslinjeinnslag } from 'uttaksplan/components/tidslinje/types';
import { getPermisjonsregler } from 'uttaksplan/data/permisjonsregler';
import Uttaksplan from 'uttaksplan/components/uttaksplan/Uttaksplan';

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

class UttaksplanSide extends React.Component<Props, {}> {
    render() {
        // const { dispatch, form, innslag } = this.props;
        return (
            <Applikasjonsside visSpråkvelger={true}>
                <DocumentTitle title="Uttaksplan" />
                <Uttaksplan />
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
