import styled from 'styled-components'

export const DetailWrapper = styled.div`
  margin: 30px;
  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    letter-spacing: 3px;
    padding-left: 18px;
    .text {
      font-size: 18px;
      color: #0e2234;
      margin-right: 18px;
    }
    .info {
      display: flex;
      margin-top: 10px;
    }
    .hot {
      color: red;
      margin-left: 10px;
      font-size: 13px;
    }
    .time {
      color: #a5a5a5;
      font-size: 13px;
    }
  }

  .img-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .item {
      margin: 20px;
      width: 30%;
      flex-shrink: 0;
      img {
        width: 100%;
      }
    }
  }
`
