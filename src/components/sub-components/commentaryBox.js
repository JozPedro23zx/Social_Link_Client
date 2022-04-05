import '../../customStyles/commentaryBox.css'

function CommentaryBox(){
    return(
        <div className="inputComment">
            <form>
                <textarea></textarea>
                <button>Comment</button>
            </form>
        </div>
    )
}

export default CommentaryBox