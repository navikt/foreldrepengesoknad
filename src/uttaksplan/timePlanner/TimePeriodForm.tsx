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

export interface Props {
    period?: Suspension | Gap | Withdrawal;
    onSave: (period: Suspension | Gap | Withdrawal) => void;
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
        this.state = {};
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
            if (type === PeriodType.Gap) {
                const gap: Gap = { type, startDate, endDate };
                onSave(gap);
            } else if (type === PeriodType.Suspension) {
                const susp: Suspension = {
                    type,
                    startDate,
                    endDate
                };
                onSave(susp);
            } else if (type === PeriodType.Withdrawal) {
                const withdrawal: Withdrawal = {
                    type,
                    startDate,
                    endDate
                };
                onSave(withdrawal);
            }
        }
    }

    render() {
        const { startDate, endDate, type } = this.state;
        return (
            <form
                action="#"
                onSubmit={preventFormSubmit}
                className="utsettelseSkjema dialogContent">
                <h1 className="typo-undertittel m-textCenter blokk-s">
                    TimePeriod
                </h1>
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
                    <Hovedknapp onClick={() => this.save()}>Save</Hovedknapp>
                </Knapperad>
            </form>
        );
    }
}
export default TimePeriodForm;
