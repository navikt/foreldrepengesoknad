import { attenUkerTreDager, date21DaysAgo, Block, dateToday, hasValue, intlUtils } from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import Søkersituasjon from 'app/context/types/Søkersituasjon';
import links from 'app/links/links';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnetFormComponents, OmBarnetFormData, OmBarnetFormField } from '../omBarnetFormConfig';
import { kanSøkePåTermin } from '../omBarnetQuestionsConfig';
import { validateTerminbekreftelse, validateTermindato } from '../validation/omBarnetValidering';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { GuidePanel, Link, ReadMore } from '@navikt/ds-react';
interface Props {
    søkersituasjon: Søkersituasjon;
    formValues: OmBarnetFormData;
    visibility: QuestionVisibility<OmBarnetFormField, undefined>;
    søknadGjelderEtNyttBarn: boolean;
}

const Termin: FunctionComponent<Props> = ({ søkersituasjon, visibility, formValues, søknadGjelderEtNyttBarn }) => {
    const intl = useIntl();

    if (søkersituasjon.situasjon === 'adopsjon' || formValues.erBarnetFødt !== YesOrNo.NO || !søknadGjelderEtNyttBarn) {
        return null;
    }

    const søkerErFarMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const farMedMorSøkerPåTermin = søkerErFarMedmor && hasValue(formValues.termindato);
    const intlSpørsmålAntallBarnId = søkerErFarMedmor ? 'omBarnet.antallBarn.termin.far' : 'omBarnet.antallBarn.termin';

    const intlTerminbekreftelseId = søkerErFarMedmor
        ? 'omBarnet.veileder.terminbekreftelse.far'
        : 'omBarnet.veileder.terminbekreftelse';

    const intlTermindatoInfotekst = søkerErFarMedmor
        ? 'omBarnet.termindato.infotekst.farMedmor'
        : 'omBarnet.termindato.infotekst';
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
            <Block padBottom="xl" visible={visibility.isVisible(OmBarnetFormField.termindato)}>
                <ReadMore header={intlUtils(intl, 'omBarnet.termindato.åpneLabel')}>
                    {intlUtils(intl, intlTermindatoInfotekst)}
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
        </>
    );
};

export default Termin;
