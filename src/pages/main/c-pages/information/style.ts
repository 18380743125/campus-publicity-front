import styled from 'styled-components'
export const InformationWrapper = styled.div`
  background-color: #f5f5f5;
  height: 100%;
  margin-bottom: 10px;
  .information {
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
      .item {
        height: 130px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 8px;
        letter-spacing: 2px;
        border-bottom: 1px solid #ccc;
        .author {
          padding-top: 10px;
          color: #999;
          font-size: 12px;
          font-weight: bold;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .i-title {
          color: #1976d2;
          padding: 3px 0 4px;
          font-size: 13px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .content {
          margin-top: 4px;
          line-height: 1.5;
          font-size: 13px;
          word-break: break-all;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    }
  }
`
