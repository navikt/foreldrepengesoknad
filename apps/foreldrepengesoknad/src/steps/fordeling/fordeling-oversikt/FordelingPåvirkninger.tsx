import {
    BabyWrappedIcon,
    BriefcaseIcon,
    HospitalIcon,
    PersonGroupIcon,
    PersonPregnantIcon,
    StethoscopeIcon,
} from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { ComponentType, ReactNode, SVGProps } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { getTermindato } from 'utils/barnUtils';
import { andreAugust2022ReglerGjelder, førsteOktober2021ReglerGjelder } from 'utils/dateUtils';

import { BodyShort, ExpansionCard, VStack } from '@navikt/ds-react';

import { loggUmamiEvent } from '@navikt/fp-observability';
import { erFødtFørUke33 } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import styles from './fordeling-påvirkninger.module.css';

const ANTALL_UKER_MINSTERETT_MOR_TO_TETTE_FØDSEL = 22;
const ANTALL_UKER_MINSTERETT_MOR_TO_TETTE_ADOPSJON = 8;
const ANTALL_UKER_MINSTERETT_FAR_TO_TETTE = 8;

type PåvirkningProps = {
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    tittel: ReactNode;
    info: ReactNode;
};

const Påvirkning = ({ icon: Icon, tittel, info }: PåvirkningProps) => (
    <div className={styles.påvirkning}>
        <div className={styles.ikonFrame}>
            <Icon className={styles.ikon} aria-hidden={true} />
        </div>
        <VStack>
            <BodyShort className={styles.undertittel}>{tittel}</BodyShort>
            {info}
        </VStack>
    </div>
);

