import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { addYears } from 'date-fns';

import { Row, Column } from 'nav-frontend-grid';
import { Input } from 'nav-frontend-skjema';
import {
    UttaksplanFormState,
    PeriodeState,
    UttaksplanAppState
} from 'uttaksplan/redux/types';
import {
    setNavnForelder1,
    setNavnForelder2,
    setTermindato
} from 'uttaksplan/redux/actions';
import { DispatchProps } from 'common/redux/types';
import { renderDag } from 'uttaksplan/utils/renderUtils';
import DatoInput from 'common/components/dato-input/DatoInput';

import './skjema.less';

export interface StateProps {
    uttaksplanForm: UttaksplanFormState;
    periode: PeriodeState;
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
                                    id: 'uttaksplan.skjema.label.forelder1'
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
                                    id: 'uttaksplan.skjema.label.forelder2'
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
                            id: 'uttaksplan.skjema.label.termindato'
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
            </div>
        );
    }
}

const mapStateToProps = (state: UttaksplanAppState): StateProps => {
    return {
        uttaksplanForm: state.uttaksplan.form,
        periode: state.uttaksplan.periode
    };
};

export default injectIntl(
    connect<StateProps, {}, InjectedIntlProps>(mapStateToProps)(
        UttaksplanSkjema
    )
);
