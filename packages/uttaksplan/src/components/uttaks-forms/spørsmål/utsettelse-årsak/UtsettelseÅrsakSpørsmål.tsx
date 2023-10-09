import { Block, intlUtils } from '@navikt/fp-common';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import { Attachment } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { FunctionComponent } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { UtsettelseÅrsakType } from 'types/UtsettelseÅrsakType';
import {
    PeriodeUtsettelseFormComponents,
    PeriodeUtsettelseFormField,
} from '../../periode-utsettelse-form/periodeUtsettelseFormConfig';
import { BodyShort, GuidePanel } from '@navikt/ds-react';
import { FormikRadioProp } from '@navikt/sif-common-formik-ds/lib/components/formik-radio-group/FormikRadioGroup';

interface Props {
    periodenErKunHelligdager: boolean;
    skalViseGamleUtsettelseÅrsaker: boolean;
    erFarEllerMedmor: boolean;
    tidsperiodenErInnenforFørsteSeksUker: boolean;
    utsettelseårsak: UtsettelseÅrsakType | '';
    vedlegg: Attachment[];
    erMorUfør: boolean;
    søkerErFarEllerMedmorOgKunDeHarRett: boolean;
    isOpen: boolean;
}

const getUtsettelseÅrsakOptions = (
    intl: IntlShape,
    periodenErKunHelligdager: boolean,
    skalViseGamleUtsettelseÅrsaker: boolean,
    erFarEllerMedmor: boolean,
    tidsperiodenErInnenforFørsteSeksUker: boolean,
    erMorUfør: boolean,
    søkerErFarEllerMedmorOgKunDeHarRett: boolean,
) => {
    const allRadios: FormikRadioProp[] = [
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.jegskalhaferie'),
            value: UtsettelseÅrsakType.Ferie,
            disabled: periodenErKunHelligdager === true,
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.jegskaljobbeheltid'),
            value: UtsettelseÅrsakType.Arbeid,
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.pgasykdom'),
            value: UtsettelseÅrsakType.Sykdom,
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.institusjonBarn'),
            value: UtsettelseÅrsakType.InstitusjonBarnet,
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.institusjonSøker'),
            value: UtsettelseÅrsakType.InstitusjonSøker,
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.hv_øvelse'),
            value: UtsettelseÅrsakType.HvØvelse,
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.navtiltak'),
            value: UtsettelseÅrsakType.NavTiltak,
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.fri'),
            value: UtsettelseÅrsakType.Fri,
        },
    ];

    const defaultRadios = allRadios.filter((option) => {
        if (skalViseGamleUtsettelseÅrsaker) {
            if (option.value === UtsettelseÅrsakType.Fri) {
                return false;
            }

            return true;
        }

        if (!skalViseGamleUtsettelseÅrsaker && !erFarEllerMedmor) {
            if (tidsperiodenErInnenforFørsteSeksUker) {
                return (
                    option.value === UtsettelseÅrsakType.Sykdom ||
                    option.value === UtsettelseÅrsakType.InstitusjonBarnet ||
                    option.value === UtsettelseÅrsakType.InstitusjonSøker
                );
            }

            return false;
        }

        if (!skalViseGamleUtsettelseÅrsaker && erFarEllerMedmor) {
            if (!erMorUfør) {
                if (option.value === UtsettelseÅrsakType.Fri && søkerErFarEllerMedmorOgKunDeHarRett) {
                    return true;
                }

                return false;
            }

            if (tidsperiodenErInnenforFørsteSeksUker) {
                return (
                    option.value === UtsettelseÅrsakType.Sykdom ||
                    option.value === UtsettelseÅrsakType.InstitusjonBarnet ||
                    option.value === UtsettelseÅrsakType.InstitusjonSøker
                );
            }

            return option.value === UtsettelseÅrsakType.Fri;
        }

        return option.value === UtsettelseÅrsakType.Sykdom || option.value === UtsettelseÅrsakType.Fri;
    });

    return defaultRadios;
};

const getUtsettelseårsakSkjemanummer = (årsak: UtsettelseÅrsakType | '') => {
    switch (årsak) {
        case UtsettelseÅrsakType.Sykdom:
            return Skjemanummer.DOK_OVERFØRING_FOR_SYK;
        case UtsettelseÅrsakType.InstitusjonSøker:
        case UtsettelseÅrsakType.InstitusjonBarnet:
            return Skjemanummer.DOK_INNLEGGELSE;
        case UtsettelseÅrsakType.HvØvelse:
            return Skjemanummer.HV_ØVELSE;
        case UtsettelseÅrsakType.NavTiltak:
            return Skjemanummer.NAV_TILTAK;
        default:
            return Skjemanummer.ANNET;
    }
};

const showAttachmentUploader = (årsak: UtsettelseÅrsakType | ''): boolean => {
    switch (årsak) {
        case UtsettelseÅrsakType.Sykdom:
        case UtsettelseÅrsakType.InstitusjonSøker:
        case UtsettelseÅrsakType.InstitusjonBarnet:
        case UtsettelseÅrsakType.HvØvelse:
        case UtsettelseÅrsakType.NavTiltak:
            return true;
        default:
            return false;
    }
};

