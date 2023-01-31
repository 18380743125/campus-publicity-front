import { updateUserReq } from '@/service/modules/users'
import { useAppDispatch } from '@/store'
import { changeOpen } from '@/store/modules/main'
import { localCache } from '@/utils/cache'
import { ConfigProvider, Form, Input, Modal, Radio } from 'antd'
import React, { memo, useRef, useState } from 'react'
import { InfoWrapper } from './style'

interface Props {
  open: boolean
  setOpen: Function
}

const MyInfo = memo((props: Props) => {
  const { open, setOpen } = props
  const user = localCache.getCache('user')
  const [age, setAge] = useState(user?.age)
  const [name] = useState(user?.name)
  const [gender, setGender] = useState(user?.gender)
  const dispatch = useAppDispatch()

  const formRef = useRef<any>()

  const handleSubmit = () => {
    formRef.current.validateFields().then(() => {
      updateUserReq(user.id, { age, gender }).then((res) => {
        if (res.code === 0) {
          dispatch(changeOpen({ open: true, type: 'success', message: '修改成功' }))
          localCache.setCache('user', { ...user, age, gender })
          setOpen(false)
          return
        }
        dispatch(changeOpen({ open: true, type: 'error', message: '修改失败' }))
      })
    })
  }

  return (
    <InfoWrapper>
      {open ? (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#3d6079'
            }
          }}
        >
          <Modal
            style={{ top: -60, color: '#3d6079' }}
            title="我的资料"
            centered
            cancelText="取消"
            okText="保存"
            open={open}
            onOk={handleSubmit}
            onCancel={() => {
              setAge(user.age)
              setGender(user.gender)
              setOpen(false)
            }}
            width={500}
          >
            <Form
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 14 }}
              style={{ maxWidth: 600, marginTop: 20 }}
              autoComplete="off"
              ref={formRef}
              initialValues={{ age }}
            >
              <Form.Item label="用户名">
                <Input disabled value={name} />
              </Form.Item>
              <Form.Item
                label="年龄"
                name="age"
                rules={[{ required: true, message: '请输入年龄' }]}
              >
                <Input value={age} onChange={(e) => setAge(e.target.value)} />
              </Form.Item>
              <Form.Item label="性别">
                <Radio.Group value={gender} onChange={(e) => setGender(e.target.value)}>
                  <Radio value="1"> 男 </Radio>
                  <Radio value="0"> 女 </Radio>
                </Radio.Group>
              </Form.Item>
            </Form>
          </Modal>
        </ConfigProvider>
      ) : (
        ''
      )}
    </InfoWrapper>
  )
})

export default MyInfo
