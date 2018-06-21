import * as React from 'react';
import { Period } from 'uttaksplan/timePlanner/types';
import Timeline from 'uttaksplan/components/timeline/Timeline';
import TidsperiodeTekst from 'uttaksplan/components/tidslinje/elementer/TidsperiodeTekst';
import UttaksplanIkon, {
    UttaksplanIkonKeys
} from 'uttaksplan/components/uttaksplanIkon/UttaksplanIkon';
import { mapPeriodsToTimelineItems } from 'uttaksplan/timePlanner/timePlannerUtils';
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

export interface Props {}

export interface State {
    periods: Period[];
    dialogVisible: boolean;
    formPeriod?: Period;
}

class TimePlanner extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            periods: mockPeriods,
            dialogVisible: false
        };
    }
    onSave(period: Period) {
        const periods: Period[] = this.state.periods;
        if (period.id) {
            periods.map((p) => (p.id === period.id ? period : p));
        } else {
            periods.push({ ...period, id: guid() });
        }
        this.setState({ periods });
    }
    onItemClick(item: TimelineItem) {
        if (item.type === TimelineItemType.event) {
            const period = item.data as Period;
            this.setState({ formPeriod: period });
        }
    }
    render() {
        const { dialogVisible, periods, formPeriod } = this.state;
        return (
            <div className="tidsplan">
                <div className="blokk-l">
                    <Timeline
                        items={mapPeriodsToTimelineItems(periods)}
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
                                visUkedag={false}
                            />
                        )}
                        onItemClick={(item) => this.onItemClick(item)}
                        formRenderer={(item) => <div>EditForm</div>}
                    />
                </div>
                <Knapp
                    onClick={() =>
                        this.setState({ dialogVisible: true, formPeriod })
                    }>
                    Add
                </Knapp>
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
                            period={formPeriod}
                            onSave={(period: Period) => this.onSave(period)}
                        />
                    )}
                </Modal>
            </div>
        );
    }
}
export default TimePlanner;
