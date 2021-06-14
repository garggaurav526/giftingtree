
import "../Sys/config";
var apiUrl = global.platformURI;

export const authServices = {
    userLogin,
    forgetPassword,
    userSignUp
};

function userLogin(email, password) {
    var formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    console.log("shjgasdgasjd", apiUrl)
    return fetch(apiUrl+"auth/login", requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}
function userSignUp(name, phone, email,password) {
    var formdata = new FormData();
    formdata.append("name", name);
    formdata.append("phone", phone);
    formdata.append("email", email);
    formdata.append("password", password);
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    return fetch(apiUrl+"api/auth/signup", requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log("user",user)
            return user;
        });

}

function forgetPassword(payload) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };
    console.log('requestOptions', requestOptions);
    return fetch("https://vendor.greenchickchopindia.com:3000/chop/user/forgot-password", requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
            }

            const error = (data) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}