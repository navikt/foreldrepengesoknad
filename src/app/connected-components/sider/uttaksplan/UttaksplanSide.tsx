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
import {
    mockUttaksplanSøker,
    mockUttasksplanAnnenForelder
} from '../../../dev/mock';
import {
    SøkerRolle,
    Søkersituasjon
} from '../../../types/s\u00F8knad/S\u00F8knad';
import UttaksplanSideSkjema from './UttaksplanSideSkjema';
import { addDays } from 'date-fns';
import TimePlanner from 'uttaksplan/timePlanner/TimePlanner';

export interface StateProps {
    form: {
        navnForelder1: string;
        navnForelder2: string;
        permisjonsregler: Permisjonsregler;
        fellesperiodeukerForelder1: number;
        fellesperiodeukerForelder2: number;
        dato: Date;
    };
    innslag: Tidslinjeinnslag[];
}

export type Props = DispatchProps & StateProps & InjectedIntlProps;

export interface UttaksplamTestSkjemadata {
    antallBarn: string;
    søkerrolle: SøkerRolle;
    søkersituasjon: Søkersituasjon;
    annenForelderSkalHaPermisjon: boolean;
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

const skalAnnenPersonHaPermisjon = (
    skjema: UttaksplamTestSkjemadata
): boolean => {
    if (skjema.fnrFarOppgitt === false || !skjema.farHarRett) {
        return false;
    }
    if (skjema.borSammen === false && skjema.skalMorHaAlt) {
        return false;
    }
    return true;
};

class UttaksplanSide extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            perioder: [],
            skjemadata: {
                antallBarn: '1',
                søkerrolle: SøkerRolle.MOR,
                annenForelderSkalHaPermisjon: true,
                søkersituasjon: Søkersituasjon.FØDSEL,
                erBarnetFødt: false,
                dato: addDays(new Date(), 30),
                fnrFarOppgitt: true,
                farHarRett: true,
                borSammen: true
            }
        };
    }
    render() {
        const skjema = this.state.skjemadata;
        return (
            <Applikasjonsside visSpråkvelger={true}>
                <DocumentTitle title="Uttaksplan" />

                <TimePlanner />

                <div className="dev-only">
                    <UttaksplanSideSkjema
                        erSynlig={true}
                        onChange={(skjemadata: UttaksplamTestSkjemadata) =>
                            this.setState({ skjemadata })
                        }
                        skjemadata={this.state.skjemadata}
                    />
                    <Uttaksplan
                        søker={mockUttaksplanSøker}
                        annenForelder={
                            skalAnnenPersonHaPermisjon(skjema)
                                ? mockUttasksplanAnnenForelder
                                : undefined
                        }
                        termindato={skjema.dato}
                        antallBarn={parseInt(skjema.antallBarn, 10)}
                        erBarnetFødt={false}
                        onChange={(perioder) => this.setState({ perioder })}
                    />
                </div>
            </Applikasjonsside>
        );
    }
}

const mapStateToProps = (state: any): StateProps => {
    const dato = addDays(new Date(), 20);
    return {
        form: {
            navnForelder1: 'Kari',
            navnForelder2: 'Ola',
            fellesperiodeukerForelder1: 12,
            fellesperiodeukerForelder2: 12,
            permisjonsregler: getPermisjonsregler(new Date()),
            dato
        },
        innslag: []
    };
};

export default injectIntl(connect(mapStateToProps)(UttaksplanSide));
