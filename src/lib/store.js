import { readable, writable } from 'svelte/store'
import { add } from 'date-fns'
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";


export const loginResult = writable(null)
export const loginIsOpen = writable(false)

export const accessToken = writable(null)
export const infoToken = writable(null)

const cookieName = 'api_token'

export default async function (formData) {
    let url = "https://api-1.ursei.su/access_token";

    async function authenticate() {
        let response = await fetch(url, {
            method: "post",
            mode: "cors", // no-cors, *cors, same-origin,
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin",
            headers: {
                Accept: "1.0",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData,
        });

        if (response.status === 200) {
            loginIsOpen.set(false)
            loginResult.set(true)

            const resp_js = await response.json();
            console.log(resp_js)

            accessToken.set(resp_js.access_token)
            infoToken.set(jwt_decode(resp_js.access_token).aud)

            //добавляется 1 час к тек.дате 
            // let now = new Date()
            // let expiresIn = new Date(now.getTime() + resp_js['expires_in'] * 1000);
            let expiresIn_1 = add(new Date(), { hours: 1 })
            resp_js['expires_in'] = expiresIn_1.toString()  //  `${expiresIn}`;

            //добавляется 1 мес к тек.дате
            // var expires = new Date(now.setMonth(now.getMonth + 1)); //!!! ????
            let expires_1 = add(new Date(), { months: 1 }) //???

            //debugger
            //  accessToken.set(resp_js['access_token'])


            Cookies.set(cookieName,
                JSON.stringify(resp_js),
                { path: '/', expires: 30, sameSite: 'Lax' });

            //document.cookie = `${cookieName}=${JSON.stringify(resp_js)};expires=${expires_1};samesite=lax;path=/`
        } else {
            loginIsOpen.set(true)
            loginResult.set(false)

            const resp_js = await response.json();
            console.log('ERROR 400', resp_js)
        }
    }
    authenticate()
}
