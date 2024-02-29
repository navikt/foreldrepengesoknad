import {
    BabyWrappedIcon,
    BriefcaseIcon,
    PersonGroupIcon,
    PersonPregnantIcon,
    StethoscopeIcon,
} from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, ExpansionCard, VStack } from '@navikt/ds-react';

import {
    Block,
    andreAugust2022ReglerGjelder,
    bemUtils,
    førsteOktober2021ReglerGjelder,
    intlUtils,
    uttaksConstants,
} from '@navikt/fp-common';
import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';

import {
    getBarnetEllerBarnaTekst,
    getDegEllerMorTekst,
    getDegEllerSegTekst,
    getDuEllerDereTekst,
} from '../fordelingOversiktUtils';
import './fordeling-påvirkninger.css';

interface Props {
    deltUttak: boolean;
    erAdopsjon: boolean;
    navnAnnenForelder: string;
    morTekst: string;
    farTekst: string;
    erFarEllerMedmor: boolean;
    erIkkeFødtBarn: boolean;
    familiehendelsesdato: Date;
    annenForelderHarKunRettIEØS: boolean;
}

const FordelingPåvirkninger: React.FunctionComponent<Props> = ({
    deltUttak,
    erAdopsjon,
    navnAnnenForelder,
    morTekst,
    farTekst,
    erFarEllerMedmor,
    erIkkeFødtBarn,
    familiehendelsesdato,
    annenForelderHarKunRettIEØS,
}) => {
    const intl = useIntl();
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
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
    const degEllerSeg = getDegEllerSegTekst(erFarEllerMedmor, intl);
    const degEllerMor = getDegEllerMorTekst(erFarEllerMedmor, navnAnnenForelder, intl);
    const duEllerDere = getDuEllerDereTekst(deltUttak, intl);
    const barnetEllerBarna = getBarnetEllerBarnaTekst(barn.antallBarn, intl);
    const morMinsterettUkerToTette = erAdopsjon
        ? uttaksConstants.ANTALL_UKER_MINSTERETT_MOR_TO_TETTE_ADOPSJON
        : uttaksConstants.ANTALL_UKER_MINSTERETT_MOR_TO_TETTE_FØDSEL;
    const farMinsterettUkerToTette = uttaksConstants.ANTALL_UKER_MINSTERETT_FAR_TO_TETTE;
    const søkerensMinsterettToTette = erFarEllerMedmor ? farMinsterettUkerToTette : morMinsterettUkerToTette;
    const wlbReglerGjelder = andreAugust2022ReglerGjelder(familiehendelsesdato);
    const førsteOkt2021Gjelder = førsteOktober2021ReglerGjelder(familiehendelsesdato);
    const visInfoMorSykFørsteSeksUker = deltUttak && !erAdopsjon && førsteOkt2021Gjelder;
    const visInfoMorSykISinPeriode = deltUttak && førsteOkt2021Gjelder;
    const visInfoFørFørsteOkt2021 = deltUttak && !førsteOkt2021Gjelder;
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
                                        values={{ morTekst, farTekst, degEllerSeg, degEllerMor, barnetEllerBarna }}
                                    />
                                </VStack>
                            </div>
                        </Block>
                    </>
                )}
                {visInfoMorSykISinPeriode && (
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
                {visInfoFørFørsteOkt2021 && (
                    <Block padBottom="l">
                        <div className={bem.element('påvirkning')}>
                            <div className={bem.element('ikon-frame')}>
                                <StethoscopeIcon className={bem.element('ikon')} aria-hidden={true} />
                            </div>
                            <VStack>
                                <BodyShort className={bem.element('undertittel')}>
                                    <FormattedMessage
                                        id="fordeling.påvirkninger.utsettelse.tittel"
                                        values={{ barnetEllerBarna }}
                                    />
                                </BodyShort>
                                <FormattedMessage
                                    id="fordeling.påvirkninger.utsettelse.info"
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
                            {wlbReglerGjelder && (
                                <FormattedMessage
                                    id="fordeling.påvirkninger.totette.info.etterWLB.del1"
                                    values={{ duEllerDere }}
                                />
                            )}
                            {wlbReglerGjelder && deltUttak && (
                                <FormattedMessage
                                    id="fordeling.påvirkninger.totette.info.etterWLB.del2.deltUttak"
                                    values={{ morTekst, morMinsterettUkerToTette, farTekst, farMinsterettUkerToTette }}
                                />
                            )}
                            {wlbReglerGjelder && !deltUttak && (
                                <FormattedMessage
                                    id="fordeling.påvirkninger.totette.info.etterWLB.del2.alene"
                                    values={{ søkerensMinsterettToTette }}
                                />
                            )}
                            {!wlbReglerGjelder && (
                                <FormattedMessage
                                    id="fordeling.påvirkninger.totette.info.førWlb"
                                    values={{ duEllerDere }}
                                />
                            )}
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
                {deltUttak && !annenForelderHarKunRettIEØS && (
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
