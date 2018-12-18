import * as React from 'react';
import { Periode, Periodetype, isForeldrepengerFørFødselUttaksperiode } from '../../types/uttaksplan/periodetyper';
import BEMHelper from 'common/util/bem';
import { NavnPåForeldre } from 'common/types';
import { UttaksplanValideringState } from '../../redux/reducers/uttaksplanValideringReducer';
import ToggleList from '../toggle-list/ToggleList';
import PeriodelisteHull from './items/PeriodelisteHull';
import { focusElement } from '../../util/focusUtils';
import { Tidsperiode } from 'nav-datovelger/src/datovelger/types';
import PeriodelistePeriode from './items/PeriodelistePeriode';
import PeriodelisteInfo, { PeriodelisteInformasjon } from './items/PeriodelisteInfo';

import './periodeliste.less';

interface OwnProps {
    perioder: Periode[];
    informasjon?: PeriodelisteInformasjon[];
    antallFeriedager: number;
    uttaksplanValidering: UttaksplanValideringState;
    navnPåForeldre: NavnPåForeldre;
    lastAddedPeriodeId: string | undefined;
    onPeriodeLukk?: (id: string) => void;
    onLeggTilOpphold?: (tidsperiode: Tidsperiode) => void;
    onLeggTilPeriode?: (tidsperiode: Tidsperiode) => void;
    onFjernPeriode?: (periode: Periode) => void;
}

type Props = OwnProps;

export const periodelisteBem = BEMHelper('periodeliste');

export const getPeriodelisteElementId = (periodeId: string): string => `periode-${periodeId}`;

class Periodeliste extends React.Component<Props> {
    toggleList: ToggleList<any> | null;
    periodeWhichHaveReceivedFocus: string | undefined;
    periodeToBeFocused: string | undefined;

    constructor(props: Props) {
        super(props);

        this.checkPeriodeFocus = this.checkPeriodeFocus.bind(this);
        this.handleOnItemToggle = this.handleOnItemToggle.bind(this);

        const { perioder } = props;
        if (perioder.length === 1 && perioder[0].id === props.lastAddedPeriodeId) {
            this.periodeToBeFocused = props.lastAddedPeriodeId;
        }
    }

    collapseAll() {
        if (this.toggleList) {
            this.toggleList.collapseAll();
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (
            nextProps.lastAddedPeriodeId !== undefined &&
            nextProps.lastAddedPeriodeId !== this.periodeWhichHaveReceivedFocus
        ) {
            this.periodeToBeFocused = nextProps.lastAddedPeriodeId;
        }
    }

    componentDidUpdate() {
        this.checkPeriodeFocus();
    }

    componentDidMount() {
        this.checkPeriodeFocus();
    }

    checkPeriodeFocus() {
        if (this.periodeToBeFocused) {
            focusElement(getPeriodelisteElementId(this.periodeToBeFocused));
            this.periodeWhichHaveReceivedFocus = this.periodeToBeFocused;
            this.periodeToBeFocused = undefined;
        }
    }

    handleOnItemToggle(id: string, open: boolean) {
        if (this.props.onPeriodeLukk && open === false) {
            this.props.onPeriodeLukk(id);
        }
    }
    render() {
        const {
            perioder,
            informasjon,
            uttaksplanValidering,
            navnPåForeldre,
            antallFeriedager,
            onLeggTilOpphold,
            onLeggTilPeriode,
            onFjernPeriode
        } = this.props;
        return (
            <ToggleList
                ref={(c) => (this.toggleList = c)}
                onItemToggle={this.handleOnItemToggle}
                render={(onToggle, isOpen) => (
                    <div className={periodelisteBem.className}>
                        {informasjon &&
                            informasjon.map((item) => (
                                <PeriodelisteInfo
                                    key={item.id}
                                    id={item.id}
                                    isExpanded={isOpen(item.id)}
                                    renderContent={item.renderContent}
                                    ikon={item.ikon}
                                    tittel={item.tittel}
                                    beskrivelse={item.beskrivelse}
                                    onToggle={onToggle}
                                />
                            ))}
                        {perioder.map((periode, idx) => {
                            const itemId = getPeriodelisteElementId(periode.id);
                            const isExpanded = isOpen(itemId);
                            const periodeKanSlettes =
                                idx > 0 && isForeldrepengerFørFødselUttaksperiode(perioder[idx - 1]);
                            return periode.type === Periodetype.Hull ? (
                                <PeriodelisteHull
                                    key={itemId}
                                    itemId={itemId}
                                    isExpanded={isExpanded}
                                    onToggle={onToggle}
                                    periode={periode}
                                    uttaksplan={perioder}
                                    navnPåForeldre={navnPåForeldre}
                                    onLeggTilOpphold={onLeggTilOpphold}
                                    onLeggTilPeriode={onLeggTilPeriode}
                                    onFjernPeriode={periodeKanSlettes ? undefined : onFjernPeriode}
                                />
                            ) : (
                                <PeriodelistePeriode
                                    key={itemId}
                                    id={itemId}
                                    periode={periode}
                                    antallFeriedager={antallFeriedager}
                                    navnPåForeldre={navnPåForeldre}
                                    validertPeriode={uttaksplanValidering.periodevalidering[periode.id]}
                                    isExpanded={isExpanded}
                                    onToggle={onToggle}
                                />
                            );
                        })}
                    </div>
                )}
            />
        );
    }
}
export default Periodeliste;
