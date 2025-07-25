import { PersonGroupIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erMorDelAvSøknaden, finnSøker1Tekst, finnSøker2Tekst } from 'utils/HvemPlanleggerUtils';

import { BodyShort, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Infobox } from '@navikt/fp-ui';

interface Props {
    hvemPlanlegger: HvemPlanlegger;
    arbeidssituasjon: Arbeidssituasjon;
}

export const NårBareEnPartHarRettInfoboks = ({ hvemPlanlegger, arbeidssituasjon }: Props) => {
    const intl = useIntl();

    const søker1HarIkkeRett =
        arbeidssituasjon.status === Arbeidsstatus.INGEN || arbeidssituasjon.status === Arbeidsstatus.UFØR;

    const søker2HarIkkeRett = arbeidssituasjon.jobberAnnenPart === false;

    return (
        <Infobox
            header={
                <FormattedMessage
                    id="HvorLangPeriodeSteg.Infoboks.NårBareEnPartHarRett"
                    values={{
                        hvem: søker1HarIkkeRett
                            ? finnSøker2Tekst(intl, hvemPlanlegger)
                            : finnSøker1Tekst(intl, hvemPlanlegger),
                    }}
                />
            }
            icon={<PersonGroupIcon height={24} width={24} color="#020C1CAD" fontSize="1.5rem" aria-hidden />}
            color="gray"
        >
            {søker2HarIkkeRett && (
                <VStack gap="2">
                    <BodyShort>
                        <FormattedMessage
                            id="HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.FårHelePerioden"
                            values={{ hvem: finnSøker1Tekst(intl, hvemPlanlegger) }}
                        />
                    </BodyShort>
                    <BodyShort>
                        <FormattedMessage
                            id="HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.IngenKravTilFar"
                            values={{
                                hvem: finnSøker2Tekst(intl, hvemPlanlegger),
                                hvem2: finnSøker1Tekst(intl, hvemPlanlegger),
                            }}
                        />
                    </BodyShort>
                </VStack>
            )}
            {søker1HarIkkeRett && (
                <VStack gap="2">
                    <BodyShort>
                        <FormattedMessage
                            id="HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.KanFåhelePerioden"
                            values={{
                                hvem: finnSøker2Tekst(intl, hvemPlanlegger),
                                hvem2: finnSøker1Tekst(intl, hvemPlanlegger),
                            }}
                        />
                    </BodyShort>
                    <BodyShort>
                        <FormattedMessage
                            id="HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.IngenKravTilMor"
                            values={{
                                a: (msg) => (
                                    <Link inlineText href={links.godkjentAktivitet} rel="noreferrer" target="_blank">
                                        {msg}
                                    </Link>
                                ),
                                hvem: finnSøker2Tekst(intl, hvemPlanlegger),
                                erMorHovedsøker: erMorDelAvSøknaden(hvemPlanlegger),
                            }}
                        />
                    </BodyShort>
                </VStack>
            )}
        </Infobox>
    );
};
