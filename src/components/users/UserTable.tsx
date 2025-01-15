
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import useGetAllUsers from "@/hooks/users/useGetAllUsers"
import { IUser } from "@/types/IUser";
import { useEffect, useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Button } from "../ui/button";
import Swal from "sweetalert2";
  

  const  UserTable = () => {
    const { users, isLoading } = useGetAllUsers();
    const [userList, setUserList] = useState<IUser[]>([])

   useEffect(() => {
    setUserList(users)
   }, [users])

    if(isLoading){
        return <p>Loading..</p>
    };


  // Handle delete user
  const handleDeleteUser = async (userId: number, userName: string) => {
     Swal.fire({
       title: "Are you sure?",
       text: `You won't be able to revert ${userName}!`,
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText: "Yes, delete it!",
     }).then((result) => {
       if (result.isConfirmed) {
        setUserList((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        Swal.fire({
          title: "Deleted!",
          text: `${userName} has been deleted `,
          icon: "success",
        });
       }
     }
    )
  };

    return (
      <div>
        <p className=" text-center">Total User ({ userList?.length })</p>
              <Table>
        <TableCaption>A list of users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead >Phone</TableHead>
            <TableHead >Address</TableHead>
            <TableHead >Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userList?.map((user: IUser) => (
            <TableRow key={user?.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                    <p className=" flex flex-col">
                      <span>Street: {user.address.street}  </span>
                      <span>City: {user.address.city}  </span>
                      <span>Zipcode: {user.address.zipcode}  </span>
                    </p>
              </TableCell>
              <TableCell>  <Button onClick={() => handleDeleteUser(user?.id, user?.name)} ><MdOutlineDeleteForever className=" text-xl text-red-600" /> </Button>  </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    )
  }
  

  export default UserTable