interface Props {
    deltUttak: boolean;
    erAdopsjon: boolean;
    navnAnnenForelder: string;
    morTekst: string;
    farTekst: string;
    erFarEllerMedmor: boolean;
    erIkkeFødtBarn: boolean;
    familiehendelsesdato: string;
    annenForelderHarKunRettIEØS: boolean;
    erFarOgFar: boolean;
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
    erFarOgFar,
}: Props) => {
    const intl = useIntl();
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const heading = intl.formatMessage({ id: 'fordeling.påvirkninger.tittel' });
    const degEllerSeg = erFarEllerMedmor ? intl.formatMessage({ id: 'seg' }) : intl.formatMessage({ id: 'deg' });
    const degEllerMor = erFarEllerMedmor ? navnAnnenForelder : intl.formatMessage({ id: 'deg' });
    const duEllerDere = deltUttak ? intl.formatMessage({ id: 'dere' }) : intl.formatMessage({ id: 'du' });
    const morMinsterettUkerToTette = erAdopsjon
        ? ANTALL_UKER_MINSTERETT_MOR_TO_TETTE_ADOPSJON
        : ANTALL_UKER_MINSTERETT_MOR_TO_TETTE_FØDSEL;
    const farMinsterettUkerToTette = ANTALL_UKER_MINSTERETT_FAR_TO_TETTE;
    const søkerensMinsterettToTette = erFarEllerMedmor ? farMinsterettUkerToTette : morMinsterettUkerToTette;
    const wlbReglerGjelder = andreAugust2022ReglerGjelder(familiehendelsesdato);
    const førsteOkt2021Gjelder = førsteOktober2021ReglerGjelder(familiehendelsesdato);
    const kunFarEllerMedmorHarRett = erFarEllerMedmor && !deltUttak;
    const visInfoMorSykFørsteSeksUker = deltUttak && !erAdopsjon && førsteOkt2021Gjelder;
    const visInfoMorSykISinPeriode =
        førsteOkt2021Gjelder && (deltUttak || (kunFarEllerMedmorHarRett && erIkkeFødtBarn));
    const visInfoFørFørsteOkt2021 = deltUttak && !førsteOkt2021Gjelder;
    const termindato = getTermindato(barn);
    const fødtFørUke33 = erFødtFørUke33(familiehendelsesdato, termindato);
    const visInfoInnleggelseVedPrematurFødsel =
        !erAdopsjon && førsteOkt2021Gjelder && fødtFørUke33 && !erFarOgFar && !kunFarEllerMedmorHarRett;
    const visInfoBarnInnlagt =
        !erAdopsjon &&
        førsteOkt2021Gjelder &&
        !fødtFørUke33 &&
        !erFarOgFar &&
        !(kunFarEllerMedmorHarRett && erIkkeFødtBarn);
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
                    {erIkkeFødtBarn && (
                        <Påvirkning
                            icon={BabyWrappedIcon}
                            tittel={
                                <FormattedMessage
                                    id="fordeling.påvirkninger.prematur.tittel"
                                    values={{ antallBarn: barn.antallBarn }}
                                />
                            }
                            info={
                                <FormattedMessage
                                    id="fordeling.påvirkninger.prematur.info"
                                    values={{ antallBarn: barn.antallBarn, duEllerDere }}
                                />
                            }
                        />
                    )}
                    {visInfoInnleggelseVedPrematurFødsel && (
                        <>
                            <Påvirkning
                                icon={HospitalIcon}
                                tittel={
                                    <FormattedMessage
                                        id="fordeling.påvirkninger.prematur.barnInnlagtFørTermin.tittel"
                                        values={{ antallBarn: barn.antallBarn }}
                                    />
                                }
                                info={
                                    <FormattedMessage
                                        id="fordeling.påvirkninger.prematur.barnInnlagtFørTermin.info"
                                        values={{ antallBarn: barn.antallBarn }}
                                    />
                                }
                            />
                            <Påvirkning
                                icon={HospitalIcon}
                                tittel={
                                    <FormattedMessage
                                        id="fordeling.påvirkninger.prematur.barnInnlagtEtterTermin.tittel"
                                        values={{ antallBarn: barn.antallBarn }}
                                    />
                                }
                                info={
                                    <FormattedMessage
                                        id="fordeling.påvirkninger.prematur.barnInnlagtEtterTermin.info"
                                        values={{ antallBarn: barn.antallBarn }}
                                    />
                                }
                            />
                        </>
                    )}

                    {visInfoMorSykFørsteSeksUker && (
                        <Påvirkning
                            icon={StethoscopeIcon}
                            tittel={
                                <FormattedMessage
                                    id="fordeling.påvirkninger.morSykFørste6Uker.tittel"
                                    values={{ morTekst }}
                                />
                            }
                            info={
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
                            }
                        />
                    )}
                    {visInfoBarnInnlagt && (
                        <Påvirkning
                            icon={StethoscopeIcon}
                            tittel={
                                <FormattedMessage
                                    id="fordeling.påvirkninger.barnInnlagt.tittel"
                                    values={{ antallBarn: barn.antallBarn }}
                                />
                            }
                            info={
                                <FormattedMessage
                                    id="fordeling.påvirkninger.barnInnlagt.info"
                                    values={{ duEllerDere, antallBarn: barn.antallBarn }}
                                />
                            }
                        />
                    )}
                    {visInfoMorSykISinPeriode && (
                        <Påvirkning
                            icon={StethoscopeIcon}
                            tittel={<FormattedMessage id="fordeling.påvirkninger.morSykISinPeriode.tittel" />}
                            info={
                                <FormattedMessage
                                    id="fordeling.påvirkninger.morSykISinPeriode.info"
                                    values={{ navnAnnenForelder }}
                                />
                            }
                        />
                    )}
                    {visInfoFørFørsteOkt2021 && (
                        <Påvirkning
                            icon={StethoscopeIcon}
                            tittel={
                                <FormattedMessage
                                    id="fordeling.påvirkninger.utsettelse.tittel"
                                    values={{ antallBarn: barn.antallBarn }}
                                />
                            }
                            info={
                                <FormattedMessage
                                    id="fordeling.påvirkninger.utsettelse.info"
                                    values={{ navnAnnenForelder }}
                                />
                            }
                        />
                    )}
                    <Påvirkning
                        icon={BriefcaseIcon}
                        tittel={<FormattedMessage id="fordeling.påvirkninger.jobb.tittel" />}
                        info={<FormattedMessage id="fordeling.påvirkninger.jobb.info" />}
                    />
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
                    {deltUttak && !annenForelderHarKunRettIEØS && (
                        <Påvirkning
                            icon={PersonGroupIcon}
                            tittel={<FormattedMessage id="fordeling.påvirkninger.samtidigUttak.tittel" />}
                            info={<FormattedMessage id="fordeling.påvirkninger.samtidigUttak.info" />}
                        />
                    )}
                </ExpansionCard.Content>
            </ExpansionCard>
        </div>
    );
};
