import InputBox from './sub-components/inputBox'
import PostBox from './sub-components/postBox'
import UsersDatabase from '../dataBase/usersPost.json'

function Home() {
    return(
        <div className="home">
            <div className="publication">
                <InputBox />
            </div>

            {UsersDatabase.map(userData =>(
                <div>
                    <PostBox user={userData} />    
                </div>
            ))}
        </div>
    )
}

export default Home