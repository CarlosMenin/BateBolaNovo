import getUsers from "@/app/actions/getUsers";

interface IParams {
  name?: string;
}

const UserPage = async ({ params }: { params: IParams }) => {
  const user = await getUsers(params);

  if (user === null) {
    return <div>Bah</div>;
}
    
  return (<div>{user?.email}</div>);
};

export default UserPage;
