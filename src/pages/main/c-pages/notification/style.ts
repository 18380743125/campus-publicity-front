import styled from 'styled-components'
export const NotificationWrapper = styled.div`
  background-color: #f5f5f5;
  height: 100%;
  margin-bottom: 10px;
  .notification {
    width: 58%;
    height: 100%;
    background-color: #fff;
    margin: 0 auto;
    padding: 13px 8px 10px 16px;
    border: 1px solid #ddd;
    border-bottom: #999 solid 1px;
    box-sizing: border-box;
    .title {
      font-weight: bold;
      letter-spacing: 1px;
      font-size: 13px;
      color: #999;
      display: flex;
      align-items: center;
      .btns {
        margin-left: 20px;
      }
    }
    .list {
      padding-top: 10px;
      font-size: 13px;
      color: #666;
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 30px;
        width: 100%;
        border-bottom: dotted 1px #999;
        position: relative;
        .text {
          cursor: pointer;
        }
        .text span {
          padding-right: 6px;
        }
        .btns {
          position: absolute;
          right: 80px;
        }
        .time {
          padding-right: 6px;
        }
      }
    }
  }
`
