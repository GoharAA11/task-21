import { getAllUsers } from "../lib/api"
import { PageProfile } from "../lib/components/user-list"

export default function ProfilePage(){
    const getUser=getAllUsers()
    return <>
    <div className="is-size-3">Profile Page</div>
    <PageProfile user={getUser}/>
    
    </>
}