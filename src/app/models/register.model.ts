export class RegisterModel {
    constructor(
        public username: string,
        public password: string,
        public avatarUrl: string,
        public email: string,
        public age?: number
    ) { }
}