import { MinidialogInnslag } from 'app/types/HistorikkInnslag';
import React from 'react';
import { Link } from 'react-router-dom';
import './oppgaveLenkepanel.css';
import { bemUtils, Block, formatDate } from '@navikt/fp-common';
import { LinkPanel } from '@navikt/ds-react';
import { DialogReport } from '@navikt/ds-icons';

interface Props {
    minidialogInnslag: MinidialogInnslag;
    tittel: React.ReactNode | string;
}

const OppgaveLenkepanel: React.FunctionComponent<Props> = ({ tittel, minidialogInnslag }) => {
    const bem = bemUtils('oppgave-lenkepanel');
    return (
        <Block padBottom="l">
            <LinkPanel as={Link} to={minidialogInnslag.dialogId} border={false} className={bem.element('linkPanel')}>
                <div className={bem.element('content')}>
                    <DialogReport className={bem.element('icon')}></DialogReport>
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
        </Block>
    );
};

export default OppgaveLenkepanel;
