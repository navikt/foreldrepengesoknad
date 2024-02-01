import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { isISODateString } from '@navikt/ds-datepicker';
import { Alert, BodyShort, GuidePanel, Heading, Link, Radio, ReadMore } from '@navikt/ds-react';

import {
    Block,
    RegistrertBarn,
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

const kanSøkePåTermin = (rolle: Søkerrolle, termindato: string): boolean => {
    if (!isFarEllerMedmor(rolle)) {
        return true;
    }
    return hasValue(termindato) ? andreAugust2022ReglerGjelder(new Date(termindato)) : false;
};

interface Props {
    søkersituasjon: Søkersituasjon;
    valgteBarn?: RegistrertBarn[];
}

const Termin: FunctionComponent<Props> = ({ søkersituasjon, valgteBarn }) => {
    const intl = useIntl();

    const formMethods = useFormContext<OmBarnetFormValues>();

    const { termindato, erBarnetFødt, adopsjonAvEktefellesBarn, fødselsdatoer, antallBarn, adopsjonsdato } =
        formMethods.watch();

    const erForTidligTilÅSøkePåTermin =
        hasValue(termindato) && isISODateString(termindato) ? !erIUke22Pluss3(termindato) : false;

    const søkerErFarMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const farMedMorSøkerPåTermin = søkerErFarMedmor && hasValue(termindato);

    const intlTerminbekreftelseId = søkerErFarMedmor
        ? 'omBarnet.veileder.terminbekreftelse.far'
        : 'omBarnet.veileder.terminbekreftelse';

    return (
        <>
            {(erBarnetFødt !== undefined || (adopsjonAvEktefellesBarn !== undefined && hasValue(adopsjonsdato))) && (
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
            <Block padBottom="xl" visible={antallBarn !== undefined && parseInt(antallBarn, 10) >= 3}>
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
            {((fødselsdatoer && hasValue(fødselsdatoer[0].dato)) ||
                (erBarnetFødt === false && hasValue(antallBarn)) ||
                (valgteBarn !== undefined && valgteBarn.length > 0)) && (
                <>
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
                </>
            )}
            {farMedMorSøkerPåTermin && !kanSøkePåTermin(søkersituasjon.rolle, termindato) && (
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
            {hasValue(termindato) && (
                <>
                    <Block padBottom="xl">
                        <GuidePanel>
                            <FormattedMessage id={intlTerminbekreftelseId} />
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
            {hasValue(termindato) && (
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
