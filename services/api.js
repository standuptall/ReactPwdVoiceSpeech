import { config } from "../config.js";

export let token = "";
export const api =  {
    getPasswords,getRifornimenti,login,saveRifornimento,updateRifornimento
}
const url = config.url;
function getPasswords(search){
    return fetch(url+"/api/password", {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
        }
    }).then(handleResponse);

}

function getRifornimenti(){
    return fetch(url+"/api/rifornimenti", {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
        }
    }).then(handleResponse);

}

function login(nomeutente,password){
    return fetch(url+"/api/token", {
        method: 'POST',
        body: JSON.stringify({nomeutente,password}),
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(handleResponse);

}
function saveRifornimento(obj){
    return fetch(url+"/api/rifornimenti", {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
        }
    }).then(handleResponse);
}

function updateRifornimento(obj){
    return fetch(url+"/api/rifornimenti/"+obj.ID, {
        method: 'PUT',
        body: JSON.stringify(obj),
        headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
        }
    }).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
