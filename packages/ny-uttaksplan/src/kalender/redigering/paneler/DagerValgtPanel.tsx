import { useAlleUttakPerioderInklTapteDager } from '../../../utils/lagHullPerioder';
import { useKalenderRedigeringContext } from '../context/KalenderRedigeringContext';
import { harEnValgtPeriodeIKunEnEksisterendePeriode } from '../utils/kalenderPeriodeUtils';
import { HvaVilDuEndreTilPanel } from './handlinger/HvaVilDuEndreTilPanel';
import { LeggTilEllerEndrePeriodePanel } from './handlinger/LeggTilEllerEndrePeriodePanel';

interface Props {
    labels: React.ReactNode;
    erIRedigeringsmodus: boolean;
    setErIRedigeringsmodus: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DagerValgtPanel = ({ labels, erIRedigeringsmodus, setErIRedigeringsmodus }: Props) => {
    const { sammenslåtteValgtePerioder } = useKalenderRedigeringContext();

    const uttakPerioderInkludertTapteDager = useAlleUttakPerioderInklTapteDager();

    if (erIRedigeringsmodus) {
        const erKunEnHelEksisterendePeriodeValgt =
            sammenslåtteValgtePerioder.length === 1 &&
            harEnValgtPeriodeIKunEnEksisterendePeriode(
                uttakPerioderInkludertTapteDager,
                sammenslåtteValgtePerioder[0]!,
            );

        return (
            <LeggTilEllerEndrePeriodePanel
                key={erKunEnHelEksisterendePeriodeValgt ? 1 : 0} // Reset av form når en går fra endre til legg til og omvendt
                lukkRedigeringsmodus={() => setErIRedigeringsmodus(false)}
                labels={labels}
            />
        );
    }

    return <HvaVilDuEndreTilPanel åpneRedigeringsmodus={() => setErIRedigeringsmodus(true)} labels={labels} />;
};
