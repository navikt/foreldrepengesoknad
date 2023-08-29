import { Accordion, BodyShort } from '@navikt/ds-react';
import { Block, Step, formatDate, intlUtils } from '@navikt/fp-common';
import useSøknad from 'app/utils/hooks/useSøknad';
import { useIntl } from 'react-intl';
import stepConfig from '../stepsConfig';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import ArbeidsforholdInformasjon from '../inntektsinformasjon/components/arbeidsforhold-informasjon/ArbeidsforholdInformasjon';
import { getAktiveArbeidsforhold } from 'app/utils/arbeidsforholdUtils';

const Oppsummering = () => {
    const søknad = useSøknad();
    const { barn, informasjonOmUtenlandsopphold } = søknad;
    const søkerinfo = useSøkerinfo();
    const { arbeidsforhold } = søkerinfo;
    const intl = useIntl();
    const formatertTermindato = formatDate(barn.termindato);

    console.log(søknad);

    return (
        <Step
            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
            activeStepId="oppsummering"
            pageTitle="Oppsummering"
            steps={stepConfig(intl)}
        >
            <Accordion>
                <Accordion.Item defaultOpen={true}>
                    <Accordion.Header>Deg</Accordion.Header>
                    <Accordion.Content>
                        <Block padBottom="xl" margin="m">
                            <BodyShort>{`${søkerinfo.person.fornavn} ${søkerinfo.person.etternavn}`}</BodyShort>
                        </Block>
                        <BodyShort>{søkerinfo.person.fnr}</BodyShort>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item defaultOpen={true}>
                    <Accordion.Header>Barnet</Accordion.Header>
                    <Accordion.Content>
                        <Block margin="m">
                            <BodyShort>{`Termindato: ${formatertTermindato}`}</BodyShort>
                        </Block>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item defaultOpen={true}>
                    <Accordion.Header>Utenlandsopphold</Accordion.Header>
                    <Accordion.Content>
                        <Block margin="m" padBottom="xl">
                            <BodyShort>
                                {informasjonOmUtenlandsopphold.iNorgeSiste12Mnd
                                    ? 'Du har bodd i Norge de siste 12 månedene'
                                    : 'Du har oppholdt deg i utlandet i de siste 12 månedene'}
                            </BodyShort>
                        </Block>
                        <Block padBottom="xl">
                            <BodyShort>
                                {informasjonOmUtenlandsopphold.iNorgeNeste12Mnd
                                    ? 'Du skal bo i Norge de neste 12 månedene'
                                    : 'Du skal oppholde deg i utlandet de neste 12 månedene'}
                            </BodyShort>
                        </Block>
                        <BodyShort>
                            {informasjonOmUtenlandsopphold.iNorgePåHendelsestidspunktet
                                ? 'På fødselstidspunktet kommer du til å bo i Norge'
                                : 'På fødselstidpunktet kommer du ikke til å bo i Norge'}
                        </BodyShort>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item defaultOpen={true}>
                    <Accordion.Header>Arbeidsforhold</Accordion.Header>
                    <Accordion.Content>
                        <ArbeidsforholdInformasjon
                            visManglerInfo={false}
                            arbeidsforhold={getAktiveArbeidsforhold(arbeidsforhold, barn.termindato)}
                        />
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item defaultOpen={true}>
                    <Accordion.Header>Periode med svangerskapspenger</Accordion.Header>
                    <Accordion.Content>
                        <Block margin="m">
                            <BodyShort>{`Termindato: ${formatertTermindato}`}</BodyShort>
                        </Block>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </Step>
    );
};

export default Oppsummering;
