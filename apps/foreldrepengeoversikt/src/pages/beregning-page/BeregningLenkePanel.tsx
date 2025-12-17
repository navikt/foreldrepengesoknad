import { SackKronerIcon } from '@navikt/aksel-icons';

import { LenkePanel } from '../../components/lenke-panel/LenkePanel';
import { useGetSelectedSak } from '../../hooks/useSelectedSak.ts';
import { OversiktRoutes } from '../../routes/routes';

export const BeregningLenkePanel = () => {
    const gjeldendeSak = useGetSelectedSak();

    if (gjeldendeSak?.ytelse !== 'FORELDREPENGER') {
        return undefined;
    }
    const beregning = gjeldendeSak?.gjeldendeVedtak?.beregningsgrunnlag;

    if (beregning === undefined) {
        return undefined;
    }

    return <LenkePanel tittel="Din beregning" to={OversiktRoutes.BEREGNING} Ikon={SackKronerIcon} />;
};
