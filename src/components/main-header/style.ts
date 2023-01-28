import styled from 'styled-components'
export const HeaderWrapper = styled.div`
  position: relative;
  z-index: 2;
  background-color: #3d6079;
  display: flex;
  align-items: center;
  color: #fff;
  height: 98px;
  .left {
    text-align: right;
    width: 600px;
  }
  .center {
    width: 400px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 16px;
    letter-spacing: 3px;
    p:first-child {
      font-size: 18px;
      letter-spacing: 4px;
    }
    p:nth-child(2) {
      margin: 6px 0;
    }
  }
  .right {
    flex: 1;
    font-size: 16px;
    padding-left: 200px;
  }
`