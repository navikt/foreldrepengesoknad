import { ChatExclamationmarkIcon } from '@navikt/aksel-icons';

import { MinidialogInnslag } from '@navikt/fp-types';
import { formatDate } from '@navikt/fp-utils';

import { LenkePanel } from '../../components/lenke-panel/LenkePanel';
import { OversiktRoutes } from '../../routes/routes';

interface Props {
    minidialogInnslag: MinidialogInnslag;
    tittel: string;
}

export const OppgaveLenkepanel = ({ tittel, minidialogInnslag }: Props) => {
    return (
        <LenkePanel
            undertittel={formatDate(minidialogInnslag.opprettet)}
            tittel={tittel}
            to={`${OversiktRoutes.OPPGAVER}/${minidialogInnslag.dialogId}`}
            Ikon={ChatExclamationmarkIcon}
        />
    );
};
