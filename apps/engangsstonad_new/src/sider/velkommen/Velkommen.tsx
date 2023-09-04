import { FunctionComponent, useCallback, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Alert, BodyShort, Button, ConfirmationPanel, GuidePanel, Heading, Modal, ReadMore } from '@navikt/ds-react';
import { Block, LanguageToggle, Locale, bemUtils, useDocumentTitle } from '@navikt/fp-common';

import { logAmplitudeEvent } from '../../fpcommon/amplitude/amplitude';
import { lenker } from '../../lenker';
import { PageKeys } from '../PageKeys';
import Plikter from './Plikter';
import Personopplysninger from './Personopplysninger';

import './velkommen.less';

interface Props {
    onChangeLocale: (locale: Locale) => void;
    locale: Locale;
    startSøknad: () => void;
}

const Velkommen: FunctionComponent<Props> = ({ locale, onChangeLocale, startSøknad }) => {
    const intl = useIntl();
    const bem = bemUtils('velkommen');

    useDocumentTitle(intl.formatMessage({ id: 'velkommen.standard.dokumenttittel' }));

    logAmplitudeEvent('sidevisning', {
        app: 'engangsstonadny',
        team: 'foreldrepenger',
        pageKey: PageKeys.Velkommen,
    });

    const [isChecked, setChecked] = useState(false);
    const [isError, setIsError] = useState(false);

    const [PersonopplysningerModalOpen, setPersonopplysningerModalOpen] = useState(false);

    const bekreft = useCallback(() => {
        if (!isChecked) {
            setIsError(true);
        } else {
            startSøknad();
        }
    }, [isChecked, startSøknad]);

    return (
        <>
            <LanguageToggle
                locale={locale}
                availableLocales={['en', 'nb', 'nn']}
                toggle={(l: Locale) => onChangeLocale(l)}
            />
            <div className={bem.block}>
                <Block padBottom="s">
                    <Heading size="large">
                        <FormattedMessage id={'velkommen.standard.velkommentittel'} />
                    </Heading>
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
                        <a className="lenke" rel="noopener noreferrer" href={lenker.veiviser} target="_blank">
                            {intl.formatMessage({ id: 'velkommen.text.veiviser.lenke' })}
                        </a>
                    </Alert>
                </Block>
                <Block padBottom="xl">
                    <ConfirmationPanel
                        label={intl.formatMessage({ id: 'velkommen.text.samtykke' })}
                        onChange={() => setChecked((state) => !state)}
                        checked={isChecked}
                        error={
                            isError &&
                            !isChecked &&
                            intl.formatMessage({ id: 'valideringsfeil.velkommen.bekreftLestOgForståttRettigheter' })
                        }
                    >
                        <Block padBottom="l">
                            <FormattedMessage id="velkommen.text.samtykkeIntro" />
                        </Block>
                        <Block padBottom="l">
                            <ReadMore header={intl.formatMessage({ id: 'velkommen.text.plikter.apneLabel' })}>
                                <Plikter />
                            </ReadMore>
                        </Block>
                        <BodyShort>
                            <FormattedMessage id="velkommen.text.kunEnStønad" />
                        </BodyShort>
                    </ConfirmationPanel>
                </Block>
                <Block padBottom="xl">
                    <Button type="button" onClick={bekreft}>
                        {intl.formatMessage({ id: 'velkommen.button.startSøknad' })}
                    </Button>
                </Block>
                <Block>
                    <a
                        className="lenke"
                        href="#"
                        onClick={() => setPersonopplysningerModalOpen(!PersonopplysningerModalOpen)}
                    >
                        <FormattedMessage id="velkommen.text.personopplysningene.link" />
                    </a>
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
        </>
    );
};

export default Velkommen;
