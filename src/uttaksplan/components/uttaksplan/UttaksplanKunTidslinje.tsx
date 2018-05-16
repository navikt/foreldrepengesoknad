import * as React from 'react';
import { connect } from 'react-redux';
import {
    UttaksplanAppState,
    UtsettelseState,
    UttaksplanFormState
} from 'uttaksplan/redux/types';
import { tidslinjeFraPerioder } from 'uttaksplan/selectors/tidslinjeSelector';
import {
    Tidslinjeinnslag,
    TidslinjeinnslagType,
    InnslagPeriodetype,
    InnslagHendelsetype
} from 'uttaksplan/components/tidslinje/types';
import {
    Utsettelsesperiode,
    Tidsperiode,
    Periodetype,
    StonadskontoType,
    Spraak,
    Forelder
} from 'uttaksplan/types';
import { getGyldigTidsromForUtsettelse } from 'uttaksplan/utils/permisjonUtils';
import TidslinjeAktivitetskravInfo from 'uttaksplan/components/content/TidslinjeAktivitetskravInfo';
import { getSisteRegistrertePermisjonsdag } from 'uttaksplan/selectors/periodeSelector';
import { DispatchProps } from 'app/redux/types';
import Permisjonsplan from 'uttaksplan/components/permisjonsplan/Permisjonsplan';
import UtsettelseDialog from 'uttaksplan/components/utsettelseDialog/UtsettelseDialog';

export interface StateProps {
    form: UttaksplanFormState;
    innslag: Tidslinjeinnslag[];
    utsettelse: UtsettelseState;
    visPermisjonsplan: boolean;
    sisteRegistrertePermisjonsdag?: Date;
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
    TimelineItem
} from 'uttaksplan/components/timeline/types';
import { getAntallUttaksdagerITidsperiode } from 'uttaksplan/utils/uttaksdagerUtils';
import { TimelineItemColor } from 'uttaksplan/components/timeline/items/TimelineItem';
import { utsettelseVisDialog } from 'uttaksplan/redux/actions';

export type Props = OwnProps & StateProps & DispatchProps;

const mapForelderTilInnslagfarge = (forelder: Forelder): TimelineItemColor =>
    forelder === 'forelder1' ? 'blue' : 'purple';

const mapInnslagToEvent = (innslag: InnslagPeriodetype): TimelineEvent => ({
    type: 'event',
    title:
        innslag.periode.type === Periodetype.Stonadsperiode
            ? 'Uttaksperiode'
            : 'Utsettelse',
    from: innslag.periode.tidsperiode.startdato,
    to: innslag.periode.tidsperiode.sluttdato,
    personName: innslag.periode.forelder,
    days: getAntallUttaksdagerITidsperiode(innslag.periode.tidsperiode),
    color: mapForelderTilInnslagfarge(innslag.periode.forelder)
});
const mapInnslagToMarker = (innslag: InnslagHendelsetype): TimelineMarker => ({
    type: 'marker',
    title: 'Marker',
    date: innslag.dato
});

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
        const {
            form,
            utsettelse,
            innslag,
            sisteRegistrertePermisjonsdag,
            dispatch
        } = this.props;

        const navnForelder1 = 'Kari';
        const navnForelder2 = 'Ola';

        if (form.fellesperiodeukerForelder2 > 0) {
            const forsteForelder2Periode = innslag.find(
                (i) =>
                    i.type === TidslinjeinnslagType.periode &&
                    i.periode.type === Periodetype.Stonadsperiode &&
                    i.periode.forelder === 'forelder2' &&
                    i.periode.konto === StonadskontoType.Fellesperiode
            );
            if (forsteForelder2Periode) {
                (forsteForelder2Periode as InnslagPeriodetype).ekstrainfo = {
                    tekst: (
                        <TidslinjeAktivitetskravInfo
                            navnForelder1={form.navnForelder1}
                            navnForelder2={form.navnForelder2}
                        />
                    )
                };
            }
        }
        const tidsromForUtsettelse: Tidsperiode | undefined =
            form.termindato &&
            form.dekningsgrad &&
            sisteRegistrertePermisjonsdag
                ? getGyldigTidsromForUtsettelse(
                      form.termindato,
                      form.dekningsgrad,
                      form.permisjonsregler,
                      sisteRegistrertePermisjonsdag
                  )
                : undefined;

        return (
            <div>
                <section className="tidsplan">
                    <Timeline
                        items={innslag.map((i) => mapInnslagToTimelineItem(i))}
                        navnForelder1={navnForelder1}
                        navnForelder2={navnForelder2}
                    />
                </section>
                <hr />
                <Permisjonsplan
                    navnForelder1={navnForelder1}
                    navnForelder2={navnForelder2}
                    permisjonsregler={getPermisjonsregler(new Date())}
                    fellesperiodeukerForelder1={23}
                    fellesperiodeukerForelder2={23}
                    innslag={innslag}
                    onRedigerUtsettelse={(u: Utsettelsesperiode) =>
                        dispatch(utsettelseVisDialog(u))
                    }
                    onLeggTilUtsettelse={() => dispatch(utsettelseVisDialog())}
                />
                {tidsromForUtsettelse &&
                    form.termindato && (
                        <div>
                            <UtsettelseDialog
                                isOpen={utsettelse.dialogErApen}
                                navnForelder1={form.navnForelder1}
                                navnForelder2={form.navnForelder2}
                                utsettelser={utsettelse.utsettelser}
                                utsettelse={utsettelse.valgtUtsettelse}
                                tidsrom={tidsromForUtsettelse}
                                permisjonsregler={form.permisjonsregler}
                                termindato={form.termindato}
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

export default connect(mapStateToProps)(Main);
