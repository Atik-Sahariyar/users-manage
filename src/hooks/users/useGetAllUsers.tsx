import { IUser } from "@/types/IUser";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetAllUsers = () => {
   const { data: usersData, isLoading, error } = useQuery({
    queryKey: ["get-all-users"],
    queryFn: async () => {
        const res = await axios.get("https://jsonplaceholder.typicode.com/users");
        return res?.data;
    }
   });

     const users: IUser[] = usersData;
    return { users, isLoading, error }
};

export default useGetAllUsers;
