import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { DispatchProps } from '../../../redux/types';
import Applikasjonsside from '../Applikasjonsside';
import DocumentTitle from 'react-document-title';
import Permisjonsplan from '../../../../uttaksplan/components/permisjonsplan/Permisjonsplan';
import {
    Permisjonsregler,
    Utsettelsesperiode
} from '../../../../uttaksplan/types';
import { Tidslinjeinnslag } from 'uttaksplan/components/tidslinje/types';
import { utsettelseVisDialog } from 'uttaksplan/redux/actions';
import { getPermisjonsregler } from 'uttaksplan/data/permisjonsregler';

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
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { dispatch, form, innslag } = this.props;
        return (
            <Applikasjonsside visSpråkvelger={true}>
                <DocumentTitle title="Uttaksplan" />
                <Permisjonsplan
                    navnForelder1={form.navnForelder1}
                    navnForelder2={form.navnForelder2}
                    permisjonsregler={form.permisjonsregler}
                    fellesperiodeukerForelder1={form.fellesperiodeukerForelder1}
                    fellesperiodeukerForelder2={form.fellesperiodeukerForelder2}
                    innslag={innslag}
                    onRedigerUtsettelse={(u: Utsettelsesperiode) =>
                        dispatch(utsettelseVisDialog(u))
                    }
                    onLeggTilUtsettelse={() => dispatch(utsettelseVisDialog())}
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
