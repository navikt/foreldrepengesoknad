import { StethoscopeIcon, PersonGroupIcon, PersonPregnantIcon, BriefcaseIcon } from '@navikt/aksel-icons';
import { BodyShort, ExpansionCard, VStack } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Block, bemUtils, intlUtils } from '@navikt/fp-common';
import './fordeling-påvirkninger.css';
import { logAmplitudeEvent } from '@navikt/fp-metrics';

interface Props {
    deltUttak: boolean;
}

const FordelingPåvirkninger: React.FunctionComponent<Props> = ({ deltUttak }) => {
    const intl = useIntl();
    const bem = bemUtils('fordeling-påvirkninger');
    const heading = intlUtils(intl, 'fordeling.påvirkninger.tittel');
    const onToggleHandler = (open: boolean) => {
        if (open) {
            logAmplitudeEvent('applikasjon-hendelse', {
                app: 'foreldrepengesoknad',
                team: 'foreldrepenger',
                hendelse: 'expand-fordeling-påvirkninger',
            });
        }
    };
    return (
        <ExpansionCard size="small" title-size="small" aria-label={heading} onToggle={onToggleHandler}>
            <ExpansionCard.Header>
                <ExpansionCard.Title className={bem.element('heading')}>{heading}</ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                {deltUttak && (
                    <>
                        <Block padBottom="l">
                            <div className={bem.element('påvirkning')}>
                                <div className={bem.element('ikon-frame')}>
                                    <StethoscopeIcon className={bem.element('ikon')} aria-hidden={true} />
                                </div>
                                <VStack>
                                    <BodyShort className={bem.element('undertittel')}>
                                        <FormattedMessage id="fordeling.påvirkninger.morSykISinPeriode.tittel" />
                                    </BodyShort>
                                    <FormattedMessage id="fordeling.påvirkninger.morSykISinPeriode.info" />
                                </VStack>
                            </div>
                        </Block>
                        <Block padBottom="l">
                            <div className={bem.element('påvirkning')}>
                                <div className={bem.element('ikon-frame')}>
                                    <StethoscopeIcon className={bem.element('ikon')} aria-hidden={true} />
                                </div>
                                <VStack>
                                    <BodyShort className={bem.element('undertittel')}>
                                        <FormattedMessage id="fordeling.påvirkninger.morSykFørste6Uker.tittel" />
                                    </BodyShort>
                                    <FormattedMessage id="fordeling.påvirkninger.morSykFørste6Uker.info" />
                                </VStack>
                            </div>
                        </Block>
                    </>
                )}
                <Block padBottom="l">
                    <div className={bem.element('påvirkning')}>
                        <div className={bem.element('ikon-frame')}>
                            <PersonPregnantIcon className={bem.element('ikon')} aria-hidden={true} />
                        </div>
                        <VStack>
                            <BodyShort className={bem.element('undertittel')}>
                                <FormattedMessage id="fordeling.påvirkninger.totette.tittel" />
                            </BodyShort>
                            <FormattedMessage id="fordeling.påvirkninger.totette.info" />
                        </VStack>
                    </div>
                </Block>
                <Block padBottom="l">
                    <div className={bem.element('påvirkning')}>
                        <div className={bem.element('ikon-frame')}>
                            <BriefcaseIcon className={bem.element('ikon')} aria-hidden={true} />
                        </div>
                        <VStack>
                            <BodyShort className={bem.element('undertittel')}>
                                <FormattedMessage id="fordeling.påvirkninger.jobb.tittel" />
                            </BodyShort>
                            <FormattedMessage id="fordeling.påvirkninger.jobb.info" />
                        </VStack>
                    </div>
                </Block>
                {deltUttak && (
                    <Block padBottom="l">
                        <div className={bem.element('påvirkning')}>
                            <div className={bem.element('ikon-frame')}>
                                <PersonGroupIcon className={bem.element('ikon')} aria-hidden={true} />
                            </div>
                            <VStack>
                                <BodyShort className={bem.element('undertittel')}>
                                    <FormattedMessage id="fordeling.påvirkninger.samtidigUttak.tittel" />
                                </BodyShort>
                                <FormattedMessage id="fordeling.påvirkninger.samtidigUttak.info" />
                            </VStack>
                        </div>
                    </Block>
                )}
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default FordelingPåvirkninger;
