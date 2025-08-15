export class AuthServices {

    constructor(userServices) {
        this.userIdSelected = null;
        this.userServices = userServices;
    }

    async init() {
        if (this.userIdSelected === null) {
            const auth = await this.userServices.getMyProfil();
            this.userIdSelected = auth.data.user.id;
        }
    }

    async getUserById(id) {
        return await this.userServices.getOneUser(id);
    }

    async getAuth() {
        const auth = await this.userServices.getMyProfil();
        return auth.data.user;
    }

    async getUsers() {
        const users = await this.userServices.getUsers();
        return users.data.users;
    }

    async getUsersStatus() {
        const users = await this.getUsers()
        return users.map((user) => {
            return { ...user, isSelected: user.id === this.userIdSelected ? true : false };
        });
    }

    async setCurrentUser() {
        const authRes = await this.userServices.getMyProfil();
        return authRes.data.user;
    }

    updateUser(data) {
        return this.userServices.updateUser(data); 
    }

    updatePassword(data){
        return this.userServices.updatePassword(data);
    }


}