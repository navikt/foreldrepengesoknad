import { PersonGroupIcon } from '@navikt/aksel-icons';
import Infobox from 'components/boxes/Infobox';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erMorDelAvSøknaden, finnAnnenPartTekst, finnSøkerTekst } from 'utils/HvemPlanleggerUtils';

import { BodyLong, Link, VStack } from '@navikt/ds-react';

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
                            ? finnAnnenPartTekst(intl, hvemPlanlegger)
                            : finnSøkerTekst(intl, hvemPlanlegger),
                    }}
                />
            }
            icon={<PersonGroupIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" aria-hidden />}
            isGray
        >
            {søker2HarIkkeRett && (
                <VStack gap="2">
                    <BodyLong>
                        <FormattedMessage
                            id="HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.FårHelePerioden"
                            values={{ hvem: finnSøkerTekst(intl, hvemPlanlegger) }}
                        />
                    </BodyLong>
                    <BodyLong>
                        <FormattedMessage
                            id="HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.IngenKravTilFar"
                            values={{
                                hvem: finnAnnenPartTekst(intl, hvemPlanlegger),
                                hvem2: finnSøkerTekst(intl, hvemPlanlegger),
                            }}
                        />
                    </BodyLong>
                </VStack>
            )}
            {søker1HarIkkeRett && (
                <VStack gap="2">
                    <BodyLong>
                        <FormattedMessage
                            id="HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.KanFåhelePerioden"
                            values={{
                                hvem: finnAnnenPartTekst(intl, hvemPlanlegger),
                                hvem2: finnSøkerTekst(intl, hvemPlanlegger),
                            }}
                        />
                    </BodyLong>
                    <BodyLong>
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
                                hvem: finnAnnenPartTekst(intl, hvemPlanlegger),
                                erMorHovedsøker: erMorDelAvSøknaden(hvemPlanlegger),
                            }}
                        />
                    </BodyLong>
                </VStack>
            )}
        </Infobox>
    );
};

export default NårBareEnPartHarRettInfoboks;
