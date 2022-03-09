import { Block, formatDateExtended, intlUtils } from '@navikt/fp-common';
import VeilederNormal from 'app/assets/VeilederNormal';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { Attachment } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { RadioProps } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
import {
    PeriodeUtsettelseFormComponents,
    PeriodeUtsettelseFormField,
} from '../../periode-utsettelse-form/periodeUtsettelseFormConfig';

interface Props {
    periodenErKunHelligdager: boolean;
    skalViseGamleUtsettelseÅrsaker: boolean;
    erFarEllerMedmor: boolean;
    tidsperiodenErInnenforFørsteSeksUker: boolean;
    familiehendelsesdato: Date;
    utsettelseårsak: UtsettelseÅrsakType | '';
    vedlegg: Attachment[];
}

const getUtsettelseÅrsakOptions = (
    intl: IntlShape,
    periodenErKunHelligdager: boolean,
    skalViseGamleUtsettelseÅrsaker: boolean,
    erFarEllerMedmor: boolean,
    tidsperiodenErInnenforFørsteSeksUker: boolean
) => {
    const allRadios: RadioProps[] = [
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.jegskalhaferie'),
            value: UtsettelseÅrsakType.Ferie,
            disabled: periodenErKunHelligdager === true,
            name: 'utsettelseÅrsak',
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.jegskaljobbeheltid'),
            value: UtsettelseÅrsakType.Arbeid,
            name: 'utsettelseÅrsak',
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.pgasykdom'),
            value: UtsettelseÅrsakType.Sykdom,
            name: 'utsettelseÅrsak',
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.institusjonBarn'),
            value: UtsettelseÅrsakType.InstitusjonBarnet,
            name: 'utsettelseÅrsak',
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.institusjonSøker'),
            value: UtsettelseÅrsakType.InstitusjonSøker,
            name: 'utsettelseÅrsak',
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.hv_øvelse'),
            value: UtsettelseÅrsakType.HvØvelse,
            name: 'utsettelseÅrsak',
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.navtiltak'),
            value: UtsettelseÅrsakType.NavTiltak,
            name: 'utsettelseÅrsak',
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.fri'),
            value: UtsettelseÅrsakType.Fri,
            name: 'utsettelseÅrsak',
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
    familiehendelsesdato,
    utsettelseårsak,
    vedlegg,
}) => {
    const intl = useIntl();
    const årsakOptions = getUtsettelseÅrsakOptions(
        intl,
        periodenErKunHelligdager,
        skalViseGamleUtsettelseÅrsaker,
        erFarEllerMedmor,
        tidsperiodenErInnenforFørsteSeksUker
    );

    if (årsakOptions.length === 0) {
        return (
            <Veilederpanel fargetema="normal" type="normal" svg={<VeilederNormal transparentBackground={true} />}>
                <Block padBottom="l">
                    <Normaltekst>
                        <b>
                            <FormattedMessage
                                id="uttaksplan.veileder.trengerIkkeUtsettelse.del1"
                                values={{ dato: formatDateExtended(Uttaksdagen(familiehendelsesdato).leggTil(30)) }}
                            />
                        </b>
                    </Normaltekst>
                </Block>
                <Block padBottom="l">
                    <Normaltekst>
                        <FormattedMessage id="uttaksplan.veileder.trengerIkkeUtsettelse.del2" />
                    </Normaltekst>
                </Block>
                <Block padBottom="l">
                    <Normaltekst>
                        <FormattedMessage id="uttaksplan.veileder.trengerIkkeUtsettelse.del3" />
                    </Normaltekst>
                </Block>
            </Veilederpanel>
        );
    }

    return (
        <>
            <Block padBottom="l">
                <PeriodeUtsettelseFormComponents.RadioPanelGroup
                    name={PeriodeUtsettelseFormField.årsak}
                    radios={årsakOptions}
                    useTwoColumns={true}
                />
            </Block>
            <Block padBottom="l" visible={showAttachmentUploader(utsettelseårsak)}>
                <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                    {getVeilederTekst(utsettelseårsak)}
                </Veilederpanel>
            </Block>
            <Block padBottom="l" visible={showAttachmentUploader(utsettelseårsak)}>
                <FormikFileUploader
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
