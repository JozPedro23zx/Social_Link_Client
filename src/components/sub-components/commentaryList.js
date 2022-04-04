function CommentaryList(props){
    const comment = props
    console.log(comment)
    return(
        <div className='post'>
            <div className='user-info'>
            <div className='avatar-container'>
                <img className='avatar' src="#" alt='avatar'></img>
            </div>
            <div className='user-info-right'>
                <div className='user-name'>
                    <span className='fake-link'>name</span>
                </div>
            </div>
            </div>
            <div className='post-content'>
                Comment
            </div>
        </div>
    )
}

export default CommentaryList