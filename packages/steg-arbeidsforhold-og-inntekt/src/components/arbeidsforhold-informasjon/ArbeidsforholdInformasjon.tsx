import { BankNoteIcon, BoatIcon, PersonEnvelopeIcon, TasklistIcon } from '@navikt/aksel-icons';
import { type ReactNode, useId } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, ExpansionCard, Label, Link, ReadMore, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { loggUmamiEvent } from '@navikt/fp-observability';
import {
    AppName,
    EksternArbeidsforholdDto_fpoversikt,
    NæringDto,
    SelvstendigNæringDto_fpoversikt,
} from '@navikt/fp-types';

import { type AndreInntektskilder } from '../../types/AndreInntektskilder';
import { AndreInntektskilderBox } from './AndreInntektskilderBox';
import { FrilansOppdrag } from './FrilansOppdrag.tsx';
import { HarArbeidsforhold } from './HarArbeidsforhold';
import { HarIkkeArbeidsforhold } from './HarIkkeArbeidsforhold';
import { ManueltLagtTilNæring } from './ManueltLagtTilNæring';
import { SelvstendigNæring } from './SelvstendigNæring.tsx';

interface Props {
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    frilansoppdrag: EksternArbeidsforholdDto_fpoversikt[];
    selvstendigNæring: SelvstendigNæringDto_fpoversikt[];
    egenNæring?: NæringDto;
    andreInntektskilder: AndreInntektskilder[];
    onRemoveAndreInntekt: (index: number) => void;
    onRemoveEgenNæring: () => void;
    visManglerInfo?: boolean;
    appOrigin: AppName;
}

const Definisjon = ({ icon, tittel, children }: { icon: ReactNode; tittel: ReactNode; children: ReactNode }) => (
    <div className="flex gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-(--ax-info-200)">{icon}</div>
        <VStack gap="space-2" className="min-w-0 flex-1">
            <Label as="p" size="small">
                {tittel}
            </Label>
            {children}
        </VStack>
    </div>
);

