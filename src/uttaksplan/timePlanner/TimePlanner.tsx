import * as React from 'react';
import { Period, PeriodType, Suspension } from 'uttaksplan/timePlanner/types';
import Timeline from 'uttaksplan/components/timeline/Timeline';
import UttaksplanIkon, {
    UttaksplanIkonKeys
} from 'uttaksplan/components/uttaksplanIkon/UttaksplanIkon';
import {
    mapPeriodsToTimelineItems,
    sortPeriods,
    insertPeriod
} from 'uttaksplan/timePlanner/timePlannerUtils';
import { Knapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import TimePeriodForm from 'uttaksplan/timePlanner/TimePeriodForm';
import { guid } from 'nav-frontend-js-utils/lib';
import { mockPeriods } from 'uttaksplan/timePlanner/mock';
import UkerOgDager from 'common/components/uker-og-dager/UkerOgDager';
import {
    TimelineItem,
    TimelineItemType
} from 'uttaksplan/components/timeline/types';
import TidsperiodeTekst from 'uttaksplan/components/tidsperiodeTekst/TidsperiodeTekst';

export interface Props {}

export interface State {
    periods: Period[];
    dialogVisible: boolean;
    selectedPeriod?: Period;
}

class TimePlanner extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onSave = this.onSave.bind(this);
        this.onCancelEdit = this.onCancelEdit.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
        this.state = {
            periods: mockPeriods,
            dialogVisible: false
        };
    }
    onSave(period: Period) {
        let periods: Period[] = this.state.periods;
        if (period.id) {
            periods = periods.map((p) => (p.id === period.id ? period : p));
        } else {
            periods.push({ ...period, id: guid() });
        }
        periods.sort(sortPeriods);
        this.setState({
            periods,
            dialogVisible: false,
            selectedPeriod: undefined
        });
    }

    onCancelEdit() {
        this.setState({
            selectedPeriod: undefined,
            dialogVisible: false
        });
    }

    onItemClick(item: TimelineItem) {
        if (item.type === TimelineItemType.event) {
            const period = item.data as Period;
            if (this.state.selectedPeriod === period) {
                this.setState({
                    selectedPeriod: undefined
                });
                return;
            }
            this.setState({ selectedPeriod: period });
        }
    }

    addSuspension() {
        const susp: Suspension = {
            id: guid(),
            type: PeriodType.Suspension,
            range: {
                start: new Date(2018, 8, 10),
                end: new Date(2018, 8, 10)
            }
        };
        const periods = insertPeriod(susp, this.state.periods);
        this.setState({ periods });
    }

    render() {
        const { dialogVisible, periods, selectedPeriod } = this.state;
        return (
            <div className="tidsplan">
                <div className="blokk-l">
                    <Timeline
                        items={mapPeriodsToTimelineItems(
                            periods,
                            selectedPeriod
                        )}
                        durationRenderer={(days) => (
                            <UkerOgDager dager={days} />
                        )}
                        iconRenderer={(icon) => (
                            <UttaksplanIkon ikon={icon as UttaksplanIkonKeys} />
                        )}
                        rangeRenderer={(startDate: Date, endDate: Date) => (
                            <TidsperiodeTekst
                                tidsperiode={{
                                    startdato: startDate,
                                    sluttdato: endDate
                                }}
                                visSluttdato={true}
                                visUkedag={true}
                            />
                        )}
                        onItemClick={(item) => this.onItemClick(item)}
                        formRenderer={(item) => (
                            <TimePeriodForm
                                period={item.data as Period}
                                onSave={(period: Period) => this.onSave(period)}
                                onCancel={() => this.onCancelEdit()}
                            />
                        )}
                        editItem={selectedPeriod}
                    />
                </div>
                <Knapp
                    onClick={() =>
                        this.setState({ dialogVisible: true, selectedPeriod })
                    }>
                    Add
                </Knapp>
                <Knapp onClick={() => this.addSuspension()}>+U</Knapp>
                <hr />
                <Modal
                    isOpen={dialogVisible}
                    contentLabel="Add/edit"
                    onRequestClose={() =>
                        this.setState({ dialogVisible: false })
                    }
                    className="periodeSkjemaDialog">
                    {dialogVisible && (
                        <TimePeriodForm
                            period={selectedPeriod}
                            onSave={(period: Period) => this.onSave(period)}
                            onCancel={() => this.onCancelEdit()}
                        />
                    )}
                </Modal>
            </div>
        );
    }
}
export default TimePlanner;
