import * as React from 'react';
import {
    Periode,
    Periodetype,
    isUttaksperiode,
    StønadskontoType,
    PeriodeInfoType
} from '../../../../types/uttaksplan/periodetyper';
import BEMHelper from 'common/util/bem';
import { NavnPåForeldre, Tidsperiode } from 'common/types';
import ToggleList from '../../../elementer/toggleList/ToggleList';
import PeriodelisteHull from './items/PeriodelisteHull';
import { focusElement } from '../../../../util/focusUtils';
import PeriodelistePeriode from './items/PeriodelistePeriode';
import PeriodelisteInfo, { PeriodelisteInformasjon } from './items/PeriodelisteInfo';
import { Søknadsinfo } from 'app/selectors/types';
import PeriodelisteAvslåttPeriode from './items/PeriodelisteAvslåttPeriode';
import PeriodelisteOppholdAnnenPart from './items/PeriodelisteOppholdAnnenPart';
import PeriodelisteGruppertInfoPart from './items/PeriodelisteGruppertInfoPart';
import { VeiledermeldingerPerPeriode } from '../../../veilederInfo/types';

import './periodeliste.less';

interface OwnProps {
    søknadsinfo: Søknadsinfo;
    perioder: Periode[];
    informasjon?: PeriodelisteInformasjon[];
    antallFeriedager: number;
    meldingerPerPeriode: VeiledermeldingerPerPeriode;
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
        this.shouldRenderHull = this.shouldRenderHull.bind(this);

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

    shouldRenderHull(perioder: Periode[]) {
        return perioder
            .filter((p: Periode) => p.type !== Periodetype.Hull)
            .some(
                (p: Periode) =>
                    (isUttaksperiode(p) && p.konto !== StønadskontoType.AktivitetsfriKvote) || !isUttaksperiode(p)
            );
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
            navnPåForeldre,
            antallFeriedager,
            meldingerPerPeriode,
            onLeggTilOpphold,
            onLeggTilPeriode
        } = this.props;

        const filteredPerioder = this.shouldRenderHull(perioder)
            ? perioder
            : perioder.filter((p) => p.type !== Periodetype.Hull);

        return (
            <ToggleList
                ref={(c) => (this.toggleList = c)}
                onItemToggle={this.handleOnItemToggle}
                render={(onToggle, isOpen) => (
                    <div className={periodelisteBem.block}>
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
                        {filteredPerioder.map((periode) => {
                            const itemId = getPeriodelisteElementId(periode.id);
                            const isExpanded = isOpen(itemId);
                            switch (periode.type) {
                                case Periodetype.Hull:
                                    return (
                                        <PeriodelisteHull
                                            key={itemId}
                                            itemId={itemId}
                                            isExpanded={isExpanded}
                                            onToggle={onToggle}
                                            periode={periode}
                                            onLeggTilOpphold={onLeggTilOpphold}
                                            onLeggTilPeriode={onLeggTilPeriode}
                                            navnPåForeldre={navnPåForeldre}
                                        />
                                    );
                                case Periodetype.Info:
                                    switch (periode.infotype) {
                                        case PeriodeInfoType.avslåttPeriode:
                                            return (
                                                <PeriodelisteAvslåttPeriode
                                                    key={itemId}
                                                    itemId={itemId}
                                                    isExpanded={isExpanded}
                                                    onToggle={onToggle}
                                                    periode={periode}
                                                    onLeggTilOpphold={onLeggTilOpphold}
                                                    onLeggTilPeriode={onLeggTilPeriode}
                                                    navnPåForeldre={navnPåForeldre}
                                                />
                                            );
                                        case PeriodeInfoType.uttakAnnenPart:
                                            return (
                                                periode.visPeriodeIPlan && (
                                                    <PeriodelisteOppholdAnnenPart
                                                        key={itemId}
                                                        itemId={itemId}
                                                        isExpanded={isExpanded}
                                                        onToggle={onToggle}
                                                        periode={periode}
                                                        navnPåForeldre={navnPåForeldre}
                                                    />
                                                )
                                            );
                                        case PeriodeInfoType.gruppertInfo:
                                            return (
                                                <PeriodelisteGruppertInfoPart
                                                    key={itemId}
                                                    itemId={itemId}
                                                    isExpanded={isExpanded}
                                                    onToggle={onToggle}
                                                    periode={periode}
                                                    navnPåForeldre={navnPåForeldre}
                                                />
                                            );
                                    }
                                    return;
                                default:
                                    return (
                                        <PeriodelistePeriode
                                            key={itemId}
                                            id={itemId}
                                            periode={periode}
                                            antallFeriedager={antallFeriedager}
                                            navnPåForeldre={navnPåForeldre}
                                            meldinger={meldingerPerPeriode[periode.id]}
                                            isExpanded={isExpanded}
                                            onToggle={onToggle}
                                        />
                                    );
                            }
                        })}
                    </div>
                )}
            />
        );
    }
}
export default Periodeliste;
