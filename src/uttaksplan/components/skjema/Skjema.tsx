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

export interface StateProps {
    form: UttaksplanFormState;
    utsettelse: UtsettelseState;
}

type Props = StateProps & DispatchProps & InjectedIntlProps;

class Skjema extends React.Component<Props> {
    render() {
        const { dispatch, intl, form } = this.props;

        return (
            <div className="planlegger-skjema">
                <div className="blokk-s">
                    <Row>
                        <Column xs="6">
                            <Input
                                name="navnforelder1"
                                label={intl.formatMessage({
                                    id: 'skjema.label.forelder1'
                                })}
                                value={form.navnForelder1 || ''}
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
                                value={form.navnForelder2 || ''}
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
                        dato={form.termindato}
                        label={intl.formatMessage({
                            id: 'skjema.label.termindato'
                        })}
                        onChange={(dato: Date) => dispatch(setTermindato(dato))}
                        avgrensninger={{
                            minDato: addYears(new Date(), -1),
                            maksDato: addYears(new Date(), 2)
                        }}
                        feil={
                            form.termindatoErUgyldig
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
                    erApen={form.termindato !== undefined}
                    animert={false}>
                    <div className="blokk-m">
                        <SkjemaDekningsgrad
                            dekningsgrad={form.dekningsgrad}
                            antallUkerTotalt80={
                                form.permisjonsregler.antallUkerTotalt80
                            }
                            antallUkerTotalt100={
                                form.permisjonsregler.antallUkerTotalt100
                            }
                            permisjonsregler={form.permisjonsregler}
                            onChange={(dekningsgrad) =>
                                dispatch(setDekningsgrad(dekningsgrad))
                            }
                        />
                    </div>
                </EkspanderbartInnhold>

                <EkspanderbartInnhold
                    animert={false}
                    erApen={form.dekningsgrad && form.termindato !== undefined}>
                    <div className="blokk-s">
                        <SkjemaFordelingFellesperiode
                            navnForelder1={form.navnForelder1}
                            navnForelder2={form.navnForelder2}
                            ukerFellesperiode={form.ukerFellesperiode}
                            ukerForelder1={form.fellesperiodeukerForelder1}
                            onChange={(uker) =>
                                dispatch(settAntallDagerMor(uker))
                            }
                            introRenderer={() => (
                                <AktivitetskravInfo
                                    permisjonsregler={form.permisjonsregler}
                                    navnForelder1={form.navnForelder1}
                                    navnForelder2={form.navnForelder2}
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
        form: state.uttaksplan.form,
        utsettelse: state.uttaksplan.utsettelse
    };
};

export default injectIntl(
    connect<StateProps, {}, InjectedIntlProps>(mapStateToProps)(Skjema)
);
