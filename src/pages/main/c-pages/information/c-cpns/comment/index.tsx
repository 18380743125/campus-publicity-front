import { getCommentReq } from '@/service/modules/comment'
import { memo, useCallback, useEffect, useState } from 'react'
import CommentHeader from '../comment-header'
import CommentList from '../comment-list'
import { CommentWrapper } from './style'
// import a from './mock.json'

interface Props {
  id: number
}

const Comment = memo((props: Props) => {
  const { id } = props

  const [comments, setComment] = useState<any>()

  const fetchData = useCallback(() => {
    getCommentReq({ informationId: id }).then((res) => {
      setComment(res.data)

      // setComment(a.data.comments)
    })
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CommentWrapper>
      <CommentHeader id={id} fetchData={fetchData} />
      {comments ? <CommentList fetchData={fetchData} comments={comments} /> : ''}
    </CommentWrapper>
  )
})

export default Comment
