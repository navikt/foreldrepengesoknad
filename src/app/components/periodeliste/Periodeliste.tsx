import * as React from 'react';
import classnames from 'classnames';
import { Periode, Periodetype } from '../../types/uttaksplan/periodetyper';
import BEMHelper from 'common/util/bem';
import { NavnPåForeldre } from 'common/types';
import EndrePeriodeFormRenderer from '../endre-periode-form-renderer/EndrePeriodeFormRenderer';
import { UttaksplanValideringState } from '../../redux/reducers/uttaksplanValideringReducer';

import './periodeliste.less';
import { isValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import ToggleList from '../toggle-list/ToggleList';
import PeriodelisteItem from './PeriodelisteItem';
import PeriodelisteHull from './PeriodelisteHull';
import { focusElement } from '../../util/focusUtils';
import { Tidsperiode } from 'nav-datovelger/src/datovelger/types';
import { Periodene } from '../../util/uttaksplan/Periodene';

export interface OwnProps {
    perioder: Periode[];
    uttaksplanValidering: UttaksplanValideringState;
    navnPåForeldre: NavnPåForeldre;
    lastAddedPeriodeId: string | undefined;
    onLeggTilOpphold?: (tidsperiode: Tidsperiode) => void;
    onLeggTilPeriode?: (tidsperiode: Tidsperiode) => void;
    onFjernPeriode?: (periode: Periode) => void;
}

interface State {
    toggleState: {};
}

type Props = OwnProps;

export const periodelisteBem = BEMHelper('periodeliste');

export const getPeriodelisteItemId = (periodeId: string): string => `periode-${periodeId}`;

class Periodeliste extends React.Component<Props, State> {
    periodeWhichHaveReceivedFocus: string | undefined;
    periodeToBeFocused: string | undefined;
    constructor(props: Props) {
        super(props);
        this.state = {
            toggleState: []
        };
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
        if (this.periodeToBeFocused) {
            focusElement(getPeriodelisteItemId(this.periodeToBeFocused));
            this.periodeWhichHaveReceivedFocus = this.periodeToBeFocused;
            this.periodeToBeFocused = undefined;
        }
    }
    render() {
        const {
            perioder,
            uttaksplanValidering,
            navnPåForeldre,
            onLeggTilOpphold,
            onLeggTilPeriode,
            onFjernPeriode
        } = this.props;
        const numPerioder = perioder.length;
        let firstInvalidTidsperiode = false;
        return (
            <ToggleList
                render={(onToggle, isOpen) => (
                    <div className={periodelisteBem.className}>
                        {perioder.map((periode, idx) => {
                            const isExpanded = isOpen(periode.id);
                            const nextIsGap = idx < numPerioder - 1 && perioder[idx + 1].type === Periodetype.Hull;
                            const nesteUttaksperiode = Periodene(perioder)
                                .finnAllePåfølgendePerioder(periode)
                                .filter((p) => p.type === Periodetype.Uttak || p.type === Periodetype.Overføring)
                                .shift();
                            firstInvalidTidsperiode =
                                firstInvalidTidsperiode === false && isValidTidsperiode(periode.tidsperiode) === false;
                            return (
                                <div
                                    key={periode.id}
                                    className={classnames(
                                        periodelisteBem.element('item', isExpanded ? 'expanded' : undefined),
                                        periodelisteBem.element('item', nextIsGap ? 'with-gap' : undefined),
                                        periodelisteBem.element(
                                            'item',
                                            firstInvalidTidsperiode ? 'firstInvalidTidsperiode' : undefined
                                        ),
                                        periodelisteBem.element('item', `type-${periode.type}`)
                                    )}>
                                    {periode.type === Periodetype.Hull ? (
                                        <PeriodelisteHull
                                            key={periode.id}
                                            periode={periode}
                                            nesteUttaksperiode={nesteUttaksperiode}
                                            navnPåForeldre={navnPåForeldre}
                                            onLeggTilOpphold={onLeggTilOpphold}
                                            onLeggTilPeriode={onLeggTilPeriode}
                                            onFjernPeriode={onFjernPeriode}
                                        />
                                    ) : (
                                        <EndrePeriodeFormRenderer
                                            periode={periode}
                                            render={(onChange, onRequestDelete) => (
                                                <PeriodelisteItem
                                                    key={periode.id}
                                                    periode={periode}
                                                    navnPåForeldre={navnPåForeldre}
                                                    validertPeriode={uttaksplanValidering.periodevalidering[periode.id]}
                                                    isExpanded={isExpanded}
                                                    onToggle={onToggle}
                                                    onChange={onChange}
                                                    onRequestDelete={onRequestDelete}
                                                />
                                            )}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            />
        );
    }
}
export default Periodeliste;
