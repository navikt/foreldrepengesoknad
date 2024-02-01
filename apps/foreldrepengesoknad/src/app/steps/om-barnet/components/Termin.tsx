import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, BodyShort, GuidePanel, Heading, Link, Radio, ReadMore } from '@navikt/ds-react';

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
    intlUtils,
    isFarEllerMedmor,
    links,
} from '@navikt/fp-common';
import { Datepicker, RadioGroup, Select } from '@navikt/fp-form-hooks';
import { Søkerrolle } from '@navikt/fp-types';

import { validateTerminbekreftelse, validateTermindato } from '../validation/omBarnetValidering';
import { OmBarnetFormValues } from './OmBarnetFormValues';

const getKanSøkePåTermin = (rolle: Søkerrolle, termindato: string): boolean => {
    if (!isFarEllerMedmor(rolle)) {
        return true;
    }
    return hasValue(termindato) ? andreAugust2022ReglerGjelder(new Date(termindato)) : false;
};

interface Props {
    søkersituasjon: Søkersituasjon;
    arbeidsforhold: Arbeidsforhold[];
    søknadGjelderEtNyttBarn?: boolean;
}

const Termin: FunctionComponent<Props> = ({ søkersituasjon, arbeidsforhold, søknadGjelderEtNyttBarn }) => {
    const intl = useIntl();

    const formMethods = useFormContext<OmBarnetFormValues>();
    const { termindato, antallBarn } = formMethods.watch();

    const erForTidligTilÅSøkePåTermin = termindato && termindato ? !erIUke22Pluss3(termindato) : false;

    const søkerErFarMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const farMedMorSøkerPåTermin = søkerErFarMedmor && termindato;

    const kanSøkerPåTermin = getKanSøkePåTermin(søkersituasjon.rolle, termindato);

    return (
        <>
            {søknadGjelderEtNyttBarn && (
                <Block padBottom="xl">
                    <RadioGroup
                        name="antallBarn"
                        label={
                            søkerErFarMedmor
                                ? intl.formatMessage({ id: 'omBarnet.antallBarn.termin.far' })
                                : intl.formatMessage({ id: 'omBarnet.antallBarn.termin' })
                        }
                        // validate={[
                        //     isRequired(
                        //         intl.formatMessage({
                        //             id: 'valideringsfeil.annenForelder',
                        //         }),
                        //     ),
                        // ]}
                    >
                        <Radio value="1">
                            <FormattedMessage id="omBarnet.radiobutton.ettBarn" />
                        </Radio>
                        <Radio value="2">
                            <FormattedMessage id="omBarnet.radiobutton.tvillinger" />
                        </Radio>
                        <Radio value="3">
                            <FormattedMessage id="omBarnet.radiobutton.flere" />
                        </Radio>
                    </RadioGroup>
                </Block>
            )}
            {antallBarn && parseInt(antallBarn, 10) >= 3 && (
                <Block padBottom="xl">
                    <Select name="antallBarnSelect" label="Antall barn">
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </Select>
                </Block>
            )}
            <Block padBottom="s">
                <Datepicker
                    name="termindato"
                    label={intl.formatMessage({ id: 'omBarnet.termindato.termin' })}
                    minDate={date21DaysAgo}
                    maxDate={attenUkerTreDager}
                    validate={[validateTermindato(intl)]}
                    //valider erForTidligTilÅSøkePåTermin
                />
            </Block>
            {!søkerErFarMedmor && (
                <Block padBottom="xl">
                    <ReadMore header={intlUtils(intl, 'omBarnet.termindato.åpneLabel')}>
                        <Block padBottom="m">
                            <FormattedMessage id="omBarnet.termindato.innhold.del1" />
                        </Block>
                        <FormattedMessage id="omBarnet.termindato.innhold.del2" />
                    </ReadMore>
                </Block>
            )}
            {farMedMorSøkerPåTermin && !kanSøkerPåTermin && (
                <Block padBottom="xl">
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
                </Block>
            )}
            {termindato && (
                <>
                    <Block padBottom="xl">
                        <GuidePanel>
                            <FormattedMessage
                                id={
                                    søkerErFarMedmor
                                        ? 'omBarnet.veileder.terminbekreftelse.far'
                                        : 'omBarnet.veileder.terminbekreftelse'
                                }
                            />
                        </GuidePanel>
                    </Block>
                    {/* <Block padBottom="xl">
                <FormikFileUploader
                    legend="Dokumentasjon om terminbekreftelse"
                    label={intlUtils(intl, 'omBarnet.terminbekreftelse.lastOpp')}
                    name={OmBarnetFormField.terminbekreftelse}
                    attachments={formValues.terminbekreftelse || []}
                    attachmentType={AttachmentType.TERMINBEKREFTELSE}
                    skjemanummer={Skjemanummer.TERMINBEKREFTELSE}
                />
            </Block> */}
                </>
            )}
            {termindato && arbeidsforhold.length === 0 && kanSøkerPåTermin && (
                <Block padBottom="xl">
                    <Datepicker
                        name="terminbekreftelsedato"
                        label={intl.formatMessage({ id: 'omBarnet.terminbekreftelseDato' })}
                        maxDate={dateToday}
                        validate={[validateTerminbekreftelse(intl)]}
                    />
                </Block>
            )}
            {erForTidligTilÅSøkePåTermin && (
                <Block padBottom="xl">
                    <Alert variant="warning">
                        <Block padBottom="m">
                            <Heading level="3" size="small">
                                <FormattedMessage id="omBarnet.termindato.erForTidligTilÅSøkePåTermin.heading" />
                            </Heading>
                        </Block>
                        <BodyShort>
                            <FormattedMessage id="omBarnet.termindato.erForTidligTilÅSøkePåTermin.innhold" />
                        </BodyShort>
                    </Alert>
                </Block>
            )}
        </>
    );
};

export default Termin;
