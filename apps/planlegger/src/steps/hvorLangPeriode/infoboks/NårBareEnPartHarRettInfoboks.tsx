import { PersonGroupIcon } from '@navikt/aksel-icons';
import Infobox from 'components/boxes/Infobox';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erMorDelAvSøknaden, finnSøker1Tekst, finnSøker2Tekst } from 'utils/HvemPlanleggerUtils';

import { BodyShort, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

interface Props {
    hvemPlanlegger: HvemPlanlegger;
    arbeidssituasjon: Arbeidssituasjon;
}

const NårBareEnPartHarRettInfoboks: FunctionComponent<Props> = ({ hvemPlanlegger, arbeidssituasjon }) => {
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
            isGray
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
                                a: (msg: any) => (
                                    <Link
                                        inlineText
                                        href={links.godkjentAktivitet}
                                        className="lenke"
                                        rel="noreferrer"
                                        target="_blank"
                                    >
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

export default NårBareEnPartHarRettInfoboks;
