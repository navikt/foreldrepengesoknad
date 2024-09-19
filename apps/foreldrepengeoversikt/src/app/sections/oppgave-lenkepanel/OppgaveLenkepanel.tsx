import { ChatExclamationmarkIcon } from '@navikt/aksel-icons';

import { formatDate } from '@navikt/fp-utils';

import { LenkePanel } from 'app/components/lenke-panel/LenkePanel';
import OversiktRoutes from 'app/routes/routes';
import { MinidialogInnslag } from 'app/types/MinidialogInnslag';

interface Props {
    minidialogInnslag: MinidialogInnslag;
    tittel: string;
}

const OppgaveLenkepanel: React.FunctionComponent<Props> = ({ tittel, minidialogInnslag }) => {
    return (
        <LenkePanel
            undertittel={formatDate(minidialogInnslag.opprettet)}
            tittel={tittel}
            to={`${OversiktRoutes.OPPGAVER}/${minidialogInnslag.dialogId}`}
            Ikon={ChatExclamationmarkIcon}
        />
    );
};

export default OppgaveLenkepanel;
