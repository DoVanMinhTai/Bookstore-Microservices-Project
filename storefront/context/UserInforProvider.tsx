import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getMyProfile } from "@/modules/profile/service/ProfileService";
import { error } from "console";
export const UserInfoContext = createContext({
    firstname: '',
    lastname: '',
    email: '',
    fetchUserInfo: () => { }
});


export function UserInfoProvider({ children }: React.PropsWithChildren) {
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = useCallback(() => {
        getMyProfile()
            .then((res) => {
                setfirstname(res.firstname);
                setlastname(res.lastname);
                setEmail(res.email);
            })
            .catch((error) =>
                console.error(error));
    }, []);


    const state = useMemo(() => ({
        firstname, lastname, email, fetchUserInfo
    }), [firstname, lastname, email, fetchUserInfo]);


    return <UserInfoContext.Provider value={state}>{children}</UserInfoContext.Provider>
}

export const useUserInfoContext = () => {
    const { firstname, lastname, email, fetchUserInfo } = useContext(UserInfoContext);
    return { firstname, lastname, email, fetchUserInfo };
};