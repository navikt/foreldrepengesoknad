import * as React from 'react';
import classnames from 'classnames';
import { Periode, Periodetype, isForeldrepengerFørFødselUttaksperiode } from '../../types/uttaksplan/periodetyper';
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
import PeriodeFargestrek from '../periode-fargestrek/PeriodeFargestrek';
import { Søknadsinfo } from '../../selectors/s\u00F8knadsinfoSelector';

export interface OwnProps {
    søknadsinfo: Søknadsinfo;
    perioder: Periode[];
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
            søknadsinfo,
            perioder,
            uttaksplanValidering,
            navnPåForeldre,
            antallFeriedager,
            onLeggTilOpphold,
            onLeggTilPeriode,
            onFjernPeriode
        } = this.props;
        const numPerioder = perioder.length;
        let firstInvalidTidsperiode = false;
        return (
            <ToggleList
                ref={(c) => (this.toggleList = c)}
                onItemToggle={this.handleOnItemToggle}
                render={(onToggle, isOpen) => (
                    <div className={periodelisteBem.className}>
                        {perioder.map((periode, idx) => {
                            const isExpanded = isOpen(periode.id);
                            const nextIsGap = idx < numPerioder - 1 && perioder[idx + 1].type === Periodetype.Hull;
                            const erFørstePeriodeEtterForeldrepengerFørFødsel =
                                idx > 0 && isForeldrepengerFørFødselUttaksperiode(perioder[idx - 1]);
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
                                    <PeriodeFargestrek periode={periode} />
                                    <div className={periodelisteBem.element('item__strek')} />
                                    {periode.type === Periodetype.Hull ? (
                                        <PeriodelisteHull
                                            key={periode.id}
                                            periode={periode}
                                            nesteUttaksperiode={nesteUttaksperiode}
                                            navnPåForeldre={navnPåForeldre}
                                            onLeggTilOpphold={onLeggTilOpphold}
                                            onLeggTilPeriode={onLeggTilPeriode}
                                            onFjernPeriode={
                                                erFørstePeriodeEtterForeldrepengerFørFødsel ? undefined : onFjernPeriode
                                            }
                                        />
                                    ) : (
                                        <EndrePeriodeFormRenderer
                                            periode={periode}
                                            render={(onChange, onRequestDelete) => (
                                                <PeriodelisteItem
                                                    søknadsinfo={søknadsinfo}
                                                    key={periode.id}
                                                    periode={periode}
                                                    antallFeriedager={antallFeriedager}
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