const getAttachmentUploaderLabel = (årsak: UtsettelseÅrsakType | ''): string => {
    switch (årsak) {
        case UtsettelseÅrsakType.Sykdom:
        case UtsettelseÅrsakType.InstitusjonSøker:
        case UtsettelseÅrsakType.InstitusjonBarnet:
            return 'Last opp dokumentasjon for sykdom';
        case UtsettelseÅrsakType.HvØvelse:
            return 'Last opp dokumentasjon for HV-øvelse';
        case UtsettelseÅrsakType.NavTiltak:
            return 'Last opp dokumentasjon for NAV tiltak';
        default:
            return '';
    }
};

const getAttachmentUploaderType = (årsak: UtsettelseÅrsakType | ''): AttachmentType => {
    switch (årsak) {
        case UtsettelseÅrsakType.Sykdom:
        case UtsettelseÅrsakType.InstitusjonSøker:
        case UtsettelseÅrsakType.InstitusjonBarnet:
            return AttachmentType.UTSETTELSE_SYKDOM;
        case UtsettelseÅrsakType.HvØvelse:
            return AttachmentType.HV_ØVELSE;
        case UtsettelseÅrsakType.NavTiltak:
            return AttachmentType.NAV_TILTAK;
        default:
            return AttachmentType.UTSETTELSE_SYKDOM; // Should never happen
    }
};

const getVeilederTekst = (årsak: UtsettelseÅrsakType | ''): React.ReactElement => {
    switch (årsak) {
        case UtsettelseÅrsakType.Sykdom:
        case UtsettelseÅrsakType.InstitusjonSøker:
        case UtsettelseÅrsakType.InstitusjonBarnet:
            return <FormattedMessage id="uttaksplan.veileder.sykdom" />;
        case UtsettelseÅrsakType.HvØvelse:
            return <FormattedMessage id="uttaksplan.veileder.hvØvelse" />;
        case UtsettelseÅrsakType.NavTiltak:
            return <FormattedMessage id="uttaksplan.veileder.navTiltak" />;
        default:
            return <FormattedMessage id="uttaksplan.veileder.sykdom" />; // Should never happen
    }
};

const UtsettelseÅrsakSpørsmål: FunctionComponent<Props> = ({
    periodenErKunHelligdager,
    skalViseGamleUtsettelseÅrsaker,
    erFarEllerMedmor,
    tidsperiodenErInnenforFørsteSeksUker,
    utsettelseårsak,
    vedlegg,
    erMorUfør,
    søkerErFarEllerMedmorOgKunDeHarRett,
    isOpen,
}) => {
    const intl = useIntl();
    const årsakOptions = getUtsettelseÅrsakOptions(
        intl,
        periodenErKunHelligdager,
        skalViseGamleUtsettelseÅrsaker,
        erFarEllerMedmor,
        tidsperiodenErInnenforFørsteSeksUker,
        erMorUfør,
        søkerErFarEllerMedmorOgKunDeHarRett,
    );

    if (årsakOptions.length === 0) {
        return (
            <GuidePanel>
                <Block padBottom="l">
                    <BodyShort>
                        <b>
                            <FormattedMessage id="uttaksplan.veileder.trengerIkkeUtsettelse.del1" />
                        </b>
                    </BodyShort>
                </Block>
                <Block padBottom="l">
                    <BodyShort>
                        <FormattedMessage id="uttaksplan.veileder.trengerIkkeUtsettelse.del2" />
                    </BodyShort>
                </Block>
                <Block padBottom="l">
                    <BodyShort>
                        <FormattedMessage id="uttaksplan.veileder.trengerIkkeUtsettelse.del3" />
                    </BodyShort>
                </Block>
            </GuidePanel>
        );
    }

    return (
        <>
            <Block padBottom="l">
                <PeriodeUtsettelseFormComponents.RadioGroup
                    legend="Velg årsak for utsettelse"
                    name={PeriodeUtsettelseFormField.årsak}
                    radios={årsakOptions}
                    validate={(value) => {
                        if (value === '') {
                            return 'Årsak må fylles ut';
                        }
                        return undefined;
                    }}
                />
            </Block>
            <Block padBottom="l" visible={showAttachmentUploader(utsettelseårsak)}>
                <GuidePanel>{getVeilederTekst(utsettelseårsak)}</GuidePanel>
            </Block>
            <Block padBottom="l" visible={showAttachmentUploader(utsettelseårsak) && isOpen}>
                <FormikFileUploader
                    legend="Dokumentasjon for utsettelsesårsak"
                    label={getAttachmentUploaderLabel(utsettelseårsak)}
                    name={PeriodeUtsettelseFormField.vedlegg}
                    attachments={vedlegg || []}
                    attachmentType={getAttachmentUploaderType(utsettelseårsak)}
                    skjemanummer={getUtsettelseårsakSkjemanummer(utsettelseårsak)}
                />
            </Block>
        </>
    );
};

export default UtsettelseÅrsakSpørsmål;
