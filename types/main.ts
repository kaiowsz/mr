interface UserType {
    expires: string;
    user: {
        email: string;
        image: string;
        name: string;
    }
}

export type { UserType }