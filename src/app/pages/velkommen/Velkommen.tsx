import { bemUtils, Block, intlUtils, LanguageToggle, Locale, Sidebanner } from '@navikt/fp-common';
import actionCreator, { ForeldrepengesøknadContextAction } from 'app/context/action/actionCreator';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useSøknad from 'app/utils/hooks/useSøknad';
import {
    getInitialVelkommenValues,
    VelkommenFormComponents,
    VelkommenFormData,
    VelkommenFormField,
    velkommenFormQuestions,
} from './velkommenFormConfig';
import DinePlikter from 'app/components/dine-plikter/DinePlikter';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import DinePersonopplysningerModal from '../modaler/DinePersonopplysningerModal';

import './velkommen.less';
import { validateHarForståttRettigheterOgPlikter } from './validation/velkommenValidation';
import Sak, { FagsakStatus } from 'app/types/Sak';
import SøknadRoutes from 'app/routes/routes';
import { convertYesOrNoOrUndefinedToBoolean } from 'app/utils/formUtils';
import SøknadStatus from './components/SøknadStatus';
import { storeAppState } from 'app/utils/submitUtils';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import Api from 'app/api/api';
import { mapEksisterendeSakFromDTO, opprettSøknadFraEksisterendeSak } from 'app/utils/eksisterendeSakUtils';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import { Søknad } from 'app/context/types/Søknad';
import {
    erSakFerdigbehandlet,
    getSakUnderBehandling,
    getSisteForeldrepengeSak,
    skalKunneSøkeOmEndring,
} from 'app/utils/sakerUtils';

interface Props {
    fornavn: string;
    onChangeLocale: (locale: Locale) => void;
    locale: Locale;
    saker: Sak[];
    fnr: string;
}

