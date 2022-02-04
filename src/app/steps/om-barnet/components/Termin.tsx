import {
    attenUkerTreDager,
    Block,
    date21DaysAgo,
    dateToday,
    hasValue,
    intlUtils,
    UtvidetInformasjon,
} from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import VeilederNormal from 'app/assets/VeilederNormal';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import Søkersituasjon from 'app/context/types/Søkersituasjon';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnetFormComponents, OmBarnetFormData, OmBarnetFormField } from '../omBarnetFormConfig';
import { kanSøkePåTermin } from '../omBarnetQuestionsConfig';
import { validateTerminbekreftelse, validateTermindato } from '../validation/omBarnetValidering';
import Lenke from 'nav-frontend-lenker';
import links from 'app/links/links';

interface Props {
    søkersituasjon: Søkersituasjon;
    formValues: OmBarnetFormData;
    visibility: QuestionVisibility<OmBarnetFormField, undefined>;
}

const Termin: FunctionComponent<Props> = ({ søkersituasjon, visibility, formValues }) => {
    const intl = useIntl();

    if (søkersituasjon.situasjon === 'adopsjon' || formValues.erBarnetFødt !== YesOrNo.NO) {
        return null;
    }

    const farMedMorSøkerPåTermin = isFarEllerMedmor(søkersituasjon.rolle) && hasValue(formValues.termindato);

    return (
        <>
            <Block padBottom="l" visible={visibility.isVisible(OmBarnetFormField.antallBarn)}>
                <OmBarnetFormComponents.RadioPanelGroup
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
                    useTwoColumns={true}
                    legend={intlUtils(intl, 'omBarnet.antallBarn.termin')}
                />
            </Block>
            <Block
                padBottom="l"
                visible={formValues.antallBarn !== undefined && parseInt(formValues.antallBarn, 10) >= 3}
            >
                <OmBarnetFormComponents.Select name={OmBarnetFormField.antallBarn}>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </OmBarnetFormComponents.Select>
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(OmBarnetFormField.termindato)}>
                <OmBarnetFormComponents.DatePicker
                    name={OmBarnetFormField.termindato}
                    label={intlUtils(intl, 'omBarnet.termindato.termin')}
                    placeholder={'dd.mm.åååå'}
                    description={
                        <UtvidetInformasjon apneLabel={intlUtils(intl, 'omBarnet.termindato.åpneLabel')}>
                            {intlUtils(intl, 'omBarnet.termindato.infotekst')}
                        </UtvidetInformasjon>
                    }
                    minDate={date21DaysAgo}
                    maxDate={attenUkerTreDager}
                    validate={validateTermindato(intl)}
                />
            </Block>
            {farMedMorSøkerPåTermin && !kanSøkePåTermin(søkersituasjon.rolle, formValues.termindato) && (
                <Block padBottom="l">
                    <Veilederpanel svg={<VeilederNormal transparentBackground={false} />}>
                        <FormattedMessage
                            id="omBarnet.veileder.termindato.medMorEllerFarKanIkkeSøke"
                            values={{
                                lenke: (
                                    <Lenke href={links.papirsøknad}>
                                        <FormattedMessage id="omBarnet.papirsøknad.lenke" />
                                    </Lenke>
                                ),
                            }}
                        />
                    </Veilederpanel>
                </Block>
            )}
            {farMedMorSøkerPåTermin && kanSøkePåTermin(søkersituasjon.rolle, formValues.termindato) && (
                <Block padBottom="l">
                    <Veilederpanel svg={<VeilederNormal transparentBackground={true} />}>
                        <FormattedMessage id="omBarnet.veileder.termindato.medMorEllerFarKanSøke" />
                    </Veilederpanel>
                </Block>
            )}
            <Block padBottom="l" visible={visibility.isVisible(OmBarnetFormField.terminbekreftelse)}>
                <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                    <FormattedMessage id="omBarnet.veileder.terminbekreftelse" />
                </Veilederpanel>
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(OmBarnetFormField.terminbekreftelse)}>
                <FormikFileUploader
                    label={intlUtils(intl, 'omBarnet.terminbekreftelse.lastopp')}
                    name={OmBarnetFormField.terminbekreftelse}
                    attachments={formValues.terminbekreftelse || []}
                    attachmentType={AttachmentType.TERMINBEKREFTELSE}
                    skjemanummer={Skjemanummer.TERMINBEKREFTELSE}
                />
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(OmBarnetFormField.terminbekreftelsedato)}>
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
