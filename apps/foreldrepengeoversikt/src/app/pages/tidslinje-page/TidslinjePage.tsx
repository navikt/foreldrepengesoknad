import OversiktRoutes from 'app/routes/routes';
import { useSetBackgroundColor } from 'app/hooks/useBackgroundColor';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';

import Tidslinje from 'app/sections/tidslinje/Tidslinje';
import { useGetSelectedSak } from 'app/hooks/useSelectedSak';
import './tidslinje-page.css';
import { bemUtils } from '@navikt/fp-common';

const TidslinjePage = () => {
    const bem = bemUtils('tidslinje-page');
    const sak = useGetSelectedSak();
    useSetBackgroundColor('blue');
    useSetSelectedRoute(OversiktRoutes.TIDSLINJEN);

    return (
        <div className={bem.element('div')}>
            <Tidslinje sak={sak} visHeleTidslinjen={true} />
        </div>
    );
};

export default TidslinjePage;
