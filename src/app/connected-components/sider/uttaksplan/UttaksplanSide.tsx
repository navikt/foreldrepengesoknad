import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { DispatchProps } from 'common/redux/types';
import Applikasjonsside from '../Applikasjonsside';
import DocumentTitle from 'react-document-title';
import { Permisjonsregler, Periode } from '../../../../uttaksplan/types';
import { getPermisjonsregler } from 'uttaksplan/data/permisjonsregler';
import Uttaksplan from 'uttaksplan/main/UttaksplanMain';
import {
    mockUttaksplanSøker,
    mockUttasksplanAnnenForelder
} from '../../../dev/uttaksplanMock';
import { SøkerRolle, Søkersituasjon } from '../../../types/søknad/Søknad';
import DevUttaksplanSideSkjema from './DevUttaksplanSideSkjema';
import { addDays } from 'date-fns';
import { UttaksplanAppState } from 'uttaksplan/redux/types';
import { AnnenForelderGrunnlag } from 'uttaksplan/types/uttaksgrunnlag';

export interface StateProps {
    form: {
        navnForelder1: string;
        navnForelder2: string;
        permisjonsregler: Permisjonsregler;
        fellesperiodeukerForelder1: number;
        fellesperiodeukerForelder2: number;
        dato: Date;
    };
}

export type Props = DispatchProps & StateProps & InjectedIntlProps;

export interface UttaksplamTestSkjemadata {
    antallBarn: string;
    søkerrolle: SøkerRolle;
    søkersituasjon: Søkersituasjon;
    erBarnetFødt: boolean;
    dato: Date;
    fnrFarOppgitt?: boolean;
    farHarRett?: boolean;
    borSammen?: boolean;
    aleneomsorg?: boolean;
    skalMorHaAlt?: boolean;
}
export interface State {
    perioder: Periode[];
    skjemadata: UttaksplamTestSkjemadata;
}

const getAnnenForelder = (
    skjema: UttaksplamTestSkjemadata
): AnnenForelderGrunnlag | undefined => {
    if (skjema.fnrFarOppgitt === false || !skjema.farHarRett) {
        return undefined;
    }
    if (skjema.borSammen === false && skjema.skalMorHaAlt) {
        return undefined;
    }
    return mockUttasksplanAnnenForelder;
};

class UttaksplanSide extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            perioder: [],
            skjemadata: {
                antallBarn: '1',
                søkerrolle: SøkerRolle.MOR,
                søkersituasjon: Søkersituasjon.FØDSEL,
                erBarnetFødt: false,
                dato: addDays(new Date(), 30),
                fnrFarOppgitt: true,
                farHarRett: true,
                borSammen: true,
                aleneomsorg: mockUttaksplanSøker.erAleneOmOmsorg
            }
        };
    }
    render() {
        const skjema = this.state.skjemadata;
        const annenForelder = getAnnenForelder(skjema);
        return (
            <Applikasjonsside visSpråkvelger={true}>
                <DocumentTitle title="Uttaksplan" />

                <div className="dev-only">
                    <DevUttaksplanSideSkjema
                        onChange={(skjemadata: UttaksplamTestSkjemadata) =>
                            this.setState({ skjemadata })
                        }
                        skjemadata={this.state.skjemadata}
                    />
                </div>
                <Uttaksplan
                    grunnlag={{
                        søker: {
                            ...mockUttaksplanSøker
                        },
                        erDeltPermisjon: annenForelder !== undefined,
                        annenForelder,
                        termindato: skjema.dato,
                        antallBarn: parseInt(skjema.antallBarn, 10),
                        erBarnetFødt: false
                    }}
                    onChange={(perioder) => this.setState({ perioder })}
                />
            </Applikasjonsside>
        );
    }
}

const mapStateToProps = (state: UttaksplanAppState): StateProps => {
    const dato = addDays(new Date(), 20);
    return {
        form: {
            navnForelder1: 'Kari',
            navnForelder2: 'Ola',
            fellesperiodeukerForelder1:
                state.uttaksplan.form.fellesperiodeukerForelder1,
            fellesperiodeukerForelder2:
                state.uttaksplan.form.fellesperiodeukerForelder2,
            permisjonsregler: getPermisjonsregler(new Date()),
            dato
        }
    };
};

export default injectIntl(connect(mapStateToProps)(UttaksplanSide));
