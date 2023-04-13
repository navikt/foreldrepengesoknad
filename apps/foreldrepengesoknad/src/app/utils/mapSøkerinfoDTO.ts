import { erMyndig } from '@navikt/fp-common';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import Person, { RegistrertAnnenForelder, RegistrertBarn } from 'app/types/Person';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { SøkerinfoDTO, SøkerinfoDTOArbeidsforhold, SøkerinfoDTOBarn, SøkerinfoDTOSøker } from 'app/types/SøkerinfoDTO';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ISOStringToDate } from './dateUtils';

dayjs.extend(utc);
dayjs.extend(timezone);

const mapArbeidsforholdDTOToArbeidsforhold = (
    arbeidsforhold: SøkerinfoDTOArbeidsforhold[] | undefined
): Arbeidsforhold[] => {
    if (!arbeidsforhold) {
        return [];
    }

    return arbeidsforhold.map((arbforhold) => {
        return {
            arbeidsgiverId: arbforhold.arbeidsgiverId,
            arbeidsgiverIdType: arbforhold.arbeidsgiverIdType,
            arbeidsgiverNavn: arbforhold.arbeidsgiverNavn,
            fom: dayjs.utc(arbforhold.fom).toDate(),
            stillingsprosent: arbforhold.stillingsprosent,
            tom: arbforhold.tom ? dayjs.utc(arbforhold.tom).toDate() : undefined,
        };
    });
};

const mapSøkerinfoDTOSøkerToPerson = (personDTO: SøkerinfoDTOSøker): Person => {
    return {
        erMyndig: erMyndig(personDTO.fødselsdato),
        etternavn: personDTO.etternavn,
        fornavn: personDTO.fornavn,
        fnr: personDTO.fnr,
        fødselsdato: dayjs.utc(personDTO.fødselsdato).toDate(),
        kjønn: personDTO.kjønn,
        bankkonto: personDTO.bankkonto,
    };
};

const mapSøkerinfoDTOBarnToRegistrertBarn = (registrerteBarn: SøkerinfoDTOBarn[] | undefined): RegistrertBarn[] => {
    if (!registrerteBarn) {
        return [];
    }

    return registrerteBarn.map((barn) => {
        const { annenForelder } = barn;
        const oppgittAnnenForelder: RegistrertAnnenForelder | undefined = annenForelder
            ? {
                  etternavn: annenForelder.etternavn,
                  fnr: annenForelder.fnr,
                  fornavn: annenForelder.fornavn,
              }
            : undefined;

        return {
            etternavn: barn.etternavn,
            fnr: barn.fnr,
            fornavn: barn.fornavn,
            mellomnavn: barn.mellomnavn,
            fødselsdato: dayjs.utc(barn.fødselsdato).toDate(),
            kjønn: barn.kjønn,
            annenForelder: oppgittAnnenForelder,
            dødsdato: ISOStringToDate(barn.dødsdato),
        };
    });
};

const mapSøkerinfoDTOToSøkerinfo = (søkerinfoDTO: SøkerinfoDTO): Søkerinfo => {
    const arbeidsforhold = mapArbeidsforholdDTOToArbeidsforhold(søkerinfoDTO.arbeidsforhold);
    const person = mapSøkerinfoDTOSøkerToPerson(søkerinfoDTO.søker);
    const registrerteBarn = mapSøkerinfoDTOBarnToRegistrertBarn(søkerinfoDTO.søker.barn);

    return {
        arbeidsforhold,
        person,
        registrerteBarn,
    };
};

export default mapSøkerinfoDTOToSøkerinfo;
