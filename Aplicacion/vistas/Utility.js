export default class Utility {

    static async getToken() {
        try {
            let token = await AsyncStorage.getItem(ACCESS_TOKEN);
            return token;
        } catch (error) {
            console.log("error while getting token");
            return 'error';
        }
    }
}
