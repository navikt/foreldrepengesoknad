import * as React from 'react';
import classnames from 'classnames';
import { Periode, Periodetype } from '../../types/uttaksplan/periodetyper';
import BEMHelper from 'common/util/bem';
import { NavnPåForeldre } from 'common/types';
import EndrePeriodeFormRenderer from '../endre-periode-form-renderer/EndrePeriodeFormRenderer';
import { UttaksplanValideringState } from '../../redux/reducers/uttaksplanValideringReducer';

import './periodeliste.less';
import { Tidsperioden } from '../../util/uttaksplan/Tidsperioden';
import ToggleList from '../toggle-list/ToggleList';
import PeriodelisteItem from './PeriodelisteItem';
import PeriodelisteHull from './PeriodelisteHull';
import { focusElement } from '../../util/focusUtils';

export interface OwnProps {
    perioder: Periode[];
    uttaksplanValidering: UttaksplanValideringState;
    navnPåForeldre: NavnPåForeldre;
    lastAddedPeriodeId: string | undefined;
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
        const { perioder, uttaksplanValidering, navnPåForeldre } = this.props;
        const numPerioder = perioder.length;
        return (
            <ToggleList
                render={(onToggle, isOpen) => (
                    <div className={periodelisteBem.className}>
                        {perioder.map((periode, idx) => {
                            const isExpanded = isOpen(periode.id);
                            const nextIsGap = idx < numPerioder - 1 && perioder[idx + 1].type === Periodetype.Hull;
                            return (
                                <div
                                    key={periode.id}
                                    className={classnames(
                                        periodelisteBem.element('item', isExpanded ? 'expanded' : undefined),
                                        periodelisteBem.element('item', nextIsGap ? 'with-gap' : undefined),
                                        periodelisteBem.element('item', `type-${periode.type}`)
                                    )}>
                                    {periode.type === Periodetype.Hull ? (
                                        <PeriodelisteHull
                                            key={periode.id}
                                            antallDager={Tidsperioden(periode.tidsperiode).getAntallUttaksdager()}
                                        />
                                    ) : (
                                        <EndrePeriodeFormRenderer
                                            periode={periode}
                                            render={(onChange, onRequestDelete) => (
                                                <PeriodelisteItem
                                                    key={periode.id}
                                                    periodenummer={idx + 1}
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
