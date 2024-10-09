const host = import.meta.env.VITE_HOST
/**
 * @async 
 *  sends the data (user) to the server 
 * @returns 'true' if data matches with server info, otherwise catches the error
 * @param {*} data 
 */
export async function signin(data) {
    console.log(data)
    try {
        const response = await fetch(`${host}auth/signin`, { // Ajuste en la URL para llamar al endpoint 'signin'
            method: "POST",
            body: JSON.stringify(data), // data is the user object
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"

        })
        if (!response.ok) {
            throw new Error('Error al iniciar sesión');
        }

        const jsonResponse = await response.json();
        console.log("Success:", jsonResponse);
        return jsonResponse; // Devolver el resultado de la solicitud 
    } catch (error) {
        // Manejar errores de red o de análisis JSON
        console.error('Error al procesar la solicitud:', error);
    }

}
export async function signUp(data) {
    console.log(data)
    try {
        const response = await fetch(`${host}auth/signup`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"

        })
        if (!response.ok) {
            throw new Error('Error al crear la cita');
        }

        const jsonResponse = await response.json();
        console.log("Success:", jsonResponse); // <= True or false <= Response
        return jsonResponse; // Devolver el resultado de la solicitud 
    } catch (error) {
        // Manejar errores de red o de análisis JSON
        console.error('Error al procesar la solicitud:', error);
    }
}


/** 
* @async 
 *  takes the token from a cookie and calls the server
 * @returns a json object (USER), otherwise catches the error
 * @param {*} data 
 */
export async function verifyTokenRequest(token) {
    try {
        const response = await fetch(`${host}auth/profile`, { // Ajuste en la URL para llamar al endpoint 'signin'
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'auth-token': token,

            },
            credentials: "include"
        })
        if (!response.ok) {
            throw new Error('Error al iniciar sesión');
        }

        const jsonResponse = await response.json();
        console.log("Success:", jsonResponse);
        return jsonResponse; // Devolver el resultado de la solicitud 
    } catch (error) {
        // Manejar errores de red o de análisis JSON
        console.error('Error al procesar la solicitud:', error);
    }

}

