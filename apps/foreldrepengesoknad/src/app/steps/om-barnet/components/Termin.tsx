import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { isISODateString } from '@navikt/ds-datepicker';
import { Alert, BodyShort, GuidePanel, Heading, Link, ReadMore } from '@navikt/ds-react';

import {
    Block,
    Søkersituasjon,
    attenUkerTreDager,
    date21DaysAgo,
    dateToday,
    erIUke22Pluss3,
    hasValue,
    intlUtils,
    isFarEllerMedmor,
    links,
} from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';

import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';

import { OmBarnetFormComponents, OmBarnetFormData, OmBarnetFormField } from '../omBarnetFormConfig';
import { kanSøkePåTermin } from '../omBarnetQuestionsConfig';
import { validateTerminbekreftelse, validateTermindato } from '../validation/omBarnetValidering';

interface Props {
    søkersituasjon: Søkersituasjon;
    formValues: OmBarnetFormData;
    visibility: QuestionVisibility<OmBarnetFormField, undefined>;
    søknadGjelderEtNyttBarn: boolean;
    setErForTidligTilÅSøkePåTermin: (val: boolean) => void;
}

const Termin: FunctionComponent<Props> = ({
    søkersituasjon,
    visibility,
    formValues,
    søknadGjelderEtNyttBarn,
    setErForTidligTilÅSøkePåTermin,
}) => {
    const intl = useIntl();

    if (søkersituasjon.situasjon === 'adopsjon' || formValues.erBarnetFødt !== YesOrNo.NO || !søknadGjelderEtNyttBarn) {
        return null;
    }

    const erForTidligTilÅSøkePåTermin =
        hasValue(formValues.termindato) && isISODateString(formValues.termindato)
            ? !erIUke22Pluss3(formValues.termindato)
            : false;
    setErForTidligTilÅSøkePåTermin(erForTidligTilÅSøkePåTermin);

    const søkerErFarMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const farMedMorSøkerPåTermin = søkerErFarMedmor && hasValue(formValues.termindato);
    const intlSpørsmålAntallBarnId = søkerErFarMedmor ? 'omBarnet.antallBarn.termin.far' : 'omBarnet.antallBarn.termin';

    const intlTerminbekreftelseId = søkerErFarMedmor
        ? 'omBarnet.veileder.terminbekreftelse.far'
        : 'omBarnet.veileder.terminbekreftelse';

    return (
        <>
            <Block padBottom="xl" visible={visibility.isVisible(OmBarnetFormField.antallBarn)}>
                <OmBarnetFormComponents.RadioGroup
                    name={OmBarnetFormField.antallBarn}
                    radios={[
                        {
                            label: intlUtils(intl, 'omBarnet.radiobutton.ettBarn'),
                            value: '1',
                        },
                        {
                            label: intlUtils(intl, 'omBarnet.radiobutton.tvillinger'),
                            value: '2',
                        },
                        {
                            label: intlUtils(intl, 'omBarnet.radiobutton.flere'),
                            value: '3',
                        },
                    ]}
                    legend={intlUtils(intl, intlSpørsmålAntallBarnId)}
                />
            </Block>
            <Block
                padBottom="xl"
                visible={formValues.antallBarn !== undefined && parseInt(formValues.antallBarn, 10) >= 3}
            >
                <OmBarnetFormComponents.Select label="Antall barn" name={OmBarnetFormField.antallBarnSelect}>
                    <option value="" />
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </OmBarnetFormComponents.Select>
            </Block>
            <Block padBottom="s" visible={visibility.isVisible(OmBarnetFormField.termindato)}>
                <OmBarnetFormComponents.DatePicker
                    name={OmBarnetFormField.termindato}
                    label={intlUtils(intl, 'omBarnet.termindato.termin')}
                    placeholder={'dd.mm.åååå'}
                    minDate={date21DaysAgo}
                    maxDate={attenUkerTreDager}
                    validate={validateTermindato(intl)}
                />
            </Block>
            <Block padBottom="xl" visible={visibility.isVisible(OmBarnetFormField.termindato) && !søkerErFarMedmor}>
                <ReadMore header={intlUtils(intl, 'omBarnet.termindato.åpneLabel')}>
                    <Block padBottom="m">
                        <FormattedMessage id="omBarnet.termindato.innhold.del1" />
                    </Block>
                    <FormattedMessage id="omBarnet.termindato.innhold.del2" />
                </ReadMore>
            </Block>

            {farMedMorSøkerPåTermin && !kanSøkePåTermin(søkersituasjon.rolle, formValues.termindato) && (
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

            <Block padBottom="xl" visible={visibility.isVisible(OmBarnetFormField.terminbekreftelse)}>
                <GuidePanel>
                    <FormattedMessage id={intlTerminbekreftelseId} />
                </GuidePanel>
            </Block>
            <Block padBottom="xl" visible={visibility.isVisible(OmBarnetFormField.terminbekreftelse)}>
                <FormikFileUploader
                    legend="Dokumentasjon om terminbekreftelse"
                    label={intlUtils(intl, 'omBarnet.terminbekreftelse.lastOpp')}
                    name={OmBarnetFormField.terminbekreftelse}
                    attachments={formValues.terminbekreftelse || []}
                    attachmentType={AttachmentType.TERMINBEKREFTELSE}
                    skjemanummer={Skjemanummer.TERMINBEKREFTELSE}
                />
            </Block>
            <Block padBottom="xl" visible={visibility.isVisible(OmBarnetFormField.terminbekreftelsedato)}>
                <OmBarnetFormComponents.DatePicker
                    name={OmBarnetFormField.terminbekreftelsedato}
                    label={intlUtils(intl, 'omBarnet.terminbekreftelseDato')}
                    placeholder={'dd.mm.åååå'}
                    validate={validateTerminbekreftelse(intl)}
                    maxDate={dateToday}
                />
            </Block>
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
