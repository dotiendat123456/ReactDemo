// src/types/user.ts

export type Department = {
    id: number;
    name: string;
};

export type Title = {
    id: number;
    level: string;
    description: string;
};

export type Role = {
    id: number;
    name: string;
};

export type UserProfileDetail = {
    birth: string | null;
    birth_place: string | null;
    identification_number: string | null;
    identification_date: string | null;
    identification_place: string | null;
    company_entry_date: string | null;
    number_of_date_attached: number | null;
    education_level: string | null;
    gender: string | null;
    bank_name: string | null;
    bank_number: string | null;
    personal_income_tax: string | null;
    insurance_number: string | null;
    relative_name: string | null;
    relative_role: string | null;
    relative_number: string | null;
    school_name: string | null;
    field: string | null;
};

export type User = {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    status: number;
    status_name: string;
    badge_name: string;
    avatar_url: string | null;
    background: string | null;
    departments: Department[];
    titles: Title[];
    roles: Role[];
    profile: UserProfileDetail | null;
    skills: any[];
    login_at: string | null;
};

export type ProfileResponse = {
    message: string;
    data: User;
};
