import { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { bemUtils, LanguageToggle, intlUtils, Block, Locale, useDocumentTitle } from '@navikt/fp-common';
import { Alert, BodyShort, Button, GuidePanel, Heading, Modal, ReadMore } from '@navikt/ds-react';
import { lenker } from 'util/lenker';
import {
    initialVelkommenValues,
    VelkommenFormComponents,
    VelkommenFormData,
    VelkommenFormField,
} from './velkommenFormConfig';
import actionCreator from 'app/context/action/actionCreator';
import { useNavigate } from 'react-router-dom';
import { useEngangsstønadContext } from 'app/context/hooks/useEngangsstønadContext';
import Personopplysninger from 'app/components/modal-content/Personopplysninger';
import Plikter from 'app/components/modal-content/Plikter';
import { logAmplitudeEvent } from 'app/amplitude/amplitude';

import './velkommen.less';
import { PageKeys } from 'app/types/PageKeys';

interface Props {
    fornavn: string;
    onChangeLocale: (locale: Locale) => void;
    locale: Locale;
}

const Velkommen: FunctionComponent<Props> = ({ locale, onChangeLocale }) => {
    const intl = useIntl();
    const bem = bemUtils('velkommen');
    const navigate = useNavigate();
    useDocumentTitle(intlUtils(intl, 'velkommen.standard.dokumenttittel'));
    const { dispatch } = useEngangsstønadContext();

    logAmplitudeEvent('sidevisning', {
        app: 'engangsstonadny',
        team: 'foreldrepenger',
        pageKey: PageKeys.Velkommen,
    });

    const onValidSubmit = (values: Partial<VelkommenFormData>) => {
        dispatch(
            actionCreator.setVelkommen({
                harForståttRettigheterOgPlikter: values.harForståttRettigheterOgPlikter!,
            }),
        );
        navigate('/soknad/søkersituasjon');
    };

    const [PersonopplysningerModalOpen, setPersonopplysningerModalOpen] = useState<boolean>(false);

    return (
        <VelkommenFormComponents.FormikWrapper
            initialValues={initialVelkommenValues}
            onSubmit={(values: any) => onValidSubmit(values)}
            renderForm={() => {
                return (
                    <VelkommenFormComponents.Form includeButtons={false}>
                        <LanguageToggle
                            locale={locale}
                            availableLocales={['en', 'nb', 'nn']}
                            toggle={(l: Locale) => onChangeLocale(l)}
                        />
                        <div className={bem.block}>
                            <Block padBottom="s">
                                <div className={bem.element('tittel')}>
                                    <Heading size="large">
                                        {intlUtils(intl, 'velkommen.standard.velkommentittel')}
                                    </Heading>
                                </div>
                            </Block>
                            <Block padBottom="l">
                                <GuidePanel poster>
                                    <Block padBottom="m">
                                        <FormattedMessage id="velkommen.standard.ingress" />
                                    </Block>
                                    <Block padBottom="m">
                                        <ul>
                                            <li>
                                                <FormattedMessage id={'velkommen.standard.bobletekst.del1'} />
                                            </li>
                                            <li>
                                                <FormattedMessage id={'velkommen.standard.bobletekst.del2'} />
                                            </li>
                                        </ul>
                                    </Block>
                                </GuidePanel>
                            </Block>
                            <Block padBottom="xl">
                                <Alert variant="info">
                                    <FormattedMessage id="velkommen.text.veiviser" />
                                    <div className={bem.element('veiviserLenke')}>
                                        <FormattedMessage
                                            id="velkommen.text.veiviser.lenke"
                                            values={{
                                                a: (msg: any) => (
                                                    <a
                                                        className="lenke"
                                                        rel="noopener noreferrer"
                                                        href={lenker.veiviser}
                                                        target="_blank"
                                                    >
                                                        {msg}
                                                    </a>
                                                ),
                                            }}
                                        />
                                    </div>
                                </Alert>
                            </Block>
                            <Block padBottom="xl">
                                <VelkommenFormComponents.ConfirmationCheckbox
                                    name={VelkommenFormField.harForståttRettigheterOgPlikter}
                                    label={intlUtils(intl, 'velkommen.text.samtykke')}
                                    validate={(value: boolean) => {
                                        let result;
                                        if (value !== true) {
                                            result = intlUtils(
                                                intl,
                                                'valideringsfeil.velkommen.bekreftLestOgForståttRettigheter',
                                            );
                                        }
                                        return result;
                                    }}
                                >
                                    <>
                                        <Block padBottom="l">
                                            <FormattedMessage id="velkommen.text.samtykkeIntro" />
                                        </Block>
                                        <Block padBottom="l">
                                            <ReadMore header={intlUtils(intl, 'velkommen.text.plikter.apneLabel')}>
                                                <Plikter />
                                            </ReadMore>
                                        </Block>
                                        <BodyShort>
                                            <FormattedMessage id="velkommen.text.kunEnStønad" />
                                        </BodyShort>
                                    </>
                                </VelkommenFormComponents.ConfirmationCheckbox>
                            </Block>
                            <Block padBottom="xl">
                                <div className={bem.element('startSøknadKnapp')}>
                                    <Button type="submit">{intlUtils(intl, 'velkommen.button.startSøknad')}</Button>
                                </div>
                            </Block>
                            <Block>
                                <div className={bem.element('personopplysningLenke')}>
                                    <a
                                        className="lenke"
                                        href="#"
                                        onClick={() => setPersonopplysningerModalOpen(!PersonopplysningerModalOpen)}
                                    >
                                        <FormattedMessage id="velkommen.text.personopplysningene.link" />
                                    </a>
                                </div>
                                <Modal
                                    open={PersonopplysningerModalOpen}
                                    closeButton={true}
                                    onClose={() => setPersonopplysningerModalOpen(!PersonopplysningerModalOpen)}
                                    aria-label="rettigheter og plikter"
                                >
                                    <Modal.Content>
                                        <Personopplysninger />
                                    </Modal.Content>
                                </Modal>
                            </Block>
                        </div>
                    </VelkommenFormComponents.Form>
                );
            }}
        />
    );
};

export default Velkommen;
