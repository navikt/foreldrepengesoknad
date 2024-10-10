import { useQuery } from '@tanstack/react-query';
import { useIntl } from 'react-intl';

import { BodyShort, VStack } from '@navikt/ds-react';

import OppgaveLenkepanel from '../oppgave-lenkepanel/OppgaveLenkepanel';
import { minidialogOptions } from './../../api/api';
import ContentSection from './../../components/content-section/ContentSection';
import { guid } from './../../utils/guid';

interface Props {
    saksnummer: string;
}
const Oppgaver: React.FunctionComponent<Props> = ({ saksnummer }) => {
    const aktiveMinidialogerForSakenQuery = useQuery({
        ...minidialogOptions(),
        select: (data) => data.filter(({ saksnr }) => saksnr === saksnummer),
    });

    const intl = useIntl();
    if (aktiveMinidialogerForSakenQuery.isError) {
        return (
            <ContentSection
                heading={intl.formatMessage({ id: 'saksoversikt.oppgaver' })}
                className="bg-orange-100 border-orange-500 border-2"
            >
                <BodyShort>{intl.formatMessage({ id: 'oppgaver.feilVedHentingAvOppgaver' })}</BodyShort>
            </ContentSection>
        );
    }

    const aktiveMinidialogerForSaken = aktiveMinidialogerForSakenQuery.data ?? [];
    if ((aktiveMinidialogerForSaken ?? []).length === 0) {
        return null;
    }

    return (
        <VStack gap="2">
            {aktiveMinidialogerForSaken.map((minidialog) => (
                <OppgaveLenkepanel
                    key={guid()}
                    tittel={intl.formatMessage({ id: 'oppgaver.tittel.tilbakebetaling' })}
                    minidialogInnslag={minidialog}
                />
            ))}
        </VStack>
    );
};

export default Oppgaver;
