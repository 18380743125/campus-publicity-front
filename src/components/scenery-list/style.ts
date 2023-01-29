import styled from 'styled-components'
export const ListWrapper = styled.div`
  .list {
    width: 80%;
    margin: 26px auto;
    .title {
      display: flex;
      margin-bottom: 10px;
      position: relative;
      .left {
        width: 87.5%;
        height: 30px;
        color: white;
        display: flex;
        align-items: center;
        padding-left: 10px;
        border-radius: 2px;
      }
      .right {
        color: #339966;
        font-size: 15px;
        cursor: pointer;
        position: absolute;
        right: 130px;
        top: 7px;
      }
      .del {
        margin-left: 50px;
      }
    }

    .item {
      margin: 60px;
      width: 100%;
    }

    .imgs {
      width: 100%;
      img {
        height: 300px;
        width: 300px;
        margin-right: 30px;
      }
    }
  }
`
