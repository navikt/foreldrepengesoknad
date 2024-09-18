import { Link } from 'react-router-dom';

import { DialogReport } from '@navikt/ds-icons';
import { HStack, LinkPanel } from '@navikt/ds-react';

import { formatDate } from '@navikt/fp-utils';

import OversiktRoutes from 'app/routes/routes';
import { MinidialogInnslag } from 'app/types/MinidialogInnslag';

interface Props {
    minidialogInnslag: MinidialogInnslag;
    tittel: React.ReactNode | string;
}

const OppgaveLenkepanel: React.FunctionComponent<Props> = ({ tittel, minidialogInnslag }) => {
    return (
        <LinkPanel
            as={Link}
            to={`${OversiktRoutes.OPPGAVER}/${minidialogInnslag.dialogId}`}
            border={false}
            className="rounded-large"
        >
            <HStack align="center" gap="6">
                <DialogReport aria-hidden={true}></DialogReport>
                <div>
                    <LinkPanel.Title as="h3" className="text-heading-medium">
                        {tittel}
                    </LinkPanel.Title>
                    <LinkPanel.Description>{formatDate(minidialogInnslag.opprettet)}</LinkPanel.Description>
                </div>
            </HStack>
        </LinkPanel>
    );
};

export default OppgaveLenkepanel;
