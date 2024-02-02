import { StethoscopeIcon, PersonGroupIcon, PersonPregnantIcon, BriefcaseIcon } from '@navikt/aksel-icons';
import { BodyShort, ExpansionCard, VStack } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Block, bemUtils, intlUtils } from '@navikt/fp-common';
import './fordeling-påvirkninger.css';

interface Props {
    beggeHarRett: boolean;
}

const FordelingPåvirkninger: React.FunctionComponent<Props> = ({ beggeHarRett }) => {
    const intl = useIntl();
    const bem = bemUtils('fordeling-påvirkninger');
    const heading = intlUtils(intl, 'fordeling.påvirkninger.tittel');
    return (
        <ExpansionCard aria-label={heading}>
            <ExpansionCard.Header>
                <ExpansionCard.Title className={bem.element('heading')}>{heading}</ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                {beggeHarRett && (
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
                {beggeHarRett && (
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
