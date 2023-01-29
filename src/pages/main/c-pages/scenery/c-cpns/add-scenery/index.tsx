import { ConfigProvider, Form, Input, message, Modal, Upload, UploadFile, UploadProps } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { RcFile } from 'antd/es/upload'
import React, { memo, useRef, useState } from 'react'
import { getBase64, checkImageFormat } from '@/utils/format'
import { AddWrapper } from './style'
import PreviewModal from '@/components/preview-image'
import { useAppDispatch } from '@/store'
import { changeOpen } from '@/store/modules/main'
import { publicSceneryReq } from '@/service/modules/scenery'

interface Props {
  open: boolean
  setOpen: Function
  page: number
  fetchData: Function
}

const AddScenery = memo((props: Props) => {
  const dispatch = useAppDispatch()
  const { open, setOpen, page, fetchData } = props
  // 控制预览显示/隐藏
  const [previewVisible, setPreviewVisible] = useState(false)
  // 预览图的 base64
  const [previewImage, setPreviewImage] = useState('')
  // title
  const [title, setTitle] = useState('')
  // 图片组
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const formRef = useRef<any>()

  // 处理提交
  const handleSubmit = async () => {
    let files = null
    if (fileList.length > 0) {
      files = fileList.map((item) => item.originFileObj) ?? []
    }
    try {
      if (!files?.length) throw new Error('no_file')
      await formRef.current.validateFields()
      publicSceneryReq(title, files).then((res) => {
        if (res.code === 0) {
          fetchData(page)
          closeModal()
          return dispatch(changeOpen({ open: true, type: 'success', message: '添加成功' }))
        }
        dispatch(changeOpen({ open: true, type: 'error', message: '标题名称不能重复' }))
      })
    } catch (err: any) {
      const message = err.message === 'no_file' ? '请选择图片' : '请输入标题'
      dispatch(changeOpen({ open: true, type: 'error', message }))
      return
    }
    setOpen(false)
  }

  // 监听图片的改变
  const handleChange: UploadProps['onChange'] = ({ file, fileList }) => {
    const { isJpgOrPng, isLt10M } = checkImageFormat(file as RcFile)
    if (isJpgOrPng && isLt10M) {
      setFileList(fileList)
    }
  }

  // 列表 props
  const uploadProps: UploadProps = {
    listType: 'picture-card',
    fileList,
    maxCount: 20,
    multiple: true,
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      const { isJpgOrPng, isLt10M } = checkImageFormat(file)
      if (isJpgOrPng && isLt10M) {
        setFileList([...fileList, file])
      }
      if (!isJpgOrPng) message.error('图片格式错误！')
      if (!isLt10M) message.error('图片大小不能超过2MB')
      return false
    },
    onChange: handleChange,
    onPreview: async (file: UploadFile) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as RcFile)
      }
      setPreviewImage(file.url || (file.preview as string))
      setPreviewVisible(true)
    }
  }

  // 上传区域
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8
        }}
      >
        添加
      </div>
    </div>
  )

  function closeModal() {
    formRef.current.resetFields()
    setTitle('')
    setFileList([])
    setOpen(false)
  }

  return (
    <AddWrapper>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#3d6079'
          }
        }}
      >
        <Modal
          style={{ top: 0, color: '#3d6079' }}
          title="添加校园风光"
          centered
          cancelText="取消"
          okText="提交"
          open={open}
          onOk={handleSubmit}
          onCancel={closeModal}
          width={700}
        >
          <Form
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 600, marginTop: 20 }}
            autoComplete="off"
            ref={formRef}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: '请输入标题' }]}
            >
              <Input title={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Item>
            <PreviewModal
              previewImage={previewImage}
              visible={previewVisible}
              handleCancel={() => setPreviewVisible(false)}
            />
            <Form.Item required name="carouselUrl" label="图片">
              <Upload {...uploadProps}>{fileList.length >= 20 ? null : uploadButton}</Upload>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>
    </AddWrapper>
  )
})

export default AddScenery
