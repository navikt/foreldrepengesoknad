import { TasklistStartIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextComplete } from 'appData/PlanleggerDataContext';
import { FormattedMessage } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { erBarnetAdoptert, erBarnetFødt } from 'utils/barnetUtils';

import { BodyShort, LinkCard, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Infobox } from '@navikt/fp-ui';
import { encodeToBase64, erLokaltEllerDev } from '@navikt/fp-utils';

interface Props {
    erAlenesøker: boolean;
    barnet: OmBarnet;
}

export const SøkOmForeldrepenger = ({ erAlenesøker, barnet }: Props) => {
    const planleggerState = useContextComplete();
    const harDataÅOverføre = Object.values(planleggerState).some((v) => v !== undefined);
    // Funksjonen er foreløpig kun aktiv lokalt og i dev for testing — ikke i prod.
    const skalSendeDataViaUrl = erLokaltEllerDev() && harDataÅOverføre;
    const søknadHref = skalSendeDataViaUrl
        ? `${links.foreldrepengesoknad}?planleggerData=${encodeURIComponent(
              encodeToBase64(JSON.stringify(sanitizePlanleggerState(planleggerState))),
          )}`
        : links.foreldrepengesoknad;

    return (
        <Infobox
            header={<FormattedMessage id="SøkOmForeldrepenger.Tittel" values={{ erAlenesøker }} />}
            color="gray"
            icon={<TasklistStartIcon aria-hidden height={24} width={24} />}
        >
            <VStack gap="space-16">
                <BodyShort>
                    <FormattedMessage
                        id="SøkOmForeldrepenger.BasertPå"
                        values={{
                            erAlenesøker,
                            erAdopsjon: erBarnetAdoptert(barnet),
                            erFødt: erBarnetFødt(barnet),
                        }}
                    />
                </BodyShort>
                <VStack gap="space-16">
                    <LinkCard data-color="accent">
                        <LinkCard.Title>
                            <LinkCard.Anchor href={søknadHref}>
                                <FormattedMessage id="SøkOmForeldrepenger.SendDigitalt" />
                            </LinkCard.Anchor>
                        </LinkCard.Title>
                        <LinkCard.Description>
                            <FormattedMessage id="SøkOmForeldrepenger.SendDigitaltBeskrivelse" />
                        </LinkCard.Description>
                    </LinkCard>
                    <LinkCard data-color="accent">
                        <LinkCard.Title>
                            <LinkCard.Anchor href="https://www.nav.no/start/soknad-foreldrepenger?stegvalg=1">
                                <FormattedMessage id="SøkOmForeldrepenger.SendIPosten" />
                            </LinkCard.Anchor>
                        </LinkCard.Title>
                        <LinkCard.Description>
                            <FormattedMessage id="SøkOmForeldrepenger.SendIPostenBeskrivelse" />
                        </LinkCard.Description>
                    </LinkCard>
                </VStack>
            </VStack>
        </Infobox>
    );
};

// Felter som skal utelates fra payloaden som sendes til søknaden
const EKSKLUDERTE_FELTER: readonly ContextDataType[] = [
    ContextDataType.HVOR_MYE,
    ContextDataType.ARBEIDSSITUASJON,
    ContextDataType.HVEM_PLANLEGGER,
];

const sanitizePlanleggerState = (state: ReturnType<typeof useContextComplete>) => {
    const result: Record<string, unknown> = {};
    for (const key of Object.values(ContextDataType)) {
        if (EKSKLUDERTE_FELTER.includes(key)) {
            continue;
        }
        const value = state[key];
        if (value !== undefined) {
            result[key] = value;
        }
    }
    return result;
};
