import styled from 'styled-components'
export const FooterWrapper = styled.div`
  background-color: #0e2234;
  height: 99px;
  width: 100%;
  position: absolute;
  top: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  .left {
    img {
      width: 180px;
    }
    margin-top: 6px;
  }
  .divide {
    display: inline-block;
    height: 30px;
    width: 1px;
    background-color: #fff;
    position: relative;
    left: 10px;
    top: 5px;
  }
  .right {
    color: #fff;
    display: inline-block;
    position: relative;
    left: 30px;
    top: -6px;
    font-size: 13px;
  }
`
