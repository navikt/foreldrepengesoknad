import {
    StethoscopeIcon,
    PersonGroupIcon,
    PersonPregnantIcon,
    BriefcaseIcon,
    BabyWrappedIcon,
} from '@navikt/aksel-icons';
import { BodyShort, ExpansionCard, VStack } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Block, bemUtils, intlUtils } from '@navikt/fp-common';
import './fordeling-påvirkninger.css';
import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import { notEmpty } from '@navikt/fp-validation';
import {
    getDegEllerMorTekst,
    getBarnetEllerBarnaTekst,
    getDuEllerDereTekst,
    getDegEllerSegTekst,
} from '../fordelingOversiktUtils';

interface Props {
    deltUttak: boolean;
    erAdopsjon: boolean;
    navnAnnenForelder: string;
    morTekst: string;
    farTekst: string;
    erFarEllerMedmor: boolean;
    erIkkeFødtBarn: boolean;
}

const FordelingPåvirkninger: React.FunctionComponent<Props> = ({
    deltUttak,
    erAdopsjon,
    navnAnnenForelder,
    morTekst,
    farTekst,
    erFarEllerMedmor,
    erIkkeFødtBarn,
}) => {
    const intl = useIntl();
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const bem = bemUtils('fordeling-påvirkninger');
    const heading = intlUtils(intl, 'fordeling.påvirkninger.tittel');
    const visInfoMorSykFørsteSeksUker = deltUttak && !erAdopsjon;
    const onToggleHandler = (open: boolean) => {
        if (open) {
            logAmplitudeEvent('applikasjon-hendelse', {
                app: 'foreldrepengesoknad',
                team: 'foreldrepenger',
                hendelse: 'expand-fordeling-påvirkninger',
            });
        }
    };
    const degEllerSeg = getDegEllerSegTekst(erFarEllerMedmor, intl);
    const degEllerMor = getDegEllerMorTekst(erFarEllerMedmor, navnAnnenForelder, intl);
    const duEllerDere = getDuEllerDereTekst(deltUttak, intl);
    const barnetEllerBarna = getBarnetEllerBarnaTekst(barn.antallBarn, intl);
    return (
        <ExpansionCard size="small" title-size="small" aria-label={heading} onToggle={onToggleHandler}>
            <ExpansionCard.Header>
                <ExpansionCard.Title className={bem.element('heading')}>{heading}</ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                {visInfoMorSykFørsteSeksUker && (
                    <>
                        <Block padBottom="l">
                            <div className={bem.element('påvirkning')}>
                                <div className={bem.element('ikon-frame')}>
                                    <StethoscopeIcon className={bem.element('ikon')} aria-hidden={true} />
                                </div>
                                <VStack>
                                    <BodyShort className={bem.element('undertittel')}>
                                        <FormattedMessage
                                            id="fordeling.påvirkninger.barnSyk.tittel"
                                            values={{ barnetEllerBarna }}
                                        />
                                    </BodyShort>
                                    <FormattedMessage
                                        id="fordeling.påvirkninger.barnSyk.info"
                                        values={{ morTekst, barnetEllerBarna }}
                                    />
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
                                        <FormattedMessage
                                            id="fordeling.påvirkninger.morSykFørste6Uker.tittel"
                                            values={{ morTekst }}
                                        />
                                    </BodyShort>
                                    <FormattedMessage
                                        id="fordeling.påvirkninger.morSykFørste6Uker.info"
                                        values={{ morTekst, farTekst, degEllerSeg, degEllerMor }}
                                    />
                                </VStack>
                            </div>
                        </Block>
                    </>
                )}
                {deltUttak && (
                    <Block padBottom="l">
                        <div className={bem.element('påvirkning')}>
                            <div className={bem.element('ikon-frame')}>
                                <StethoscopeIcon className={bem.element('ikon')} aria-hidden={true} />
                            </div>
                            <VStack>
                                <BodyShort className={bem.element('undertittel')}>
                                    <FormattedMessage id="fordeling.påvirkninger.morSykISinPeriode.tittel" />
                                </BodyShort>
                                <FormattedMessage
                                    id="fordeling.påvirkninger.morSykISinPeriode.info"
                                    values={{ navnAnnenForelder }}
                                />
                            </VStack>
                        </div>
                    </Block>
                )}
                <Block padBottom="l">
                    <div className={bem.element('påvirkning')}>
                        <div className={bem.element('ikon-frame')}>
                            <PersonPregnantIcon className={bem.element('ikon')} aria-hidden={true} />
                        </div>
                        <VStack>
                            <BodyShort className={bem.element('undertittel')}>
                                <FormattedMessage id="fordeling.påvirkninger.totette.tittel" values={{ duEllerDere }} />
                            </BodyShort>
                            <FormattedMessage id="fordeling.påvirkninger.totette.info" values={{ duEllerDere }} />
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
                {erIkkeFødtBarn && (
                    <Block padBottom="l">
                        <div className={bem.element('påvirkning')}>
                            <div className={bem.element('ikon-frame')}>
                                <BabyWrappedIcon className={bem.element('ikon')} aria-hidden={true} />
                            </div>
                            <VStack>
                                <BodyShort className={bem.element('undertittel')}>
                                    <FormattedMessage
                                        id="fordeling.påvirkninger.prematur.tittel"
                                        values={{ barnetEllerBarna }}
                                    />
                                </BodyShort>
                                <FormattedMessage
                                    id="fordeling.påvirkninger.prematur.info"
                                    values={{ barnetEllerBarna, duEllerDere }}
                                />
                            </VStack>
                        </div>
                    </Block>
                )}
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default FordelingPåvirkninger;
