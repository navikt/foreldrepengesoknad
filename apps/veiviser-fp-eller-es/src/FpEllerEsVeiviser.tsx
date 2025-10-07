import { DEFAULT_SATSER } from '@navikt/fp-constants';

import { FpEllerEsRouter } from './FpEllerEsRouter';

export const FpEllerEsVeiviser = () => {
    return <FpEllerEsRouter satser={DEFAULT_SATSER} />;
};
