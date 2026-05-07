import { CalculatorIcon } from '@navikt/aksel-icons';
import { useIntl } from 'react-intl';

import { LenkePanel } from '../../components/lenke-panel/LenkePanel';
import { useGetSelectedSak } from '../../hooks/useSelectedSak.ts';
import { OversiktRoutes } from '../../routes/routes';

export const BeregningLenkePanel = () => {
    const gjeldendeSak = useGetSelectedSak();
    const intl = useIntl();

    if (gjeldendeSak?.ytelse === 'ENGANGSSTØNAD') {
        return undefined;
    }
    const tilkjentYtelse = gjeldendeSak?.gjeldendeVedtak?.tilkjentYtelse;

    if (tilkjentYtelse === undefined) {
        return undefined;
    }

    return (
        <LenkePanel
            tittel={intl.formatMessage({ id: 'beregning.lenke' })}
            to={OversiktRoutes.BEREGNING}
            Ikon={CalculatorIcon}
        />
    );
};
