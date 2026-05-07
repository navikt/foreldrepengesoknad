import { FormattedMessage, useIntl } from 'react-intl';

import { Accordion, BodyLong, BodyShort, Button, Detail, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Ytelse } from '@navikt/fp-types';

interface Props {
    kontonummer: string | undefined;
    ytelse: Ytelse | undefined;
    harMinstEttArbeidsforhold: boolean;
}

export const KontonummerInfo = ({ kontonummer, ytelse, harMinstEttArbeidsforhold }: Props) => {
    const intl = useIntl();
    const harKontonummer = !!kontonummer && kontonummer.trim().length > 0;
    const kontonummerTekst = harKontonummer ? kontonummer : intl.formatMessage({ id: 'kontonummer.info.duMangler' });
    const kontonummerEndreTekst = harKontonummer
        ? intl.formatMessage({ id: 'kontonummer.endreKontonummer' })
        : intl.formatMessage({ id: 'kontonummer.registrerKontonummer' });

    return (
        <Accordion.Item>
            <Accordion.Header>
                <VStack gap="space-4">
                    <Detail textColor="subtle">
                        <FormattedMessage id={'kontonummer.label'} />
                    </Detail>
                    <BodyShort weight="semibold">{kontonummerTekst}</BodyShort>
                </VStack>
            </Accordion.Header>
            <Accordion.Content>
                <VStack gap="space-16">
                    <KontonummerInfoTekst
                        harKontonummer={harKontonummer}
                        ytelse={ytelse}
                        harMinstEttArbeidsforhold={harMinstEttArbeidsforhold}
                    />
                    <Button
                        size="small"
                        className="w-fit no-underline"
                        variant="secondary"
                        as={Link}
                        href={links.brukerprofil}
                    >
                        {kontonummerEndreTekst}
                    </Button>
                </VStack>
            </Accordion.Content>
        </Accordion.Item>
    );
};

interface KontonummerInfoTekstProps {
    harKontonummer: boolean;
    ytelse: Ytelse | undefined;
    harMinstEttArbeidsforhold: boolean;
}

const KontonummerInfoTekst = ({ harKontonummer, ytelse, harMinstEttArbeidsforhold }: KontonummerInfoTekstProps) => {
    if (ytelse === 'ENGANGSSTØNAD' || !harMinstEttArbeidsforhold) {
        if (harKontonummer) {
            return (
                <BodyLong size="small">
                    <FormattedMessage id="KontonummerInfo.NavUtbetaling" values={{ ytelse }} />
                </BodyLong>
            );
        } else {
            return (
                <BodyLong size="small">
                    <FormattedMessage id="KontonummerInfo.Mangler" values={{ ytelse }} />
                </BodyLong>
            );
        }
    }

    if (ytelse === 'FORELDREPENGER' || ytelse === 'SVANGERSKAPSPENGER') {
        return (
            <BodyLong size="small">
                <FormattedMessage id="kontonummer.tekst.foreldrepenger.har" />
            </BodyLong>
        );
    }

    if (!harKontonummer) {
        return (
            <>
                <BodyLong size="small">
                    <FormattedMessage id="kontonummer.tekst.gjeneral" />
                </BodyLong>
                <BodyLong size="small">
                    <FormattedMessage id="kontonummer.tekst.foreldrepenger.mangler" />
                </BodyLong>
            </>
        );
    }
    // Kan kun inntreffe dersom ytelse ikke er tilgjengelig fra saken.
    return (
        <BodyLong size="small">
            <FormattedMessage id="kontonummer.tekst.engangsstønad.har" />
        </BodyLong>
    );
};
