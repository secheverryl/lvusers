export class User {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;

    constructor(options = {}) {
        Object.assign(this, {
            id: 0,
            name: '',
            email: '',
            gender: 'male',
            status: 'active',
        }, options);
    }
}