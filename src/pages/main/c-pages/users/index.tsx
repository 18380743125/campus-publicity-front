import React, { memo, useCallback, useEffect, useState } from 'react'
import { ConfigProvider, Input, Modal } from 'antd'
import Button from '@mui/material/Button'
import { UsersWrapper } from './style'
import Table, { ColumnsType } from 'antd/es/table'
import { formatUTC } from '@/utils/format'
import { SearchOutlined } from '@ant-design/icons'
import zhCN from 'antd/es/locale/zh_CN'
import { getUsersReq, updateUserReq } from '@/service/modules/users'
import { useAppDispatch } from '@/store'
import { changeOpen } from '@/store/modules/main'

const Users = memo(() => {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const dispatch = useAppDispatch()

  // 获取用户信息
  const fetchUsers = useCallback(
    (uname = name) => {
      getUsersReq(uname, page).then((res) => {
        setUsers(res.data.users)
        setTotalCount(res.data.totalCount)
      })
    },
    [page]
  )

  // 初始化数据
  useEffect(() => {
    fetchUsers()
  }, [page])

  // 搜索
  const handleSearch = () => {
    setPage(1)
    fetchUsers(name)
  }

  const handleBan = (id: number, banned: boolean) => {
    Modal.warn({
      title: `你确认要${!banned ? '解除' : ''}禁言吗？`,
      maskClosable: true,
      onOk() {
        updateUserReq(id, { banned }).then((res) => {
          if (res.code === 0) {
            dispatch(changeOpen({ open: true, message: '操作成功', type: 'success' }))
            return fetchUsers()
          }
          dispatch(changeOpen({ open: true, message: '操作失败', type: 'error' }))
        })
      }
    })
  }

  const columns: ColumnsType<any> = [
    {
      title: '用户名',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      align: 'center',
      render: (value: number) => {
        return value || '暂无'
      }
    },
    {
      title: '性别',
      dataIndex: 'gender',
      align: 'center',
      render: (value: string) => {
        return value || '其他'
      }
    },
    {
      title: '发言状态',
      dataIndex: 'banned',
      align: 'center',
      render: (value: string) => {
        return !value ? (
          <span style={{ color: '#1565c0' }}>正常</span>
        ) : (
          <span style={{ color: 'red' }}>被禁言</span>
        )
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createAt',
      align: 'center',
      render: (value) => {
        return formatUTC(value, 'YYYY/MM/DD HH:mm:ss')
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      width: 190,
      render: (_, r: any) => {
        return (
          <div>
            <Button
              disabled={r.banned}
              color="warning"
              variant="contained"
              size="small"
              onClick={() => handleBan(r.id, true)}
              style={{ marginRight: 6 }}
            >
              禁言
            </Button>
            <Button
              color="info"
              disabled={!r.banned}
              variant="contained"
              size="small"
              onClick={() => handleBan(r.id, false)}
            >
              解除
            </Button>
          </div>
        )
      }
    }
  ]

  return (
    <UsersWrapper>
      <div className="users-info">
        {/* 操作区域 */}
        <div style={{ marginBottom: 10 }}>
          <Input
            style={{ width: 380 }}
            value={name}
            onChange={({ target: { value } }) => setName(value)}
            prefix={<SearchOutlined />}
            placeholder="请输入用户名"
          />
          <Button
            variant="contained"
            size="small"
            style={{ position: 'relative', top: -1, left: 10 }}
            onClick={handleSearch}
          >
            查询
          </Button>
        </div>
        <ConfigProvider locale={zhCN}>
          <Table
            columns={columns}
            rowKey={(record: any) => record.name}
            locale={{ emptyText: '暂无数据' }}
            dataSource={users}
            pagination={{
              hideOnSinglePage: true,
              total: totalCount,
              onChange: (page: number) => setPage(page)
            }}
          />
        </ConfigProvider>
      </div>
    </UsersWrapper>
  )
})

export default Users
