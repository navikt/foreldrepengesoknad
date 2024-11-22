import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { getAktiveArbeidsforhold } from 'utils/arbeidsforholdUtils';
import { andreAugust2022ReglerGjelder } from 'utils/dateUtils';
import isFarEllerMedmor from 'utils/isFarEllerMedmor';
import {
    attenUkerTreDager,
    date21DaysAgo,
    dateToday,
    erIUke22Pluss3,
    erMindreEnn3UkerSiden,
} from 'utils/validationUtil';

import { Alert, BodyShort, Heading, ReadMore, VStack } from '@navikt/ds-react';

import { Søkersituasjon } from '@navikt/fp-common';
import { ISO_DATE_REGEX } from '@navikt/fp-constants';
import { RhfDatepicker } from '@navikt/fp-form-hooks';
import { Arbeidsforhold, Søkerrolle } from '@navikt/fp-types';
import { isBeforeToday, isRequired, isValidDate } from '@navikt/fp-validation';

import { UfødtBarn } from '../OmBarnetFormValues';

const getKanSøkePåTermin = (rolle: Søkerrolle, termindato: string): boolean => {
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

    const aktiveArbeidsforhold =
        termindato && ISO_DATE_REGEX.test(termindato)
            ? getAktiveArbeidsforhold(
                  arbeidsforhold,
                  søkersituasjon.situasjon === 'adopsjon',
                  isFarEllerMedmor(søkersituasjon.rolle),
                  termindato,
              )
            : arbeidsforhold;

    return (
        <>
            {søknadGjelderEtNyttBarn && (
                <VStack gap="2">
                    <RhfDatepicker
                        name="termindato"
                        label={intl.formatMessage({ id: 'omBarnet.termindato.termin' })}
                        minDate={date21DaysAgo}
                        maxDate={attenUkerTreDager}
                        useStrategyAbsolute
                        validate={[
                            isRequired(intl.formatMessage({ id: 'valideringsfeil.omBarnet.termindato.duMåOppgi' })),
                            isValidDate(
                                intl.formatMessage({ id: 'valideringsfeil.omBarnet.termindato.ugyldigDatoFormat' }),
                            ),
                            (termindatoVerdi) => {
                                if (!erMindreEnn3UkerSiden(termindatoVerdi)) {
                                    return intl.formatMessage({
                                        id: 'valideringsfeil.omBarnet.termindato.forTidlig',
                                    });
                                }

                                if (!erIUke22Pluss3(termindatoVerdi)) {
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
                            <VStack gap="2">
                                <BodyShort>
                                    <FormattedMessage id="omBarnet.termindato.innhold.del1" />
                                </BodyShort>
                                <BodyShort>
                                    <FormattedMessage id="omBarnet.termindato.innhold.del2" />
                                </BodyShort>
                            </VStack>
                        </ReadMore>
                    )}
                </VStack>
            )}
            {søknadGjelderEtNyttBarn && aktiveArbeidsforhold.length === 0 && kanSøkePåTermin && (
                <RhfDatepicker
                    name="terminbekreftelsedato"
                    label={intl.formatMessage({ id: 'omBarnet.terminbekreftelseDato' })}
                    maxDate={dateToday}
                    useStrategyAbsolute
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
