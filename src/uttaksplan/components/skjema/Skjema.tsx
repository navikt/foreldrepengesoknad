import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { addYears } from 'date-fns';

import { Row, Column } from 'nav-frontend-grid';
import { Input } from 'nav-frontend-skjema';
import {
    UttaksplanFormState,
    UtsettelseState,
    UttaksplanAppState
} from 'uttaksplan/redux/types';
import {
    setNavnForelder1,
    setNavnForelder2,
    setTermindato,
    setDekningsgrad,
    settAntallDagerMor
} from 'uttaksplan/redux/actions';
import { DispatchProps } from 'app/redux/types';
import { renderDag } from 'uttaksplan/utils/renderUtils';
import EkspanderbartInnhold from 'uttaksplan/elements/ekspanderbartInnhold/EkspanderbartInnhold';
import DatoInput from 'app/components/dato-input/DatoInput';
import SkjemaDekningsgrad from 'uttaksplan/components/skjema/SkjemaDekningsgrad';
import SkjemaFordelingFellesperiode from 'uttaksplan/components/skjema/SkjemaFordelingFellesperiode';
import AktivitetskravInfo from 'uttaksplan/components/content/AktivitetskravInfo';

import './skjema.less';

export interface StateProps {
    uttaksplanForm: UttaksplanFormState;
    utsettelse: UtsettelseState;
}

type Props = StateProps & DispatchProps & InjectedIntlProps;

class UttaksplanSkjema extends React.Component<Props> {
    render() {
        const { dispatch, intl, uttaksplanForm } = this.props;

        return (
            <div>
                <div className="blokk-s">
                    <Row>
                        <Column xs="6">
                            <Input
                                name="navnforelder1"
                                label={intl.formatMessage({
                                    id: 'skjema.label.forelder1'
                                })}
                                value={uttaksplanForm.navnForelder1 || ''}
                                placeholder="Navn"
                                onChange={(e: any) =>
                                    dispatch(setNavnForelder1(e.target.value))
                                }
                            />
                        </Column>
                        <Column xs="6">
                            <Input
                                name="navnforelder2"
                                label={intl.formatMessage({
                                    id: 'skjema.label.forelder2'
                                })}
                                value={uttaksplanForm.navnForelder2 || ''}
                                placeholder="Navn"
                                onChange={(e: any) =>
                                    dispatch(setNavnForelder2(e.target.value))
                                }
                            />
                        </Column>
                    </Row>
                </div>
                <div className="blokk-m">
                    <DatoInput
                        id="input-termindato"
                        dato={uttaksplanForm.termindato}
                        label={intl.formatMessage({
                            id: 'skjema.label.termindato'
                        })}
                        onChange={(dato: Date) => dispatch(setTermindato(dato))}
                        avgrensninger={{
                            minDato: addYears(new Date(), -1),
                            maksDato: addYears(new Date(), 2)
                        }}
                        feil={
                            uttaksplanForm.termindatoErUgyldig
                                ? {
                                      feilmelding: intl.formatMessage({
                                          id:
                                              'skjema.feilmelding.ugyldig_termindato'
                                      })
                                  }
                                : undefined
                        }
                        dayPickerProps={{
                            renderDay: renderDag
                        }}
                    />
                </div>
                <EkspanderbartInnhold
                    erApen={uttaksplanForm.termindato !== undefined}
                    animert={false}>
                    <div className="blokk-m">
                        <SkjemaDekningsgrad
                            dekningsgrad={uttaksplanForm.dekningsgrad}
                            antallUkerTotalt80={
                                uttaksplanForm.permisjonsregler
                                    .antallUkerTotalt80
                            }
                            antallUkerTotalt100={
                                uttaksplanForm.permisjonsregler
                                    .antallUkerTotalt100
                            }
                            permisjonsregler={uttaksplanForm.permisjonsregler}
                            onChange={(dekningsgrad) =>
                                dispatch(setDekningsgrad(dekningsgrad))
                            }
                        />
                    </div>
                </EkspanderbartInnhold>

                <EkspanderbartInnhold
                    animert={false}
                    erApen={
                        uttaksplanForm.dekningsgrad &&
                        uttaksplanForm.termindato !== undefined
                    }>
                    <div className="blokk-s">
                        <SkjemaFordelingFellesperiode
                            navnForelder1={uttaksplanForm.navnForelder1}
                            navnForelder2={uttaksplanForm.navnForelder2}
                            ukerFellesperiode={uttaksplanForm.ukerFellesperiode}
                            ukerForelder1={
                                uttaksplanForm.fellesperiodeukerForelder1
                            }
                            onChange={(uker) =>
                                dispatch(settAntallDagerMor(uker))
                            }
                            introRenderer={() => (
                                <AktivitetskravInfo
                                    permisjonsregler={
                                        uttaksplanForm.permisjonsregler
                                    }
                                    navnForelder1={uttaksplanForm.navnForelder1}
                                    navnForelder2={uttaksplanForm.navnForelder2}
                                />
                            )}
                        />
                    </div>
                </EkspanderbartInnhold>
            </div>
        );
    }
}

const mapStateToProps = (state: UttaksplanAppState): StateProps => {
    return {
        uttaksplanForm: state.uttaksplan.uttaksplanForm,
        utsettelse: state.uttaksplan.utsettelse
    };
};

export default injectIntl(
    connect<StateProps, {}, InjectedIntlProps>(mapStateToProps)(
        UttaksplanSkjema
    )
);
