import * as React from 'react';
import { connect } from 'react-redux';

import { UttaksplanAppState } from 'uttaksplan/redux/types';
import { tidslinjeFraPerioder } from 'uttaksplan/selectors/tidslinjeSelector';
import {
    Tidslinjeinnslag,
    TidslinjeinnslagType,
    InnslagPeriodetype,
    InnslagHendelsetype
} from 'uttaksplan/components/tidslinje/types';
import { Utsettelsesperiode, Spraak } from 'uttaksplan/types';
import { DispatchProps } from 'app/redux/types';
import Permisjonsplan from 'uttaksplan/components/permisjonsplan/Permisjonsplan';

export interface StateProps {
    innslag: Tidslinjeinnslag[];
}

interface OwnProps {
    sprak?: Spraak;
}

import '../../styles/uttaksplan.less';
import { getPermisjonsregler } from 'uttaksplan/data/permisjonsregler';
import Timeline from 'uttaksplan/components/timeline/Timeline';
import {
    TimelineEvent,
    TimelineMarker,
    TimelineGap,
    TimelineItem
} from 'uttaksplan/components/timeline/types';

export type Props = OwnProps & StateProps & DispatchProps;

const mapInnslagToEvent = (innslag: InnslagPeriodetype): TimelineEvent => ({
    type: 'event',
    title: 'Periode'
});
const mapInnslagToMarker = (
    innslag: InnslagHendelsetype
): TimelineMarker => ({});
// const mapInnslagToGap = (innslag: InnslagPeriodetype): TimelineGap => ({});

const mapInnslagToTimelineItem = (innslag: Tidslinjeinnslag): TimelineItem => {
    switch (innslag.type) {
        case TidslinjeinnslagType.hendelse:
            return mapInnslagToMarker(innslag);
        case TidslinjeinnslagType.periode:
            return mapInnslagToEvent(innslag);
    }
};

export class Main extends React.Component<Props> {
    render() {
        const { innslag } = this.props;

        return (
            <div>
                <Timeline
                    items={innslag.map((i, idx) => (
                        <div className="timeline__itemWrapper" key={idx}>
                            {mapInnslagToTimelineItem(i)}
                        </div>
                    ))}
                    navnForelder1={'Forelder 1'}
                    navnForelder2={'Forelder 2'}
                />
                <hr />
                <Permisjonsplan
                    navnForelder1={'Forelder 1'}
                    navnForelder2={'Forelder 2'}
                    permisjonsregler={getPermisjonsregler(new Date())}
                    fellesperiodeukerForelder1={23}
                    fellesperiodeukerForelder2={23}
                    innslag={innslag}
                    onRedigerUtsettelse={(u: Utsettelsesperiode) => null}
                    onLeggTilUtsettelse={() => null}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: UttaksplanAppState): StateProps => {
    let innslag: Tidslinjeinnslag[] = [];
    innslag = tidslinjeFraPerioder(state);

    return {
        innslag
    };
};

export default connect(mapStateToProps)(Main);
