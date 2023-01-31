import { publishInformationReq } from '@/service/modules/information'
import { useAppDispatch } from '@/store'
import { changeOpen } from '@/store/modules/main'
import { Button } from '@mui/material'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { ConfigProvider, Form, Input } from 'antd'
import { memo, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { EditWrapper } from './style'

const EditInformation = memo(() => {
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const formRef = useRef<any>()
  const location = useLocation()

  // 编辑器内容
  const [html, setHtml] = useState(location?.state?.informationDetail.content ?? '')
  const [title, setTitle] = useState(location?.state?.title ?? '')
  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: {
        fieldName: 'file',
        server: 'http://localhost:8000/api/v1/information/upload'
      }
    }
  }

  // 销毁 editor
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  // 发布
  const handlePublishClick = async () => {
    await formRef.current.validateFields()
    if (!editor?.getText()) {
      return dispatch(changeOpen({ open: true, message: '请输入资讯内容', type: 'error' }))
    }
    publishInformationReq({ flag: location?.state, title, content: editor.getHtml() }).then(
      (res) => {
        const info = location?.state ? '编辑' : '发布'
        if (res.code === 0) {
          setTitle('')
          dispatch(changeOpen({ open: true, message: `${info}成功`, type: 'success' }))
        } else {
          return dispatch(changeOpen({ open: true, message: `${info}失败`, type: 'error' }))
        }
        setHtml('')
        navigate('/main/information')
      }
    )
  }

  return (
    <EditWrapper>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#3d6079'
          }
        }}
      >
        <Form
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          style={{ maxWidth: 600, marginTop: 20 }}
          autoComplete="off"
          initialValues={{ author: '重庆移通学院教务处', title }}
          ref={formRef}
        >
          <Form.Item
            label="资讯标题"
            name="title"
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="发布方"
            name="author"
            rules={[{ required: true, message: '请选择发布方' }]}
          >
            <Input disabled />
          </Form.Item>
        </Form>
      </ConfigProvider>
      <div className="editor">
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: '400px' }}
        />
      </div>
      <div className="btns">
        <div className="publish">
          <Button
            onClick={handlePublishClick}
            variant="contained"
            size="small"
            style={{ background: '#3d6079' }}
          >
            发布资讯
          </Button>
        </div>
      </div>
    </EditWrapper>
  )
})

export default EditInformation
