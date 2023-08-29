import CryptoJS from "crypto-js";

export const verifyToken = (token,email,userId, access) => {
    try {
        const decryptedString = CryptoJS.AES.decrypt(token,"fgwikfggwiggwfffha").toString(CryptoJS.enc.Utf8);
        const data = JSON.parse(decryptedString);
        if(email == data.email && userId == data.userId) {
            if(access) return data.access == "admin"
            return true
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}