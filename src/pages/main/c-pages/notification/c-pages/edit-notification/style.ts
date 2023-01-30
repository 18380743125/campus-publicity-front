import styled from 'styled-components'

export const AddWrapper = styled.div`
  width: 60%;
  margin: 10px auto 60px;
  .editor {
    height: 100%;
    width: 100%;
    border: 1px solid #ccc;
    position: relative;
    z-index: 99;
  }
  .btns {
    width: 100%;
    height: 40px;
    position: relative;
    .publish {
      position: absolute;
      right: 0;
      top: 20px;
    }
  }
`
