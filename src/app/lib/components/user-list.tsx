import { IUser } from "../types"

 interface IProps{
    user:IUser[]
 }
export const PageProfile=({user}:IProps)=>{
    return (
        <div className="columns is-multiline">
            {user.map(user => (
                <div key={user.id} className="column is-one-quarter">
                    <div className="box">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Surname:</strong> {user.surname}</p>
                    </div>
                </div>
            ))}
        </div>
    )

}