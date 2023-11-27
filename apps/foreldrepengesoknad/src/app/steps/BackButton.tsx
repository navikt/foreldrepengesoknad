import { FormattedMessage } from 'react-intl';
import SøknadRoutes from 'app/routes/routes';
import { Button } from '@navikt/ds-react';
import { FpDataType, useFpStateSaveFn } from 'app/context/FpDataContext';

// TODO (TOR) Midlertidig komponent. Erstatt med StepButtonsHookForm når ein skriv om til react-hook-form

type Props = {
    route: SøknadRoutes;
    mellomlagreSøknadOgNaviger: () => void;
};

const BackButton: React.FunctionComponent<Props> = ({ route, mellomlagreSøknadOgNaviger }) => {
    const lagreAppRoute = useFpStateSaveFn(FpDataType.APP_ROUTE);

    const gåTilForrige = async () => {
        lagreAppRoute(route);
        mellomlagreSøknadOgNaviger();
    };

    return (
        <Button type="button" variant="secondary" onClick={gåTilForrige}>
            <FormattedMessage id="backlink.label" />
        </Button>
    );
};

export default BackButton;
