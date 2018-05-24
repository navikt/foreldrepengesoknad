import * as React from 'react';
import { connect } from 'react-redux';
import {
    UttaksplanAppState,
    UtsettelseState,
    UttaksplanFormState
} from 'uttaksplan/redux/types';
import { tidslinjeFraPerioder } from 'uttaksplan/selectors/tidslinjeSelector';
import { Tidslinjeinnslag } from 'uttaksplan/components/tidslinje/types';
import { Tidsperiode, Spraak, Dekningsgrad, Periode } from 'uttaksplan/types';
import { getGyldigTidsromForUtsettelse } from 'uttaksplan/utils/permisjonUtils';
import {
    getSisteRegistrertePermisjonsdag,
    getStonadsperioderOgUtsettelser
} from 'uttaksplan/selectors/periodeSelector';
import { DispatchProps } from 'app/redux/types';
import UtsettelseDialog from 'uttaksplan/components/utsettelseDialog/UtsettelseDialog';
import { getPermisjonsregler } from 'uttaksplan/data/permisjonsregler';

export interface StateProps {
    form: UttaksplanFormState;
    innslag: Tidslinjeinnslag[];
    utsettelse: UtsettelseState;
    visPermisjonsplan: boolean;
    sisteRegistrertePermisjonsdag?: Date;
    statePerioder: Periode[];
}

interface OwnProps {
    sprak?: Spraak;
    navnForelder1: string;
    navnForelder2: string;
    termindato: Date;
    dekningsgrad: Dekningsgrad;
    perioder?: Periode[];
    onLagPerioder: (perioder: Periode[]) => void;
}

import '../../styles/uttaksplan.less';
import { Knapp } from 'nav-frontend-knapper';
import Timeline from 'uttaksplan/components/timeline/Timeline';
import UttaksplanIkon, {
    UttaksplanIkonKeys
} from 'uttaksplan/components/uttaksplan/UttaksplanIkon';
import { TimelineItem } from 'uttaksplan/components/timeline/types';
import Varighet from 'uttaksplan/components/tidslinje/elementer/Varighet';
import TidsperiodeTekst from 'uttaksplan/components/tidslinje/elementer/TidsperiodeTekst';
import { mapInnslagToTimelineItem } from 'uttaksplan/components/uttaksplan/utils';

export type Props = OwnProps & StateProps & DispatchProps;

class UttaksplanEksempelskjema extends React.Component<Props> {
    render() {
        const {
            utsettelse,
            innslag,
            sisteRegistrertePermisjonsdag,
            termindato,
            dekningsgrad,
            perioder,
            statePerioder,
            onLagPerioder
        } = this.props;

        const navnForelder1 = this.props.navnForelder1;
        const navnForelder2 = this.props.navnForelder2;
        const permisjonsregler = getPermisjonsregler(this.props.termindato);

        if (!perioder) {
            return (
                <div className="blokk-m no-print m-textCenter">
                    <Knapp onClick={() => onLagPerioder(statePerioder)}>
                        Vis uttaksplan
                    </Knapp>
                </div>
            );
        }

        const tidsromForUtsettelse: Tidsperiode | undefined =
            termindato && dekningsgrad && sisteRegistrertePermisjonsdag
                ? getGyldigTidsromForUtsettelse(
                      termindato,
                      dekningsgrad,
                      permisjonsregler,
                      sisteRegistrertePermisjonsdag
                  )
                : undefined;

        return (
            <div className="tidsplan">
                <Timeline
                    items={innslag.map((i) => mapInnslagToTimelineItem(i))}
                    navnForelder1={navnForelder1}
                    navnForelder2={navnForelder2}
                    iconRenderer={(icon) => (
                        <UttaksplanIkon ikon={icon as UttaksplanIkonKeys} />
                    )}
                    onItemClick={(item: TimelineItem) => {
                        // console.log(item);
                    }}
                    durationRenderer={(dager: number) => (
                        <Varighet dager={dager} />
                    )}
                    rangeRenderer={(startdato: Date, sluttdato: Date) => (
                        <TidsperiodeTekst
                            tidsperiode={{ startdato, sluttdato }}
                            visSluttdato={true}
                        />
                    )}
                />

                {tidsromForUtsettelse &&
                    termindato && (
                        <div>
                            <UtsettelseDialog
                                isOpen={utsettelse.dialogErApen}
                                navnForelder1={navnForelder1}
                                navnForelder2={navnForelder2}
                                utsettelser={utsettelse.utsettelser}
                                utsettelse={utsettelse.valgtUtsettelse}
                                tidsrom={tidsromForUtsettelse}
                                permisjonsregler={permisjonsregler}
                                termindato={termindato}
                            />
                        </div>
                    )}
            </div>
        );
    }
}

const mapStateToProps = (state: UttaksplanAppState): StateProps => {
    let innslag: Tidslinjeinnslag[] = [];
    innslag = tidslinjeFraPerioder(state);

    return {
        statePerioder: getStonadsperioderOgUtsettelser(state),
        innslag,
        form: state.uttaksplan.uttaksplanForm,
        utsettelse: state.uttaksplan.utsettelse,
        sisteRegistrertePermisjonsdag: getSisteRegistrertePermisjonsdag(state),
        visPermisjonsplan:
            innslag &&
            innslag.length > 0 &&
            state.uttaksplan.uttaksplanForm.dekningsgrad !== undefined &&
            state.uttaksplan.uttaksplanForm.termindato !== undefined &&
            state.uttaksplan.view.visTidslinje === true
    };
};

export default connect(mapStateToProps)(UttaksplanEksempelskjema);