const ArbeidsforholdDefinisjoner = ({ appOrigin }: { appOrigin: AppName }) => {
    const tittelId = useId();

    return (
        <ExpansionCard
            size="small"
            aria-labelledby={tittelId}
            onToggle={(open) =>
                loggUmamiEvent({
                    origin: appOrigin,
                    eventName: open ? 'readmore åpnet' : 'readmore lukket',
                    eventData: {
                        tittel: 'ArbeidsforholdOgInntektPanel.Definisjoner.Tittel',
                    },
                })
            }
        >
            <ExpansionCard.Header>
                <ExpansionCard.Title id={tittelId} size="small" as="h3">
                    <FormattedMessage id="ArbeidsforholdOgInntektPanel.Definisjoner.Tittel" />
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="space-20" className="p-2.5">
                    <Definisjon
                        icon={<PersonEnvelopeIcon aria-hidden fontSize="1.5rem" />}
                        tittel={<FormattedMessage id="ArbeidsforholdOgInntektPanel.Definisjoner.Selvstendig.Tittel" />}
                    >
                        <BodyShort size="small">
                            <FormattedMessage
                                id="ArbeidsforholdOgInntektPanel.Definisjoner.Selvstendig.Beskrivelse"
                                values={{
                                    a: (tekst) => (
                                        <Link href={links.næringsdrivendeInfoBoks} target="_blank" rel="noreferrer">
                                            {tekst}
                                        </Link>
                                    ),
                                }}
                            />
                        </BodyShort>
                    </Definisjon>
                    <Definisjon
                        icon={<TasklistIcon aria-hidden fontSize="1.5rem" />}
                        tittel={<FormattedMessage id="ArbeidsforholdOgInntektPanel.Definisjoner.Frilans.Tittel" />}
                    >
                        <BodyShort size="small">
                            <FormattedMessage
                                id="ArbeidsforholdOgInntektPanel.Definisjoner.Frilans.Beskrivelse"
                                values={{
                                    a: (tekst) => (
                                        <Link href={links.frilanserInfoBoks} target="_blank" rel="noreferrer">
                                            {tekst}
                                        </Link>
                                    ),
                                }}
                            />
                        </BodyShort>
                    </Definisjon>
                    <Definisjon
                        icon={<BoatIcon aria-hidden fontSize="1.5rem" />}
                        tittel={<FormattedMessage id="ArbeidsforholdOgInntektPanel.Definisjoner.Fisker.Tittel" />}
                    >
                        <VStack gap="space-20">
                            <BodyShort size="small">
                                <FormattedMessage id="ArbeidsforholdOgInntektPanel.Definisjoner.Fisker.Beskrivelse1" />
                            </BodyShort>
                            <BodyShort size="small">
                                <FormattedMessage id="ArbeidsforholdOgInntektPanel.Definisjoner.Fisker.Beskrivelse2" />
                            </BodyShort>
                        </VStack>
                    </Definisjon>
                    <Definisjon
                        icon={<BankNoteIcon aria-hidden fontSize="1.5rem" />}
                        tittel={<FormattedMessage id="ArbeidsforholdOgInntektPanel.Definisjoner.Annen.Tittel" />}
                    >
                        <BodyShort size="small">
                            <FormattedMessage id="ArbeidsforholdOgInntektPanel.Definisjoner.Annen.Beskrivelse" />
                        </BodyShort>
                    </Definisjon>
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export const ArbeidsforholdInformasjon = ({
    appOrigin,
    arbeidsforhold,
    frilansoppdrag,
    selvstendigNæring,
    egenNæring,
    andreInntektskilder,
    onRemoveAndreInntekt,
    onRemoveEgenNæring,
}: Props) => {
    const harArbeidsforhold = arbeidsforhold.length > 0;
    const intl = useIntl();

    return (
        <VStack gap="space-16">
            <BodyShort style={{ fontWeight: 'bold' }}>
                <FormattedMessage id="inntektsinformasjon.arbeidsforhold.label" />
            </BodyShort>
            {appOrigin === 'foreldrepengesoknad' && <ArbeidsforholdDefinisjoner appOrigin={appOrigin} />}
            <HarIkkeArbeidsforhold harArbeidsforhold={harArbeidsforhold} />
            <HarArbeidsforhold harArbeidsforhold={harArbeidsforhold} arbeidsforhold={arbeidsforhold} />
            <FrilansOppdrag frilansoppdrag={frilansoppdrag} />
            <SelvstendigNæring selvstendigNæring={selvstendigNæring} />
            <ManueltLagtTilNæring egenNæring={egenNæring} onRemove={onRemoveEgenNæring} />
            <AndreInntektskilderBox andreInntektskilder={andreInntektskilder} onRemove={onRemoveAndreInntekt} />
            <ReadMore
                variant="moderate"
                header={
                    <FormattedMessage
                        id="inntektsinformasjon.inntektsmelding.header"
                        values={{ antall: arbeidsforhold.length }}
                    />
                }
            >
                <FormattedMessage
                    id="inntektsinformasjon.inntektsmelding.body"
                    values={{ antall: arbeidsforhold.length }}
                />
            </ReadMore>
            <ReadMore
                variant="moderate"
                onOpenChange={(open) =>
                    loggUmamiEvent({
                        origin: appOrigin,
                        eventName: open ? 'readmore åpnet' : 'readmore lukket',
                        eventData: { tittel: 'inntektsinformasjon.arbeidsforhold.info' },
                    })
                }
                header={intl.formatMessage({ id: 'inntektsinformasjon.arbeidsforhold.info' })}
            >
                <BodyShort>
                    <FormattedMessage id="inntektsinformasjon.arbeidsforhold.tekst" />
                </BodyShort>
            </ReadMore>
        </VStack>
    );
};
