const prefix = "/api"
export const postRequest = (url: string, body?: any) => {
    return fetch(`${prefix}/${url}`, {
        method: "POST",
        headers: getHeaders(),
        body: body ? JSON.stringify(body) : null,
    })
        .then((response) => {
            if (response.ok) return response.json()
            else throw new Error(`Error from server: ${response.statusText}`)
        })
        .then((data) => {
            return Promise.resolve(data);
        }).catch(e => {
            return Promise.reject(e)
        });
}

export const getRequest = (url: string) => {
    return fetch(`${prefix}/${url}`, {
        method: "GET",
        headers: getHeaders()
    })
        .then((response) => response.json())
        .then((data) => {
            return Promise.resolve(data);
        });
}

const getHeaders = () => {
    const user = localStorage.getItem("user");
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
    if (user) {
        const parsedUser = JSON.parse(user)
        return {
            ...headers,
            "Authorization": `Bearer ${parsedUser['token']}`
        }
    }
    return headers;
}