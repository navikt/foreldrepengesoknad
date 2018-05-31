import axios from 'axios';
import Søknad from '../types/søknad/Søknad';
import Environment from '../../app/Environment';
import { Attachment } from 'storage/attachment/types/Attachment';
import { mapAttachmentTilSøknadsvedlegginfo } from '../util/vedleggUtil';

function getPerson() {
    const endpoint = Environment.REST_API_URL;
    return axios.get(`${endpoint}/personinfo`, {
        timeout: 15 * 1000,
        withCredentials: true
    });
}

function sendSøknad(søknad: Søknad, vedlegg: Attachment[]) {
    const formData = new FormData();
    søknad.vedlegg = vedlegg.map((v) => mapAttachmentTilSøknadsvedlegginfo(v));
    formData.append(
        'soknad',
        new Blob([JSON.stringify(søknad)], {
            type: 'application/json'
        })
    );

    const url = `${Environment.REST_API_URL}/soknad`;
    return axios.post(url, formData, {
        withCredentials: true,
        headers: {
            'content-type': 'multipart/form-data;'
        }
    });
}

const Api = { getPerson, sendSøknad };

export default Api;
