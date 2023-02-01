import styled from 'styled-components'

export const ListWrapper = styled.div`
  width: 90%;
  padding: 0px 10px 10px 8px;
  margin-top: 10px;
  .c-list {
    padding-bottom: 60px;
    .c-item {
      width: 80%;
      /* height: 100px; */
      padding: 10px 0;
      margin-bottom: 6px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 1.25;
      position: relative;
      border-bottom: 1px solid #eee;
    }
    .con {
      color: #1976d2;
      line-height: 1.7;
    }
    .infor {
      display: flex;
      align-items: center;
      padding-top: 6px;
      .author {
        padding-right: 10px;
        color: #999;
        position: relative;
        top: -1px;
      }
      .time {
        color: #999;
        font-size: 12px;
      }
    }
    .btn {
      position: absolute;
      bottom: 0px;
      right: 0px;
    }
  }
`
