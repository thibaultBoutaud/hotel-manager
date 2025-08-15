export class AuthModel {

    constructor(userServices) {
        this.userServices = userServices;
    }

    async inscription(data) {
        return await this.userServices.inscription(data);
    }

    async connection(data) {
        return await this.userServices.connection(data);
    }

    async setCurrentUser(){
         const authRes =  await this.userServices.getMyProfil();
         return authRes.data.user;
    }

}