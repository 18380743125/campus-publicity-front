import styled from 'styled-components'
export const DetailWrapper = styled.div`
  width: 73%;
  margin: 0 auto 80px;
  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60px;
    letter-spacing: 1px;
    border-bottom: 1px solid #666;
    .top {
      font-weight: bold;
      margin-bottom: 10px;
    }
    .bottom {
      font-size: 12px;
    }
  }
  .content {
    margin: 20px 0;
    line-height: 1.8;
  }
  /* .footer {
    margin: 30px 0;
    position: absolute;
    bottom: -88px;
    right: 0;
    text-align: right;
    font-size: 17px;
    font-weight: bold;
    letter-spacing: 1px;
    .remarks {
      margin-bottom: 6px;
    }
  } */
`
