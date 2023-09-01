import { logAmplitudeEvent } from 'fpcommon/amplitude/amplitude';
import Person from 'types/Person';
import Kvittering from 'types/Kvittering';
import { PageKeys } from '../PageKeys';
import KvitteringHeader from './KvitteringHeader';
import SøknadSendtTittel from './SøknadtSendtTittel';

interface Props {
    person: Person;
    kvittering: Kvittering;
}

const SøknadSendt: React.FunctionComponent<Props> = ({ person, kvittering }) => {
    logAmplitudeEvent('sidevisning', {
        app: 'engangsstonadny',
        team: 'foreldrepenger',
        pageKey: PageKeys.SøknadSendt,
    });

    return (
        <>
            <SøknadSendtTittel />
            <KvitteringHeader søker={person} kvittering={kvittering} />
        </>
    );
};

export default SøknadSendt;
