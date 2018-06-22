import * as React from 'react';
import {
    PeriodType,
    Suspension,
    Withdrawal,
    Gap
} from 'uttaksplan/timePlanner/types';
import TidsperiodeSpørsmål from 'uttaksplan/skjema/sp\u00F8rsm\u00E5l/TidsperiodeSp\u00F8rsm\u00E5l';
import Radioliste from 'uttaksplan/components/radioliste/Radioliste';
import { preventFormSubmit } from 'common/util/eventUtils';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import Lukknapp from 'nav-frontend-lukknapp';

import './timePeriodForm.less';

export interface Props {
    period?: Suspension | Gap | Withdrawal;
    onSave: (period: Suspension | Gap | Withdrawal) => void;
    onCancel: () => void;
}

interface State {
    type?: PeriodType;
    startDate?: Date;
    endDate?: Date;
}

class TimePeriodForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.updateState = this.updateState.bind(this);
        this.save = this.save.bind(this);
        this.state = props.period
            ? {
                  type: props.period.type,
                  startDate: props.period.range.end,
                  endDate: props.period.range.end
              }
            : {};
    }

    updateState(period: Partial<State>) {
        this.setState({
            ...period
        });
    }

    save() {
        const { type, startDate, endDate } = this.state;
        const { onSave } = this.props;
        if (type && startDate && endDate) {
            const id = this.props.period ? this.props.period.id : undefined;
            if (type === PeriodType.Gap) {
                const gap: Gap = {
                    id,
                    type,
                    range: {
                        start: startDate,
                        end: endDate
                    }
                };
                onSave(gap);
            } else if (type === PeriodType.Suspension) {
                const susp: Suspension = {
                    id,
                    type,
                    range: {
                        start: startDate,
                        end: endDate
                    }
                };
                onSave(susp);
            } else if (type === PeriodType.Withdrawal) {
                const withdrawal: Withdrawal = {
                    id,
                    type,
                    range: {
                        start: startDate,
                        end: endDate
                    }
                };
                onSave(withdrawal);
            }
        }
    }

    render() {
        const { startDate, endDate, type } = this.state;
        return (
            <form
                onClick={(evt) => evt.stopPropagation()}
                action="#"
                onSubmit={(evt) => preventFormSubmit(evt)}
                className="timePeriodForm">
                <div className="timePeriodForm__header">
                    <Systemtittel className="blokk-s">Edit period</Systemtittel>
                    <div className="timePeriodForm__cancel">
                        <Lukknapp
                            onClick={() => this.props.onCancel()}
                            ariaLabel="Lukk skjema"
                        />
                    </div>
                </div>
                <div className="blokk-m">
                    <Radioliste
                        kolonner="2"
                        inputnavn="type"
                        tittel="Type"
                        valg={[
                            {
                                tittel: 'Withdrawal',
                                verdi: PeriodType.Withdrawal
                            },
                            {
                                tittel: 'Suspension',
                                verdi: PeriodType.Suspension
                            }
                        ]}
                        valgtVerdi={type}
                        onChange={(pt: PeriodType) =>
                            this.updateState({ type: pt })
                        }
                    />
                </div>

                <TidsperiodeSpørsmål
                    startdato={{
                        dato: startDate,
                        label: 'Starts on',

                        onChange: (date) =>
                            this.updateState({ startDate: date })
                    }}
                    sluttdato={{
                        dato: endDate,
                        label: 'Ends on',

                        onChange: (date) => this.updateState({ endDate: date })
                    }}
                    visBeholdVarighet={false}
                    helgedagerIkkeTillatt={true}
                />
                <Knapperad>
                    <Hovedknapp htmlType="button" onClick={() => this.save()}>
                        Save
                    </Hovedknapp>
                </Knapperad>
            </form>
        );
    }
}
export default TimePeriodForm;
