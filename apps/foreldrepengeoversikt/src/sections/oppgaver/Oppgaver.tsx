import { useQuery } from '@tanstack/react-query';
import { useIntl } from 'react-intl';

import { BodyShort, VStack } from '@navikt/ds-react';

import { minidialogOptions } from '../../api/api';
import { ContentSection } from '../../components/content-section/ContentSection';
import { guid } from '../../utils/guid';
import { OppgaveLenkepanel } from '../oppgave-lenkepanel/OppgaveLenkepanel';

interface Props {
    saksnummer: string;
}
export const Oppgaver = ({ saksnummer }: Props) => {
    const aktiveMinidialogerForSakenQuery = useQuery({
        ...minidialogOptions(),
        select: (data) => data.filter((d) => d.saksnummer === saksnummer),
    });

    const intl = useIntl();
    if (aktiveMinidialogerForSakenQuery.isError) {
        return (
            <ContentSection
                heading={intl.formatMessage({ id: 'saksoversikt.oppgaver' })}
                className="bg-ax-warning-200 border-ax-warning-600 border-2"
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
        <VStack gap="space-8">
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
