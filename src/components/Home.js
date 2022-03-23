import InputBox from './sub-components/inputBox'
import PostBox from './sub-components/postBox'
import { useState, useEffect } from 'react'

function Home() {
    
    const [likeList, setArray] = useState(["1", "3", "4"])
    const [users, setUsers] = useState([])

    useEffect(() =>{
        const fetchItems = async () =>{
            try{
                const response = await fetch('http://localhost:8000/getAllPosts')
                const data = await response.json()
                console.log(data)
                setUsers(data.data)
            }catch(err){
                console.log(err)
            }
        }
        (async () => await fetchItems())()
    }, [])
    
    
    // async function getData(){
    //     await fetch('http://localhost:8000/getAllPosts').then(res => res.json()).then((json) =>{
    //         setUsers(json)
    //     })
    // }

    // getData()
    
    console.log(users)
    
    function Like(postId, like){

        if(like){
            let index = likeList.indexOf(postId)
            let newList = likeList.filter(element => element !== postId)
            if(index >= 0) setArray(newList)

        }else{
            setArray([...likeList, postId])

        }
    }

    return(
        <div className="home">
            <div className="publication">
                <InputBox />
            </div>

            {users.map(userData =>(
                <div>
                    <PostBox likeList={likeList} user={userData} handleClick={Like} />    
                </div>
            ))}
        </div>
    )
}

export default Home