const Velkommen: React.FunctionComponent<Props> = ({ fornavn, locale, saker, fnr, onChangeLocale }) => {
    const sakTilBehandling = getSakUnderBehandling(saker);
    const harSakTilBehandling = !!sakTilBehandling;
    const sak = sakTilBehandling || getSisteForeldrepengeSak(saker);
    const intl = useIntl();
    const søknad = useSøknad();
    const { dispatch, state } = useForeldrepengesøknadContext();
    const [isDinePersonopplysningerModalOpen, setDinePersonopplysningerModalOpen] = useState(false);
    const bem = bemUtils('velkommen');
    const kanSøkeOmEndring = sak !== undefined ? skalKunneSøkeOmEndring(sak) : false;
    const sakErFerdigbehandlet = erSakFerdigbehandlet(sak);
    const sakErAvsluttet = sak !== undefined ? sak.status === FagsakStatus.AVSLUTTET : false;
    const { eksisterendeSakData } = Api.useGetEksisterendeSak(sak?.saksnummer, fnr);

    useEffect(() => {
        if (state.søknad.søker.språkkode !== locale) {
            dispatch(actionCreator.setSpråkkode(locale));
        }
    }, [dispatch, locale, state.søknad.søker.språkkode]);

    const onValidSubmitHandler = (values: Partial<VelkommenFormData>) => {
        const vilSøkeOmEndring = !!convertYesOrNoOrUndefinedToBoolean(values.vilSøkeOmEndring);

        const actionsToDispatch: ForeldrepengesøknadContextAction[] = [
            actionCreator.setVelkommen(values.harForståttRettigheterOgPlikter!),
            actionCreator.setErEndringssøknad(vilSøkeOmEndring),
        ];

        if (eksisterendeSakData && sak && vilSøkeOmEndring) {
            const eksisterendeSak = mapEksisterendeSakFromDTO(
                eksisterendeSakData,
                eksisterendeSakData.grunnlag.søkerErFarEllerMedmor,
                false
            );

            const søknad: Søknad = opprettSøknadFraEksisterendeSak(state.søkerinfo, eksisterendeSak!, sak) as Søknad;

            actionsToDispatch.push(actionCreator.updateCurrentRoute(SøknadRoutes.UTTAKSPLAN));
            actionsToDispatch.push(actionCreator.setSøknad(søknad));
            actionsToDispatch.push(actionCreator.setEksisterendeSak(eksisterendeSak));
        }

        return actionsToDispatch;
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        SøknadRoutes.SØKERSITUASJON,
        (state: ForeldrepengesøknadContextState) => storeAppState(state)
    );

    return (
        <VelkommenFormComponents.FormikWrapper
            initialValues={getInitialVelkommenValues(søknad.harGodkjentVilkår)}
            onSubmit={handleSubmit}
            renderForm={({ values }) => {
                const visibility = velkommenFormQuestions.getVisbility({
                    ...values,
                    kanSøkeOmEndring,
                });
                return (
                    <VelkommenFormComponents.Form includeButtons={false}>
                        <LanguageToggle
                            locale={locale}
                            availableLocales={['nb', 'nn']}
                            toggle={(l: Locale) => onChangeLocale(l)}
                        />
                        <Sidebanner
                            dialog={{
                                title: intlUtils(intl, 'velkommen.bobletittel', { name: fornavn }),
                                text: (
                                    <>
                                        <Block padBottom="m">
                                            <FormattedMessage id={'velkommen.bobletekst'} />
                                        </Block>
                                    </>
                                ),
                            }}
                        />

                        <div className={bem.block}>
                            <Innholdstittel className={`${bem.element('tittel')} blokk-s`}>
                                {intlUtils(intl, 'velkommen.tittel')}
                            </Innholdstittel>
                            {sak && !sakErAvsluttet && (
                                <Block padBottom="l">
                                    <SøknadStatus
                                        sakOpprettetDato={new Date(sak.opprettet)}
                                        sakErFerdigbehandlet={sakErFerdigbehandlet}
                                        kanSøkeOmEndring={kanSøkeOmEndring}
                                        harSakTilBehandling={harSakTilBehandling}
                                        values={values}
                                        visibility={visibility}
                                    />
                                </Block>
                            )}
                            <Block
                                padBottom="l"
                                visible={visibility.isVisible(VelkommenFormField.harForståttRettigheterOgPlikter)}
                            >
                                <VelkommenFormComponents.ConfirmationCheckbox
                                    name={VelkommenFormField.harForståttRettigheterOgPlikter}
                                    label={intlUtils(intl, 'velkommen.samtykke')}
                                    validate={validateHarForståttRettigheterOgPlikter(intl)}
                                >
                                    <>
                                        <Block padBottom="l">
                                            <FormattedMessage id="velkommen.samtykkeIntro.del1" />
                                        </Block>
                                        <Block padBottom="m">
                                            <DinePlikter />
                                        </Block>
                                        <Block padBottom="l">
                                            <FormattedMessage id="velkommen.samtykkeIntro.del2" />
                                        </Block>
                                        <FormattedMessage id="velkommen.samtykkeIntro.del3" />
                                    </>
                                </VelkommenFormComponents.ConfirmationCheckbox>
                            </Block>
                            <Block padBottom="l">
                                <div style={{ textAlign: 'center' }}>
                                    <Hovedknapp disabled={isSubmitting} spinner={isSubmitting}>
                                        Begynn med søknad
                                    </Hovedknapp>
                                </div>
                            </Block>
                            <Normaltekst className={bem.element('personopplysningerLink')}>
                                <a
                                    className="lenke"
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setDinePersonopplysningerModalOpen(true);
                                    }}
                                >
                                    <FormattedMessage id="velkommen.lesMerOmPersonopplysninger" />
                                </a>
                            </Normaltekst>
                            <DinePersonopplysningerModal
                                isOpen={isDinePersonopplysningerModalOpen}
                                onRequestClose={() => setDinePersonopplysningerModalOpen(false)}
                            />
                        </div>
                    </VelkommenFormComponents.Form>
                );
            }}
        />
    );
};

export default Velkommen;
