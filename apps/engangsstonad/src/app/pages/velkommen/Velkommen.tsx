import React, { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Ingress, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import {
    bemUtils,
    LanguageToggle,
    intlUtils,
    Block,
    Locale,
    useDocumentTitle,
    Sidebanner,
    UtvidetInformasjon,
} from '@navikt/fp-common';
import Veiviser from 'components/veiviser/VeiviserSvg';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { lenker } from 'util/lenker';
import {
    initialVelkommenValues,
    VelkommenFormComponents,
    VelkommenFormData,
    VelkommenFormField,
} from './velkommenFormConfig';
import { Hovedknapp } from 'nav-frontend-knapper';
import actionCreator from 'app/context/action/actionCreator';
import { useNavigate } from 'react-router-dom';
import { useEngangsstønadContext } from 'app/context/hooks/useEngangsstønadContext';
import Personopplysninger from 'app/components/modal-content/Personopplysninger';
import Modal from 'nav-frontend-modal';
import Plikter from 'app/components/modal-content/Plikter';
import { logAmplitudeEvent } from 'app/amplitude/amplitude';

import './velkommen.less';
import { PageKeys } from 'app/types/PageKeys';

interface Props {
    fornavn: string;
    onChangeLocale: (locale: Locale) => void;
    locale: Locale;
}

const Velkommen: FunctionComponent<Props> = ({ fornavn, locale, onChangeLocale }) => {
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
                harForståttRettigheterOgPlikter: values.harForståttRettigheterOgPlikter!!,
            })
        );
        navigate('/soknad/søkersituasjon');
    };

    const [PersonopplysningerModalOpen, setPersonopplysningerModalOpen] = useState<boolean>(false);

    return (
        <VelkommenFormComponents.FormikWrapper
            initialValues={initialVelkommenValues}
            onSubmit={(values) => onValidSubmit(values)}
            renderForm={() => {
                return (
                    <VelkommenFormComponents.Form includeButtons={false}>
                        <LanguageToggle
                            locale={locale}
                            availableLocales={['en', 'nb', 'nn']}
                            toggle={(l: Locale) => onChangeLocale(l)}
                        />
                        <Sidebanner
                            dialog={{
                                title: intlUtils(intl, 'velkommen.standard.bobletittel', { name: fornavn }),
                                text: (
                                    <>
                                        <Block padBottom="m">
                                            <FormattedMessage id={'velkommen.standard.bobletekst.del1'} />
                                        </Block>
                                        <Block>
                                            <FormattedMessage id={'velkommen.standard.bobletekst.del2'} />
                                        </Block>
                                    </>
                                ),
                            }}
                        />
                        <div className={bem.block}>
                            <Block padBottom="xl">
                                <div className={bem.element('tittel')}>
                                    <Innholdstittel>
                                        {intlUtils(intl, 'velkommen.standard.velkommentittel')}
                                    </Innholdstittel>
                                </div>
                            </Block>
                            <Block padBottom="xl">
                                <Ingress>{intlUtils(intl, 'velkommen.standard.ingress')}</Ingress>
                            </Block>
                            <Block padBottom="xl">
                                <Veilederpanel kompakt={true} svg={<Veiviser />}>
                                    <FormattedMessage id="velkommen.text.veiviser.del1" />
                                    <ul>
                                        <li>
                                            <FormattedMessage id="velkommen.text.veiviser.punkt1" />
                                        </li>
                                        <li>
                                            <FormattedMessage id="velkommen.text.veiviser.punkt2" />
                                        </li>
                                        <li>
                                            <FormattedMessage id="velkommen.text.veiviser.punkt3" />
                                        </li>
                                        <li>
                                            <FormattedMessage id="velkommen.text.veiviser.punkt4" />
                                        </li>
                                    </ul>
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
                                </Veilederpanel>
                            </Block>
                            <Block padBottom="xl">
                                <VelkommenFormComponents.ConfirmationCheckbox
                                    name={VelkommenFormField.harForståttRettigheterOgPlikter}
                                    label={intlUtils(intl, 'velkommen.text.samtykke')}
                                    validate={(value) => {
                                        let result;
                                        if (value !== true) {
                                            result = intlUtils(
                                                intl,
                                                'valideringsfeil.velkommen.bekreftLestOgForståttRettigheter'
                                            );
                                        }
                                        return result;
                                    }}
                                >
                                    <>
                                        <Block padBottom="l">
                                            <FormattedMessage id="velkommen.text.samtykkeIntro" />
                                        </Block>
                                        <Block>
                                            <UtvidetInformasjon
                                                apneLabel={intlUtils(intl, 'velkommen.text.plikter.apneLabel')}
                                            >
                                                <Plikter />
                                            </UtvidetInformasjon>
                                        </Block>
                                        <Normaltekst>
                                            <FormattedMessage id="velkommen.text.kunEnStønad" />
                                        </Normaltekst>
                                    </>
                                </VelkommenFormComponents.ConfirmationCheckbox>
                            </Block>
                            <Block padBottom="xl">
                                <div className={bem.element('startSøknadKnapp')}>
                                    <Hovedknapp>{intlUtils(intl, 'velkommen.button.startSøknad')}</Hovedknapp>
                                </div>
                            </Block>
                            <Block>
                                <div className={bem.element('personopplysningLenke')}>
                                    <a
                                        className="lenke"
                                        href="#"
                                        onClick={(e) => setPersonopplysningerModalOpen(!PersonopplysningerModalOpen)}
                                    >
                                        <FormattedMessage id="velkommen.text.personopplysningene.link" />
                                    </a>
                                </div>
                                <Modal
                                    isOpen={PersonopplysningerModalOpen}
                                    closeButton={true}
                                    onRequestClose={() => setPersonopplysningerModalOpen(!PersonopplysningerModalOpen)}
                                    contentLabel="rettigheter og plikter"
                                >
                                    <Personopplysninger />
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
