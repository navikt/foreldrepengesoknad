import { Alert, BodyShort, GuidePanel, Heading, Link, ReadMore, VStack } from '@navikt/ds-react';
import {
    Arbeidsforhold,
    Block,
    Søkersituasjon,
    andreAugust2022ReglerGjelder,
    attenUkerTreDager,
    date21DaysAgo,
    dateToday,
    erIUke22Pluss3,
    hasValue,
    isFarEllerMedmor,
    links,
} from '@navikt/fp-common';
import { Datepicker } from '@navikt/fp-form-hooks';
import { Søkerrolle } from '@navikt/fp-types';
import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { validateTerminbekreftelse, validateTermindato } from '../validation/omBarnetValidering';
import { UfødtBarn } from './OmBarnetFormValues';

const getKanSøkePåTermin = (rolle: Søkerrolle, termindato: string): boolean => {
    if (!isFarEllerMedmor(rolle)) {
        return true;
    }
    return hasValue(termindato) ? andreAugust2022ReglerGjelder(termindato) : false;
};

interface Props {
    søkersituasjon: Søkersituasjon;
    arbeidsforhold: Arbeidsforhold[];
    søknadGjelderEtNyttBarn?: boolean;
}

const TerminPanel: FunctionComponent<Props> = ({ søkersituasjon, arbeidsforhold, søknadGjelderEtNyttBarn }) => {
    const intl = useIntl();

    const formMethods = useFormContext<UfødtBarn>();
    const termindato = formMethods.watch('termindato');

    const erForTidligTilÅSøkePåTermin = termindato ? !erIUke22Pluss3(termindato) : false;

    const søkerErFarMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const farMedMorSøkerPåTermin = søkerErFarMedmor && termindato;
    const kanSøkePåTermin = getKanSøkePåTermin(søkersituasjon.rolle, termindato);

    return (
        <>
            {søknadGjelderEtNyttBarn && (
                <>
                    <VStack gap="2">
                        <Datepicker
                            name="termindato"
                            label={intl.formatMessage({ id: 'omBarnet.termindato.termin' })}
                            minDate={date21DaysAgo}
                            maxDate={attenUkerTreDager}
                            validate={[validateTermindato(intl)]}
                            //valider erForTidligTilÅSøkePåTermin
                        />
                        {!søkerErFarMedmor && (
                            <ReadMore header={intl.formatMessage({ id: 'omBarnet.termindato.åpneLabel' })}>
                                <Block padBottom="m">
                                    <FormattedMessage id="omBarnet.termindato.innhold.del1" />
                                </Block>
                                <FormattedMessage id="omBarnet.termindato.innhold.del2" />
                            </ReadMore>
                        )}
                    </VStack>
                    {farMedMorSøkerPåTermin && !kanSøkePåTermin && (
                        <GuidePanel>
                            <FormattedMessage
                                id="omBarnet.veileder.medMorEllerFarTermin"
                                values={{
                                    lenke: (
                                        <Link href={links.papirsøknad}>
                                            <FormattedMessage id="omBarnet.papirsøknad.lenke" />
                                        </Link>
                                    ),
                                }}
                            />
                        </GuidePanel>
                    )}
                </>
            )}
            {arbeidsforhold.length === 0 && kanSøkePåTermin && (
                <Datepicker
                    name="terminbekreftelsedato"
                    label={intl.formatMessage({ id: 'omBarnet.terminbekreftelseDato' })}
                    maxDate={dateToday}
                    validate={[validateTerminbekreftelse(intl)]}
                />
            )}
            {erForTidligTilÅSøkePåTermin && (
                <Alert variant="warning">
                    <VStack gap="4">
                        <Heading level="3" size="small">
                            <FormattedMessage id="omBarnet.termindato.erForTidligTilÅSøkePåTermin.heading" />
                        </Heading>
                        <BodyShort>
                            <FormattedMessage id="omBarnet.termindato.erForTidligTilÅSøkePåTermin.innhold" />
                        </BodyShort>
                    </VStack>
                </Alert>
            )}
        </>
    );
};

export default TerminPanel;
