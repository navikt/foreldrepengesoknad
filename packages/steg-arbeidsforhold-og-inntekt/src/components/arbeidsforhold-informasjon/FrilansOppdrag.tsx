import { ExclamationmarkTriangleIcon, TasklistIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Box, Detail, Heading, InfoCard, List, ReadMore, Tag, VStack } from '@navikt/ds-react';

import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';
import { capitalizeFirstLetterInEveryWordOnly, formatDate } from '@navikt/fp-utils';

interface Props {
    frilansoppdrag: EksternArbeidsforholdDto_fpoversikt[];
}

type FrilansoppdragGruppe = {
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    fom: string;
    tom?: string;
    antallOppdrag: number;
};

const grupperFrilansoppdrag = (frilansoppdrag: EksternArbeidsforholdDto_fpoversikt[]): FrilansoppdragGruppe[] => {
    const grupper = new Map<string, FrilansoppdragGruppe>();

    for (const oppdrag of frilansoppdrag) {
        const gruppeId = `${oppdrag.arbeidsgiverIdType}-${oppdrag.arbeidsgiverId}`;
        const gruppe = grupper.get(gruppeId);

        if (!gruppe) {
            grupper.set(gruppeId, {
                arbeidsgiverId: oppdrag.arbeidsgiverId,
                arbeidsgiverIdType: oppdrag.arbeidsgiverIdType,
                arbeidsgiverNavn: oppdrag.arbeidsgiverNavn,
                fom: oppdrag.fom,
                tom: oppdrag.tom,
                antallOppdrag: 1,
            });
            continue;
        }

        gruppe.antallOppdrag += 1;
        gruppe.fom = oppdrag.fom < gruppe.fom ? oppdrag.fom : gruppe.fom;
        gruppe.tom = gruppe.tom && oppdrag.tom ? (oppdrag.tom > gruppe.tom ? oppdrag.tom : gruppe.tom) : undefined;
    }

    return [...grupper.values()];
};

export const FrilansOppdrag = ({ frilansoppdrag }: Props) => {
    const intl = useIntl();
    const grupperteFrilansoppdrag = grupperFrilansoppdrag(frilansoppdrag);

    if (frilansoppdrag.length === 0) {
        return null;
    }
    return (
        <VStack gap="space-8">
            <Box
                padding="space-16"
                className="rounded-(--ax-radius-12) border border-ax-border-info-subtle bg-ax-bg-info-soft"
            >
                <VStack gap="space-16">
                    <Heading size="xsmall" level="3">
                        Mine frilansoppdrag
                    </Heading>
                    <Tag
                        className="inline-flex w-max items-center gap-0.5 px-1.5 py-0.5"
                        icon={<TasklistIcon aria-hidden />}
                        variant="info"
                    >
                        Frilanser
                    </Tag>
                    <ReadMore header={<FormattedMessage id="inntektsinformasjon.frilansoppdrag.visOppdrag" />}>
                        <List>
                            {grupperteFrilansoppdrag.map((gruppe) => (
                                <List.Item key={`${gruppe.arbeidsgiverIdType}-${gruppe.arbeidsgiverId}`}>
                                    <VStack gap="space-2">
                                        <Detail weight="semibold">
                                            {gruppe.arbeidsgiverNavn
                                                ? capitalizeFirstLetterInEveryWordOnly(gruppe.arbeidsgiverNavn)
                                                : intl.formatMessage({ id: 'HarArbeidsforhold.arbeidsgiver' })}
                                        </Detail>
                                        <BodyShort>
                                            {gruppe.antallOppdrag === 1 ? (
                                                <FormattedMessage
                                                    id="inntektsinformasjon.arbeidsforhold.periode"
                                                    values={{
                                                        fom: formatDate(gruppe.fom),
                                                        tom: gruppe.tom
                                                            ? formatDate(gruppe.tom)
                                                            : intl.formatMessage({
                                                                  id: 'HarArbeidsforhold.pågående',
                                                              }),
                                                    }}
                                                />
                                            ) : (
                                                <FormattedMessage
                                                    id="inntektsinformasjon.frilansoppdrag.oppsummering"
                                                    values={{
                                                        antall: gruppe.antallOppdrag,
                                                        fom: formatDate(gruppe.fom),
                                                        tom: gruppe.tom
                                                            ? formatDate(gruppe.tom)
                                                            : intl.formatMessage({
                                                                  id: 'HarArbeidsforhold.pågående',
                                                              }),
                                                    }}
                                                />
                                            )}
                                        </BodyShort>
                                    </VStack>
                                </List.Item>
                            ))}
                        </List>
                    </ReadMore>
                    <InfoCard data-color="warning">
                        <InfoCard.Message icon={<ExclamationmarkTriangleIcon aria-hidden />}>
                            Vi må vite om du fortsatt er frilanser. Dette kan du svare på i neste steg.
                        </InfoCard.Message>
                    </InfoCard>
                </VStack>
            </Box>
        </VStack>
    );
};
