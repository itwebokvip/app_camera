export const EnumNavigate = {
    Login: 'Login',

};
export const Sleep = (second: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, second * 1000));

