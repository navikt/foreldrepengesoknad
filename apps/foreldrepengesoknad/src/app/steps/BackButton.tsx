import { FormattedMessage } from 'react-intl';
import SøknadRoutes from 'app/routes/routes';
import { Button } from '@navikt/ds-react';
import { ContextDataType, useContextSaveData } from 'app/context/FpDataContext';

// TODO (TOR) Midlertidig komponent. Erstatt med StepButtonsHookForm når ein skriv om til react-hook-form

type Props = {
    route: SøknadRoutes;
    mellomlagreSøknadOgNaviger: () => void;
};

const BackButton: React.FunctionComponent<Props> = ({ route, mellomlagreSøknadOgNaviger }) => {
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const gåTilForrige = async () => {
        oppdaterAppRoute(route);
        mellomlagreSøknadOgNaviger();
    };

    return (
        <Button type="button" variant="secondary" onClick={gåTilForrige}>
            <FormattedMessage id="backlink.label" />
        </Button>
    );
};

export default BackButton;
