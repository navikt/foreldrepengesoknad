import { Link } from 'react-router-dom';

import { DialogReport } from '@navikt/ds-icons';
import { LinkPanel } from '@navikt/ds-react';

import { bemUtils, formatDate } from '@navikt/fp-utils';

import OversiktRoutes from 'app/routes/routes';
import { MinidialogInnslag } from 'app/types/MinidialogInnslag';

import './oppgaveLenkepanel.css';

interface Props {
    minidialogInnslag: MinidialogInnslag;
    tittel: React.ReactNode | string;
}

const OppgaveLenkepanel: React.FunctionComponent<Props> = ({ tittel, minidialogInnslag }) => {
    const bem = bemUtils('oppgave-lenkepanel');
    return (
        <LinkPanel
            as={Link}
            to={`${OversiktRoutes.OPPGAVER}/${minidialogInnslag.dialogId}`}
            border={false}
            className={bem.element('linkPanel')}
        >
            <div className={bem.element('content')}>
                <DialogReport className={bem.element('icon')} aria-hidden={true}></DialogReport>
                <div>
                    <LinkPanel.Title as="h3" className={bem.element('title')}>
                        {tittel}
                    </LinkPanel.Title>
                    <LinkPanel.Description>
                        <div className={bem.block}>{formatDate(minidialogInnslag.opprettet)}</div>
                    </LinkPanel.Description>
                </div>
            </div>
        </LinkPanel>
    );
};

export default OppgaveLenkepanel;
