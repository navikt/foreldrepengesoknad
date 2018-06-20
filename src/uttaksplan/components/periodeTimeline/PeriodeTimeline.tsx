import * as React from 'react';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import Timeline from 'uttaksplan/components/timeline/Timeline';
import { Periode, Dekningsgrad } from 'uttaksplan/types';
import {
    TimelineItem,
    TimelineItemType
} from 'uttaksplan/components/timeline/types';
import UttaksplanIkon, {
    UttaksplanIkonKeys
} from 'uttaksplan/components/uttaksplanIkon/UttaksplanIkon';
import TidsperiodeTekst from 'uttaksplan/components/tidslinje/elementer/TidsperiodeTekst';
import { Uttaksgrunnlag } from 'uttaksplan/types/uttaksgrunnlag';
import {
    mapPeriodeToTimelineEvent,
    sortTimelineItems,
    getTerminMarker,
    getSistePermisjonsdagMarker
} from './periodeTimelineUtils';

import './periodeTimeline.less';
import { isSameDay, isBefore } from 'date-fns';
import { getSistePermisjonsdag } from 'uttaksplan/utils/permisjonUtils';

export interface OwnProps {
    termindato: Date;
    dekningsgrad: Dekningsgrad;
    perioder: Periode[];
    uttaksgrunnlag: Uttaksgrunnlag;
    erBarnetFødt: boolean;
    onPeriodeClick: (periode: Periode) => void;
}

type Props = OwnProps & InjectedIntlProps;

class PeriodeTidslinje extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(item: TimelineItem) {
        if (item.type === TimelineItemType.event) {
            const periode = item.data as Periode;
            this.props.onPeriodeClick(periode);
        }
    }

    render() {
        const {
            termindato,
            dekningsgrad,
            erBarnetFødt,
            perioder,
            uttaksgrunnlag,
            intl
        } = this.props;
        const items = perioder.map((periode) =>
            mapPeriodeToTimelineEvent(periode, intl, uttaksgrunnlag)
        );
        items.push(getTerminMarker(termindato, erBarnetFødt));
        items.sort(sortTimelineItems).map((item, idx, arr) => {
            if (idx > 0) {
                const prevItem = arr[idx];
                if (prevItem.type === TimelineItemType.event) {
                    if (
                        isBefore(item.startDate, prevItem.endDate) ||
                        isSameDay(item.startDate, prevItem.endDate)
                    ) {
                        return {
                            ...item,
                            error: 'Overlappende perioder'
                        };
                    }
                }
            }
            return item;
        });
        const sistePermisjonsdag = getSistePermisjonsdag(
            termindato,
            dekningsgrad,
            perioder,
            uttaksgrunnlag
        );
        if (sistePermisjonsdag) {
            items.push(getSistePermisjonsdagMarker(sistePermisjonsdag));
        }

        return (
            <Timeline
                items={items}
                iconRenderer={(icon) => (
                    <UttaksplanIkon ikon={icon as UttaksplanIkonKeys} />
                )}
                onItemClick={(item: TimelineItem) => {
                    this.handleItemClick(item);
                }}
                durationRenderer={(dager: number) => (
                    <div className="periodeTidslinjeVarighet">
                        <span className="periodeTidslinjeVarighet__wrapper">
                            <span className="periodeTidslinjeVarighet__dager">
                                {dager}
                            </span>{' '}
                            <FormattedMessage
                                id={dager === 1 ? 'common.dag' : 'common.dager'}
                                values={{ dager }}
                            />
                        </span>
                    </div>
                )}
                rangeRenderer={(startdato: Date, sluttdato: Date) => (
                    <TidsperiodeTekst
                        tidsperiode={{
                            startdato,
                            sluttdato
                        }}
                        visSluttdato={true}
                        visUkedag={false}
                    />
                )}
            />
        );
    }
}
export default injectIntl(PeriodeTidslinje);
