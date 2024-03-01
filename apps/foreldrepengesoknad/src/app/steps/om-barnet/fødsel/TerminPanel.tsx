import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, BodyShort, Heading, ReadMore, VStack } from '@navikt/ds-react';

import {
    Block,
    Søkersituasjon,
    andreAugust2022ReglerGjelder,
    attenUkerTreDager,
    date21DaysAgo,
    dateToday,
    erIUke22Pluss3,
    erMindreEnn3UkerSiden,
    isFarEllerMedmor,
} from '@navikt/fp-common';
import { Datepicker } from '@navikt/fp-form-hooks';
import { Arbeidsforhold, Søkerrolle } from '@navikt/fp-types';
import { isBeforeToday, isRequired, isValidDate } from '@navikt/fp-validation';

import { UfødtBarn } from '../OmBarnetFormValues';

export const getKanSøkePåTermin = (rolle: Søkerrolle, termindato: string): boolean => {
    if (!isFarEllerMedmor(rolle)) {
        return true;
    }
    return termindato ? andreAugust2022ReglerGjelder(termindato) : false;
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
                            validate={[
                                isRequired(intl.formatMessage({ id: 'valideringsfeil.omBarnet.termindato.duMåOppgi' })),
                                isValidDate(
                                    intl.formatMessage({ id: 'valideringsfeil.omBarnet.termindato.ugyldigDatoFormat' }),
                                ),
                                (termindato) => {
                                    if (!erMindreEnn3UkerSiden(termindato)) {
                                        return intl.formatMessage({
                                            id: 'valideringsfeil.omBarnet.termindato.forTidlig',
                                        });
                                    }

                                    if (!erIUke22Pluss3(termindato)) {
                                        return intl.formatMessage({
                                            id: 'valideringsfeil.omBarnet.termindato.duMåVæreIUke22',
                                        });
                                    }

                                    return undefined;
                                },
                            ]}
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
                </>
            )}
            {arbeidsforhold.length === 0 && kanSøkePåTermin && (
                <Datepicker
                    name="terminbekreftelsedato"
                    label={intl.formatMessage({ id: 'omBarnet.terminbekreftelseDato' })}
                    maxDate={dateToday}
                    validate={[
                        isRequired(
                            intl.formatMessage({ id: 'valideringsfeil.omBarnet.terminbekreftelseDato.duMåOppgi' }),
                        ),
                        isValidDate(
                            intl.formatMessage({
                                id: 'valideringsfeil.omBarnet.terminbekreftelseDato.ugyldigDatoFormat',
                            }),
                        ),
                        isBeforeToday(
                            intl.formatMessage({
                                id: 'valideringsfeil.omBarnet.terminbekreftelseDato.kanIkkeVæreFremITid',
                            }),
                        ),
                    ]}
                />
            )}
            {(erForTidligTilÅSøkePåTermin || (farMedMorSøkerPåTermin && !kanSøkePåTermin)) && (
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
