import { deleteCommentReq } from '@/service/modules/comment'
import { useAppDispatch } from '@/store'
import { changeOpen } from '@/store/modules/main'
import { formatUTC } from '@/utils/format'
import { isAdmin } from '@/utils/isAdmin'
import { Button } from '@mui/material'
import { Modal } from 'antd'
import { memo, ReactNode, useState } from 'react'
import CommentReply from '../comment-reply'
import { ListWrapper } from './style'

interface Props {
  comments: any
  fetchData: Function
}

const CommentList = memo(({ comments, fetchData }: Props) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const [comment, setComment] = useState()

  // 获取要删除评论的 id 及其子评论的 id
  const getDelIds = (item: any) => {
    const res = [item.id]
    if (item.children) {
      for (const c of item.children) {
        res.push(...getDelIds(c))
      }
    }
    return res
  }

  // 处理删除
  const handleDelClick = (item: any) => {
    const ids = getDelIds(item)
    Modal.warn({
      title: '你确认要删除吗？',
      maskClosable: true,
      onOk() {
        deleteCommentReq(ids).then((res: any) => {
          if (res.code === 0) {
            dispatch(changeOpen({ open: true, message: '删除成功', type: 'success' }))
            return fetchData()
          }
          dispatch(changeOpen({ open: true, message: '删除失败', type: 'error' }))
        })
      }
    })
  }

  function render(comments: any, m = 0) {
    if (m > 1) m = 1
    const res: Array<ReactNode> = []
    for (let i = 0; i < comments.length; i++) {
      const item = comments[i]
      const childrens: any = []
      const topItem = (
        <div style={{ marginLeft: 20 * m }} key={item.id} className="c-item">
          <div className="con">{item?.content}</div>
          <div className="infor">
            <div className="author">
              {item?.name}
              {isAdmin(item.roles) && (
                <span style={{ color: '#1677ff', fontSize: 13, marginLeft: 4 }}>(管理员)</span>
              )}
              {m === 0 ? '' : <span style={{ fontSize: 13, margin: '0 6px' }}>回复给</span>}
              {item?.parentName}
              {item?.parentName && isAdmin(item.roles) && (
                <span style={{ color: '#1677ff', fontSize: 13, marginLeft: 4 }}>(管理员)</span>
              )}
            </div>
            <div className="time">{formatUTC(item?.createAt, 'YYYY-MM-DD HH:mm:ss')}</div>
          </div>
          <div className="btn">
            <Button
              onClick={() => {
                setComment(item)
                setOpen(true)
              }}
            >
              回复
            </Button>
            {isAdmin() ? (
              <Button onClick={() => handleDelClick(item)} color="error">
                删除
              </Button>
            ) : (
              ''
            )}
          </div>
        </div>
      )
      childrens.push(topItem)
      if (item.children) childrens.push(render(item.children, m + 1))
      // 本层递归结束
      res.push(childrens)
    }
    return res
  }

  return (
    <ListWrapper>
      {open && comment && (
        <CommentReply fetchData={fetchData} comment={comment} open={open} setOpen={setOpen} />
      )}
      <div className="c-list">{render(comments)}</div>
    </ListWrapper>
  )
})

export default CommentList
