import { publishCommentReq } from '@/service/modules/comment'
import { useAppDispatch } from '@/store'
import { changeOpen } from '@/store/modules/main'
import { localCache } from '@/utils/cache'
import { Button } from '@mui/material'
import TextArea from 'antd/es/input/TextArea'
import { memo, useState } from 'react'
import { HeaderWrapper } from './style'

interface Props {
  id: number
  fetchData: Function
}

const CommentHeader = memo(({ id, fetchData }: Props) => {
  const [content, setContent] = useState('')
  const dispatch = useAppDispatch()

  // 发表
  const handlePublishClick = () => {
    const token = localCache.getCache('token') ?? ''
    let message = '请先登录'
    if (!content.length) {
      message = '请输入评论内容'
      return dispatch(changeOpen({ open: true, message, type: 'error' }))
    }
    if (!token) return dispatch(changeOpen({ open: true, message, type: 'error' }))
    const user = localCache.getCache('user')
    if (user.banned) {
      return dispatch(
        changeOpen({ type: 'error', open: true, message: '您已被禁止评论, 请联系管理员' })
      )
    }
    publishCommentReq({ content, informationId: id }).then((res) => {
      if (res.code === 0) {
        dispatch(changeOpen({ open: true, message: '发表成功', type: 'success' }))
        setContent('')
        fetchData()
      }
    })
  }
  return (
    <HeaderWrapper>
      <div className="text">全部评论</div>
      <div className="input-wrapper">
        <div className="input">
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: 700 }}
            showCount
            maxLength={200}
            rows={3}
            color="#f0f1f4"
            placeholder="发布你的评论"
          />
          <Button onClick={handlePublishClick} size="small" className="inp-btn" variant="contained">
            发表
          </Button>
        </div>
      </div>
    </HeaderWrapper>
  )
})

export default CommentHeader
