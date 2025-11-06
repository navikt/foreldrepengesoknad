import {
    BabyWrappedIcon,
    BriefcaseIcon,
    PersonGroupIcon,
    PersonPregnantIcon,
    StethoscopeIcon,
} from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { FormattedMessage, useIntl } from 'react-intl';
import { andreAugust2022ReglerGjelder, førsteOktober2021ReglerGjelder } from 'utils/dateUtils';

import { BodyShort, ExpansionCard, VStack } from '@navikt/ds-react';

import { loggUmamiEvent } from '@navikt/fp-metrics';
import { uttaksConstants } from '@navikt/fp-uttaksplan';
import { notEmpty } from '@navikt/fp-validation';

import styles from './fordeling-påvirkninger.module.css';

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

export const FordelingPåvirkninger = ({
    deltUttak,
    erAdopsjon,
    navnAnnenForelder,
    morTekst,
    farTekst,
    erFarEllerMedmor,
    erIkkeFødtBarn,
    familiehendelsesdato,
    annenForelderHarKunRettIEØS,
}: Props) => {
    const intl = useIntl();
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const heading = intl.formatMessage({ id: 'fordeling.påvirkninger.tittel' });
    const degEllerSeg = erFarEllerMedmor ? intl.formatMessage({ id: 'seg' }) : intl.formatMessage({ id: 'deg' });
    const degEllerMor = erFarEllerMedmor ? navnAnnenForelder : intl.formatMessage({ id: 'deg' });
    const duEllerDere = deltUttak ? intl.formatMessage({ id: 'dere' }) : intl.formatMessage({ id: 'du' });
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
        <div className={styles.fordelingPåvirkninger}>
            <ExpansionCard
                size="small"
                title-size="small"
                aria-label={heading}
                onToggle={(open) => {
                    if (open) {
                        loggUmamiEvent({
                            origin: 'foreldrepengesoknad',
                            eventName: 'accordion åpnet',
                            eventData: { tittel: heading },
                        });
                    }
                }}
            >
                <ExpansionCard.Header>
                    <ExpansionCard.Title className={styles.heading}>{heading}</ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    {visInfoMorSykFørsteSeksUker && (
                        <>
                            <div className={styles.påvirkning}>
                                <div className={styles.ikonFrame}>
                                    <StethoscopeIcon className={styles.ikon} aria-hidden={true} />
                                </div>
                                <VStack>
                                    <BodyShort className={styles.undertittel}>
                                        <FormattedMessage
                                            id="fordeling.påvirkninger.barnSyk.tittel"
                                            values={{ antallBarn: barn.antallBarn }}
                                        />
                                    </BodyShort>
                                    <FormattedMessage
                                        id="fordeling.påvirkninger.barnSyk.info"
                                        values={{ morTekst, antallBarn: barn.antallBarn }}
                                    />
                                </VStack>
                            </div>
                            <div className={styles.påvirkning}>
                                <div className={styles.ikonFrame}>
                                    <StethoscopeIcon className={styles.ikon} aria-hidden={true} />
                                </div>
                                <VStack>
                                    <BodyShort className={styles.undertittel}>
                                        <FormattedMessage
                                            id="fordeling.påvirkninger.morSykFørste6Uker.tittel"
                                            values={{ morTekst }}
                                        />
                                    </BodyShort>
                                    <FormattedMessage
                                        id="fordeling.påvirkninger.morSykFørste6Uker.info"
                                        values={{
                                            morTekst,
                                            farTekst,
                                            degEllerSeg,
                                            degEllerMor,
                                            antallBarn: barn.antallBarn,
                                        }}
                                    />
                                </VStack>
                            </div>
                        </>
                    )}
                    {visInfoMorSykISinPeriode && (
                        <div className={styles.påvirkning}>
                            <div className={styles.ikonFrame}>
                                <StethoscopeIcon className={styles.ikon} aria-hidden={true} />
                            </div>
                            <VStack>
                                <BodyShort className={styles.undertittel}>
                                    <FormattedMessage id="fordeling.påvirkninger.morSykISinPeriode.tittel" />
                                </BodyShort>
                                <FormattedMessage
                                    id="fordeling.påvirkninger.morSykISinPeriode.info"
                                    values={{ navnAnnenForelder }}
                                />
                            </VStack>
                        </div>
                    )}
                    {visInfoFørFørsteOkt2021 && (
                        <div className={styles.påvirkning}>
                            <div className={styles.ikonFrame}>
                                <StethoscopeIcon className={styles.ikon} aria-hidden={true} />
                            </div>
                            <VStack>
                                <BodyShort className={styles.undertittel}>
                                    <FormattedMessage
                                        id="fordeling.påvirkninger.utsettelse.tittel"
                                        values={{ antallBarn: barn.antallBarn }}
                                    />
                                </BodyShort>
                                <FormattedMessage
                                    id="fordeling.påvirkninger.utsettelse.info"
                                    values={{ navnAnnenForelder }}
                                />
                            </VStack>
                        </div>
                    )}
                    <div className={styles.påvirkning}>
                        <div className={styles.ikonFrame}>
                            <PersonPregnantIcon className={styles.ikon} aria-hidden={true} />
                        </div>
                        <VStack>
                            <BodyShort className={styles.undertittel}>
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
                                    values={{
                                        morTekst,
                                        morMinsterettUkerToTette,
                                        farTekst,
                                        farMinsterettUkerToTette,
                                    }}
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
                    <div className={styles.påvirkning}>
                        <div className={styles.ikonFrame}>
                            <BriefcaseIcon className={styles.ikon} aria-hidden={true} />
                        </div>
                        <VStack>
                            <BodyShort className={styles.undertittel}>
                                <FormattedMessage id="fordeling.påvirkninger.jobb.tittel" />
                            </BodyShort>
                            <FormattedMessage id="fordeling.påvirkninger.jobb.info" />
                        </VStack>
                    </div>
                    {deltUttak && !annenForelderHarKunRettIEØS && (
                        <div className={styles.påvirkning}>
                            <div className={styles.ikonFrame}>
                                <PersonGroupIcon className={styles.ikon} aria-hidden={true} />
                            </div>
                            <VStack>
                                <BodyShort className={styles.undertittel}>
                                    <FormattedMessage id="fordeling.påvirkninger.samtidigUttak.tittel" />
                                </BodyShort>
                                <FormattedMessage id="fordeling.påvirkninger.samtidigUttak.info" />
                            </VStack>
                        </div>
                    )}
                    {erIkkeFødtBarn && (
                        <div className={styles.påvirkning}>
                            <div className={styles.ikonFrame}>
                                <BabyWrappedIcon className={styles.ikon} aria-hidden={true} />
                            </div>
                            <VStack>
                                <BodyShort className={styles.undertittel}>
                                    <FormattedMessage
                                        id="fordeling.påvirkninger.prematur.tittel"
                                        values={{ antallBarn: barn.antallBarn }}
                                    />
                                </BodyShort>
                                <FormattedMessage
                                    id="fordeling.påvirkninger.prematur.info"
                                    values={{ antallBarn: barn.antallBarn, duEllerDere }}
                                />
                            </VStack>
                        </div>
                    )}
                </ExpansionCard.Content>
            </ExpansionCard>
        </div>
    );
};
