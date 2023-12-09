import axios, { AxiosResponse } from "axios";

axios.defaults.timeout = 100000;

export interface Attribute {
    trait_type: string;
    value: string | number;
}

export interface Metadata {
    name: string;
    description: string;
    image: string;
    attributes: Attribute[];
}

export function getMetadataByTokenId(baseUrl: string, tokenId: number) {
    return new Promise<Metadata>((resolve, reject) => {
        axios.get(baseUrl.concat(tokenId.toString())).then(
            (response: AxiosResponse<Metadata>) => {
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}
